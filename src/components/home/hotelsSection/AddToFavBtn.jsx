import { FaHeart } from "react-icons/fa";

const AddToFavBtn = ({postion=''}) => {
  return (
    <button type="button" className={`${postion} size-10 bg-white text-black hover:text-red-500  font-semibold flex items-center justify-center rounded-[15px]`}>
      <FaHeart size={20} />
    </button>
  )
}

export default AddToFavBtn
