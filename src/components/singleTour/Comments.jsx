import { TiStarFullOutline } from 'react-icons/ti'

const Comments = () => {

  return (
    <div className='space-y-2'>
      <div className='grid grid-cols-12 gap-2'>
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className='col-span-12 xl:col-span-6 bg-main-navy text-white p-6 rounded-[40px] space-y-6'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <p className='size-10 rounded-full text-xs bg-white text-main-navy font-bold flex items-center justify-center '>ع</p>
                <p className='text-sm font-bold'>عمــر أبو الخــالدي</p>
              </div>
              <svg width="38" height="39" viewBox="0 0 38 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.7818 31.66L29.9477 7.33997H36.2036L29.9477 31.66H19.7818ZM1.7959 31.66L11.9618 7.33997H18.2178L11.9618 31.66H1.7959Z" fill="white" />
              </svg>
            </div>
            <p className='text-sm leading-loose'>الإقامة كانت رائعة! الشقة نظيفة ومجهزة بكل ما نحتاجه، والموقع قريب من جميع الخدمات. بالتأكيد سأكرر التجربة.</p>
            <div className='flex items-center justify-between'>
              <p className='text-sm font-bold'>الخميس، 27 مارس</p>
              {/* rate */}
              <div className="flex items-end gap-1 w-fit" >
                <p className="p-0 m-0 text-xs font-semibold">5 / 5</p>
                <TiStarFullOutline size={24} className="text-yellow-500" />
              </div >
            </div>
          </div>
        ))}
      </div>
      {/* comment form */}
      <div className='bg-body p-6 rounded-[40px] space-y-3'>
        <div className='flex items-center justify-between'>
          <p className='text-sm font-bold text-main-navy'>اترك تعليق</p>
          <div className='flex items-center gap-1'>
            {Array.from({ length: 5 }, (_, index) => (
              <TiStarFullOutline key={index} size={16} className="text-gray-300" />
            ))}
          </div>
        </div>
        <div className='w-full h-[1px] bg-gray-300' />
        <textarea className='w-full resize-none bg-transparent placeholder:text-xs placeholder:font-bold ' cols="30" rows="10" placeholder="اكتب هنا..">
        </textarea>
        <div className='w-full h-[1px] bg-gray-300' />
        <button className='px-8 py-5 text-sm font-bold rounded-full bg-main-blue text-white hover:bg-main-purple transition-all duration-300'>حفظ الان</button>
      </div>
    </div>
  )
}

export default Comments
