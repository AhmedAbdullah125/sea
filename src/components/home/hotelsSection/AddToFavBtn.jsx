import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { FaHeart } from "react-icons/fa";
import { userContext } from "../../../context/UserContext";
import { toast } from "sonner";
import { fetchFromApi } from "../../../api/utils/fetchData";
import { postToApi } from "../../../api/utils/postData";

const AddToFavBtn = ({ postion = '', id, type }) => {
  const { token } = useContext(userContext);
  const [lovedHotels, setLovedHotels] = useState(localStorage.getItem('lovedHotels') ? JSON.parse(localStorage.getItem('lovedHotels')) : [])
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('lovedHotels')) {
        setLovedHotels(localStorage.getItem('lovedHotels') ? JSON.parse(localStorage.getItem('lovedHotels')) : []);
      }
      else {
        localStorage.setItem('lovedHotels', []);
      }
    }
  }, [token])

  async function AddToFavBtn() {
    if (!token) {
      toast.error('يرجى تسجيل الدخول قبل الحفظ');

    }
    else {
      const res = await postToApi("/wishlist",
        {
          wishable_id: id,
          wishable_type: type
        },
        { headers: { Authorization: `Bearer ${token}` } });
      if (res?.status === 200) {
        toast.success("تم الإضافة للمفضلة بنجاح");        
        if (lovedHotels.includes(id)) {
          setLovedHotels(lovedHotels.filter(id => id !== id))
          localStorage.setItem('lovedHotels', JSON.stringify(lovedHotels.filter(id => id !== id)))
        }
        else {
          setLovedHotels([...lovedHotels, id])
          localStorage.setItem('lovedHotels', JSON.stringify([...lovedHotels, id]))
        }
      }
      else {
        toast.error("حدث خطأ ما");
      }


    }

  }
  return (
    <button onClick={AddToFavBtn} type="button" className={`${postion} size-10 bg-white ${lovedHotels.includes(id) ? 'text-red-500' : 'text-main-gray'} hover:text-red-500  font-semibold flex items-center justify-center rounded-[15px]`}>
      <FaHeart size={20} />
    </button>
  )
}

export default AddToFavBtn
