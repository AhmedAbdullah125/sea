import React from 'react'
import { Link } from 'react-router-dom';
import { useGetSettings } from '@/components/global/useGetSettings';


const Things = () => {
    const { data, isLoading, isError } = useGetSettings();
    console.log(data);
    
    return (

        <section className="trip-things-section">
            <div className="container">
                <div className="section-header-cont">
                    <h2 className="section-title">حــاجات قد تهمك في إسطنبــول.</h2>
                </div>
                <Link to={`https://wa.me/${isLoading ? '' : data.whatsapp}?text=اريد مناقشتكم حول الفعاليات المتاحة `} className="things">
                    <div className="r-side">
                        <div className="toper">
                            <span>+20</span>
                            <p>توب عشرة فعاليات الشهر!</p>
                        </div>
                        <div className="lower">
                            {/* <i className="fa-solid fa-chevron-left"></i> */}
                        </div>
                    </div>
                    <div className="l-side">
                        <div className="item">
                            <div className="details">
                                <span>+08</span>
                                <p>مطاعم عليك زيارتها</p>
                            </div>
                            {/* <i className="fa-solid fa-chevron-left"></i> */}
                        </div>
                        <div className="item">
                            <div className="details">
                                <span>+10</span>
                                <p> أماكن سياحية بإمكانك اكتشافها!</p>
                            </div>
                            {/* <i className="fa-solid fa-chevron-left"></i> */}
                        </div>

                    </div>
                </Link>
            </div>
        </section>
    )
}

export default Things
