import React from 'react'
import { useNavigate } from 'react-router-dom'

const StoryCircle = ({user}) => {
    const navigate = useNavigate();
    const handleNavigate=()=>{
        navigate(`/story/${user.id}`);
    }
    return(
        <div onClick={handleNavigate} className='cursor printer flex flex-col items-center'>
            <img className="w-16 h-16 rounded-full" src={user.image ||"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="" />
            <p>{user.username}</p>
        </div>
    )
}

export default StoryCircle