import React from 'react'

const BreadCrumb = ({ data }) => {
    return (
        <section className="breadcrumb-sec">
            <div className="container">
                <ol className="breadcrumb">
                    {
                        data.map((item, index) => (
                            <li key={index} className={item.href == '/' ? 'item-home' : index == data.length - 1 ? 'active' : ""}>
                                {
                                    item.href == '#' ?
                                        <span className="bread-current">{item.title}</span>
                                        :
                                        <a href={item.href}>{item.title}</a>
                                }
                            </li>
                        ))
                    }
                </ol>
            </div>
        </section>
    )
}

export default BreadCrumb
