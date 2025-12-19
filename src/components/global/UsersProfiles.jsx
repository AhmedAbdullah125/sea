import React from 'react'

const UsersProfiles = ({ data }) => {
    return (
        <div className="about-profiles">

            {
                data.map((item, index) => (
                    <div className="profile-circle" key={index}>
                        <img src={item.image} alt="Profile 1" />
                    </div>
                ))
            }
            <div className="profile-circle more-circle">
                <span>+4</span>
            </div>
        </div>
    )
}

export default UsersProfiles
