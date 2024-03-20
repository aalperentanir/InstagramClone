import React, { useEffect } from 'react'
import { ProfileUserDetails } from '../../../Components/ProfileComponets/ProfileUserDetails'
import ReqUserPostPart from '../../../Components/ProfileComponets/ReqUserPostPart'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { findUserByUsernameAction, getUserProfileAction } from '../../../Redux/User/Action'
import { isFollowing, isReqUser } from '../../../Config/Logics'

 const Profile = () => {
    const dispatch=useDispatch();
    const token=localStorage.getItem("token");
    const{username} = useParams();
    const {user}=useSelector(store=>store);

    const isReq=isReqUser(user.reqUser?.id,user.findByUsername?.id);
    const isFollowed=isFollowing(user.reqUser,user.findByUsername);

    useEffect(()=>{
        const data={
            jwt:token,
            username
        }
        dispatch(getUserProfileAction(token))
        dispatch(findUserByUsernameAction(data));
                
    },[username,user.follower,user.following])

    return(
        <div className='px-20'>
            <div className=''>
                <ProfileUserDetails user={isReq?user.reqUser:user.findByUsername} isFollowing={isFollowed} isReqUser={isReq}/>
            </div>
            <div>
                <ReqUserPostPart user={isReq?user.reqUser:user.findByUsername}/>
            </div>
        </div>
    )
}

export default Profile