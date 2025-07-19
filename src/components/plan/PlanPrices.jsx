
const PlanPrices = ({ data }) => {
    return (
        <section className="package-section">
            <div className="container">
                <h6 className="package-head">البـــاقة !.</h6>
                <h3 className="package-title">أسعــــــار البــاقة</h3>
                <p className="package-text">قد تكون هذه البـــاقة ممتعةً لك !</p>
                <div className="package-cont">
                    {
                        data.planRooms.map((room, index) => (
                            <div className="package-item">
                                <img src={room.icon} alt="package-img"  style={{height:"50px" ,objectFit:"contain",marginBottom:"18px"}} />
                                <h5 className="package-name">{room.name}</h5>
                                <span className="package-ele"><i className="fa-solid fa-circle-check"></i><span>{room.age_groups} سنـــوات.</span></span>
                                <div className="package-price">{room.price} <span> {room.currencyName}</span>
                                </div>
                            </div>
                        ))
                    }

                </div>
                <a href="#" className="custom-link"><span>أحصل على بـــاقتك الان</span>
                    <i className="fa-brands fa-whatsapp"></i></a>
            </div>
        </section>
    )
}

export default PlanPrices
