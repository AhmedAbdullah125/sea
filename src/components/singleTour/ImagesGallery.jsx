// import React from 'react'

// const images = [
//   "/public/hotels/hotel-1.png",
//   "/public/hotels/hotel-2.png",
//   "/public/hotels/hotel-3.png",
//   "/public/hotels/hotel-4.png",
//   "/public/hotels/hotel-1.png",
// ]
// const ImagesGallery = () => {
//   return (
//     <div className='grid grid-cols-12 gap-2'>
//       <div className='relative col-span-12 xl:col-span-6   h-[450px] bg-red-500 rounded-[40px] overflow-hidden'>

//         <img src={images[0]} alt="hotel" loading='lazy' className='w-full h-full object-cover ' />
//         {/* icons */}
//         <div className='absolute bottom-5 start-5 z-10 flex items-center gap-2'>
//           <div className='size-12 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center'>
//             <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path fill-rule="evenodd" clip-rule="evenodd" d="M9.8829 6.62812C9.8829 5.25351 10.9973 4.13917 12.3719 4.13917C13.7465 4.13917 14.8608 5.25351 14.8608 6.62812C14.8608 8.0027 13.7465 9.1171 12.3719 9.1171C10.9973 9.1171 9.8829 8.0027 9.8829 6.62812ZM12.3719 5.28792C11.6317 5.28792 11.0317 5.88794 11.0317 6.62812C11.0317 7.36829 11.6317 7.9683 12.3719 7.9683C13.112 7.9683 13.7121 7.36829 13.7121 6.62812C13.7121 5.88794 13.112 5.28792 12.3719 5.28792ZM17.7595 13.6904C17.9241 13.2995 18.0574 12.8918 18.1563 12.4703C18.6146 10.5166 18.6146 8.4834 18.1563 6.52975C17.4945 3.70842 15.2916 1.50549 12.4703 0.843703C10.5166 0.385432 8.4834 0.385432 6.52975 0.843703C3.70842 1.50549 1.5055 3.70841 0.843703 6.52975C0.385432 8.4834 0.385432 10.5166 0.843703 12.4703C0.892293 12.6774 0.949193 12.8812 1.01403 13.0813L1.61782 12.4777C3.80157 10.2943 7.34209 10.2943 9.5258 12.4777L11.2165 14.168L11.6597 13.7249C13.3579 12.0271 16.0837 12.047 17.7595 13.6904ZM17.201 14.7801L17.1765 14.7506C15.9761 13.3104 13.7978 13.2116 12.4719 14.5373L12.0289 14.9802L14.4422 17.3931C15.5581 16.7711 16.4993 15.8786 17.1794 14.802C17.1868 14.7948 17.194 14.7875 17.201 14.7801ZM13.3264 17.9019L8.7136 13.29C6.97848 11.5552 4.16518 11.5552 2.43003 13.29L1.49195 14.2279C2.50173 16.1839 4.32731 17.6397 6.52975 18.1563C8.4834 18.6146 10.5166 18.6146 12.4703 18.1563C12.7626 18.0877 13.0484 18.0026 13.3264 17.9019Z" fill="white" />
//             </svg>
//           </div>
//           <div className='size-12 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center'>
//             <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M7.00955 0.500007H13.9897C14.2222 0.499947 14.4004 0.499907 14.5562 0.515147C15.664 0.623517 16.5708 1.28958 16.9553 2.18678H4.04395C4.42846 1.28958 5.33521 0.623517 6.44303 0.515147C6.59883 0.499907 6.77707 0.499947 7.00955 0.500007Z" fill="white" />
//               <path d="M4.81021 3.22266C3.41958 3.22266 2.27932 4.06241 1.89879 5.17645C1.89086 5.19967 1.88325 5.22302 1.87598 5.24647C2.27413 5.1259 2.6885 5.04713 3.10796 4.99336C4.18834 4.85485 5.55368 4.85492 7.13971 4.85501H14.0318C15.6178 4.85492 16.9832 4.85485 18.0636 4.99336C18.483 5.04713 18.8974 5.1259 19.2955 5.24647C19.2883 5.22302 19.2807 5.19967 19.2727 5.17645C18.8922 4.06241 17.7519 3.22266 16.3613 3.22266H4.81021Z" fill="white" />
//               <path fill-rule="evenodd" clip-rule="evenodd" d="M13.8276 6.04199H7.17239C3.79758 6.04199 2.11017 6.04199 1.16232 7.02882C0.21447 8.01565 0.43748 9.54025 0.88351 12.5896L1.30648 15.4811C1.65626 17.8724 1.83115 19.068 2.72834 19.784C3.62553 20.5 4.9488 20.5 7.59534 20.5H13.4046C16.0512 20.5 17.3745 20.5 18.2717 19.784C19.1689 19.068 19.3437 17.8724 19.6935 15.4811L20.1165 12.5896C20.5625 9.54035 20.7855 8.01564 19.8377 7.02882C18.8898 6.04199 17.2024 6.04199 13.8276 6.04199ZM13.0812 14.2942C13.6396 13.9481 13.6396 13.0519 13.0812 12.7058L9.7096 10.6156C9.1669 10.2792 8.5 10.7171 8.5 11.4099V15.5901C8.5 16.2829 9.1669 16.7208 9.7096 16.3844L13.0812 14.2942Z" fill="white" />
//             </svg>

//           </div>
//         </div>
//       </div>
//       <div className='col-span-12 xl:col-span-6 h-[450px]  grid grid-cols-12 gap-2 '>
//         {images.slice(1, 5).map((img, index) => (
//           <div key={index} className='bg-red-500 rounded-[40px] xl:col-span-6 h-1/2 overflow-hidden'>
//             <img
//               src={img}
//               alt={`hotel-${index + 2}`}
//               className='w-full h-full object-cover'
//               loading='lazy'
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default ImagesGallery

import React, { useState } from 'react';

const images = [
  "/public/hotels/hotel-1.png",
  "/public/hotels/hotel-2.png",
  "/public/hotels/hotel-3.png",
  "/public/hotels/hotel-4.png",
  "/public/hotels/hotel-1.png",
];

const ImagesGallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className='grid grid-cols-12 gap-2'>
      {/* Main image */}
      <div className='relative col-span-12 xl:col-span-6 h-[450px]  rounded-[40px]  '>
        <img src={images[0]} alt="hotel" loading='lazy' className='w-full h-full object-cover rounded-[40px]' />
        <div className='absolute bottom-5 start-5 z-10 flex items-center gap-2'>
          <button
            onClick={() => openModal(0)}
            className='size-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xl hover:bg-white/40 transition'
          >
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.8829 6.62812C9.8829 5.25351 10.9973 4.13917 12.3719 4.13917C13.7465 4.13917 14.8608 5.25351 14.8608 6.62812C14.8608 8.0027 13.7465 9.1171 12.3719 9.1171C10.9973 9.1171 9.8829 8.0027 9.8829 6.62812ZM12.3719 5.28792C11.6317 5.28792 11.0317 5.88794 11.0317 6.62812C11.0317 7.36829 11.6317 7.9683 12.3719 7.9683C13.112 7.9683 13.7121 7.36829 13.7121 6.62812C13.7121 5.88794 13.112 5.28792 12.3719 5.28792ZM17.7595 13.6904C17.9241 13.2995 18.0574 12.8918 18.1563 12.4703C18.6146 10.5166 18.6146 8.4834 18.1563 6.52975C17.4945 3.70842 15.2916 1.50549 12.4703 0.843703C10.5166 0.385432 8.4834 0.385432 6.52975 0.843703C3.70842 1.50549 1.5055 3.70841 0.843703 6.52975C0.385432 8.4834 0.385432 10.5166 0.843703 12.4703C0.892293 12.6774 0.949193 12.8812 1.01403 13.0813L1.61782 12.4777C3.80157 10.2943 7.34209 10.2943 9.5258 12.4777L11.2165 14.168L11.6597 13.7249C13.3579 12.0271 16.0837 12.047 17.7595 13.6904ZM17.201 14.7801L17.1765 14.7506C15.9761 13.3104 13.7978 13.2116 12.4719 14.5373L12.0289 14.9802L14.4422 17.3931C15.5581 16.7711 16.4993 15.8786 17.1794 14.802C17.1868 14.7948 17.194 14.7875 17.201 14.7801ZM13.3264 17.9019L8.7136 13.29C6.97848 11.5552 4.16518 11.5552 2.43003 13.29L1.49195 14.2279C2.50173 16.1839 4.32731 17.6397 6.52975 18.1563C8.4834 18.6146 10.5166 18.6146 12.4703 18.1563C12.7626 18.0877 13.0484 18.0026 13.3264 17.9019Z" fill="white" />
            </svg>

          </button>
          <button
            onClick={() => openModal(0)}
            className='size-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xl hover:bg-white/40 transition'
          >
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.00955 0.500007H13.9897C14.2222 0.499947 14.4004 0.499907 14.5562 0.515147C15.664 0.623517 16.5708 1.28958 16.9553 2.18678H4.04395C4.42846 1.28958 5.33521 0.623517 6.44303 0.515147C6.59883 0.499907 6.77707 0.499947 7.00955 0.500007Z" fill="white" />
              <path d="M4.81021 3.22266C3.41958 3.22266 2.27932 4.06241 1.89879 5.17645C1.89086 5.19967 1.88325 5.22302 1.87598 5.24647C2.27413 5.1259 2.6885 5.04713 3.10796 4.99336C4.18834 4.85485 5.55368 4.85492 7.13971 4.85501H14.0318C15.6178 4.85492 16.9832 4.85485 18.0636 4.99336C18.483 5.04713 18.8974 5.1259 19.2955 5.24647C19.2883 5.22302 19.2807 5.19967 19.2727 5.17645C18.8922 4.06241 17.7519 3.22266 16.3613 3.22266H4.81021Z" fill="white" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M13.8276 6.04199H7.17239C3.79758 6.04199 2.11017 6.04199 1.16232 7.02882C0.21447 8.01565 0.43748 9.54025 0.88351 12.5896L1.30648 15.4811C1.65626 17.8724 1.83115 19.068 2.72834 19.784C3.62553 20.5 4.9488 20.5 7.59534 20.5H13.4046C16.0512 20.5 17.3745 20.5 18.2717 19.784C19.1689 19.068 19.3437 17.8724 19.6935 15.4811L20.1165 12.5896C20.5625 9.54035 20.7855 8.01564 19.8377 7.02882C18.8898 6.04199 17.2024 6.04199 13.8276 6.04199ZM13.0812 14.2942C13.6396 13.9481 13.6396 13.0519 13.0812 12.7058L9.7096 10.6156C9.1669 10.2792 8.5 10.7171 8.5 11.4099V15.5901C8.5 16.2829 9.1669 16.7208 9.7096 16.3844L13.0812 14.2942Z" fill="white" />
            </svg>
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className='col-span-12 xl:col-span-6 h-[450px] max-xl:hidden  grid grid-cols-12 gap-2'>
        {images.slice(1, 5).map((img, index) => (
          <div
            key={index}
            className='rounded-[40px] col-span-6 xl:col-span-6  overflow-hidden cursor-pointer'
            onClick={() => openModal(index + 1)}
          >
            <img
              src={img}
              alt={`hotel-${index + 2}`}
              className='w-full h-full object-cover'
              loading='lazy'
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/80 flex items-center justify-center z-50 group'
          onClick={closeModal}
        >
          <div className='relative max-w-[90%] max-h-[80vh]' onClick={(e) => e.stopPropagation()}>
            <img
              src={images[currentIndex]}
              alt='modal-img'
              className='max-w-full max-h-[80vh] rounded-xl shadow-lg'
            />

            {/* Arrows */}
            {images.length > 1 && (
              <div className='absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-2'>
                <button
                  onClick={prevImage}
                  className=' size-10 bg-main-blue hover:bg-main-purple rounded-full flex items-center justify-center text-white text-3xl font-bold '
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className=' size-10 bg-main-blue hover:bg-main-purple rounded-full flex items-center justify-center text-white text-3xl font-bold '
                >
                  ›
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagesGallery;

