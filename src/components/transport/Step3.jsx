// Step3.jsx
const Step3 = () => {
  return ( 
    <div className="xl:w-1/2 w-full xl:h-[300px] flex flex-col items-center justify-center gap-4    bg-white rounded-[50px] p-8">
      <svg width="71" height="65" viewBox="0 0 71 65" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" width="51" height="51" rx="25.5" fill="#F2F2F2" />
        <rect y="14" width="51" height="51" rx="25.5" fill="#016AB5" />
        <path d="M19.25 40.5L22.75 44L31.75 35" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <h3 className="text-main-blue font-bold text-sm">
        مبــروك, تم الحجــــز بنجــاح
      </h3>
      <p className="text-main-gray text-xs font-semibold">
        تم إكمـــال الحجز بنجــاح !. شكرا لثقتكم 
      </p>


    </div>
  );
};

export default Step3;
