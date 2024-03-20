import React from "react";
import "./SuggetionCard.css"

const SuggetionCard = ({user}) => {
    
    return(
        <div className="flex justify-between items-center">
            <div className="flex items-center">
                <img className="w-9 h-9 rounded-full" src={user.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="" />
                <div className="ml-2">
                    <p className="text-sm font-semibold">{user.username}</p>
                    <p className=" oneriler text-sm font-semibold opacity-70">Suggested for you</p>
                </div>
            </div>
            <p className="text-blue-600 text-sm font-semibold">Follow</p>
        </div>
    )
}

export default SuggetionCard