import React from 'react'

const HotelsPagination = ({ data, setPage }) => {
    return (
        <div className="pagination">
            {
                Array.from({ length: data?.last_page }, (_, index) => (
                    data?.current_page === index + 1 ?
                        <span key={index}>{index + 1}</span>
                        :
                        <button key={index} onClick={() => {
                            setPage(index + 1)
                            window.scrollTo(0, 0)

                            }} className={data?.current_page === index + 1 ? 'active' : ''}>
                            {index + 1}
                        </button>
                ))
            }
        </div>
    )
}

export default HotelsPagination
