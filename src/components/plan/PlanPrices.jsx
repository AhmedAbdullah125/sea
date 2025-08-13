
const PlanPrices = ({ data,settings }) => {
    console.log(data);
    return (
        <section className="package-section">
            <div className="container">
                <h6 className="package-head">البـــاقة !.</h6>
                <h3 className="package-title">أسعــــــار البــاقة</h3>
                <p className="package-text">قد تكون هذه البـــاقة ممتعةً لك !</p>
                <div className="package-cont">
                    {
                        data.planRooms.map((room, index) => (
                            <div className="package-item" key={index}>
                                <img src={room.icon} alt="package-img"  style={{height:"50px" ,objectFit:"contain",marginBottom:"18px"}} />
                                <h5 className="package-name">{room.name}</h5>
                                <span className="package-ele"><i className="fa-solid fa-circle-check"></i><span>{room.age_groups} سنـــوات.</span></span>
                                <div className="package-price">{Number(room.price).toFixed(1)} <span> {room.currency_name}</span>
                                </div>
                            </div>
                        ))
                    }

                </div>
                <a href={`https://wa.me/${settings?.whatsapp}?text=اريد مناقشتكم حول ${data.title}`} className="custom-link"><span>أحصل على بـــاقتك الان</span>
                    <i className="fa-brands fa-whatsapp"></i></a>
            </div>
        </section>
    )
}

export default PlanPrices
