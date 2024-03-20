import React, { useEffect, useState } from 'react'
import { AiOutlineTable, AiOutlineUser } from 'react-icons/ai'
import { RiVideoAddLine } from 'react-icons/ri'
import { BiBookmark }from "react-icons/bi"
import ReqUserPostCard from './ReqUserPostCard'
import { useDispatch, useSelector } from 'react-redux'
import { reqUserPostAction } from '../../Redux/Post/Action'

const ReqUserPostPart = ({user}) => {
    const[activeTab,setActiveTab]=useState("Post");
    const dispatch = useDispatch();
    const token= localStorage.getItem("token")
    const {post}=useSelector(store=>store);



    const tabs=[
        {
            tab:"Post",icon:<AiOutlineTable></AiOutlineTable>,activeTab:""
        },
        {
            tab:"Reels",icon:<RiVideoAddLine></RiVideoAddLine>
        },
        {
            tab:"Saved",icon:<BiBookmark></BiBookmark>
        },
        {
            tab:"Tagged",icon:<AiOutlineUser></AiOutlineUser>
        }
    ]

    useEffect(()=>{
        if(user){
              const data={jwt:token,userId:user?.id}
        dispatch(reqUserPostAction(data))
        }
      
    },[user,post.createdPost])


    return(
        <div>
            <div className="flex space-x-14 border-t relative">
            {tabs.map((item)=>  (
            <div onClick={()=>setActiveTab(item.tab)} 
            className={`${activeTab===item.tab?"border-t border-black":"opacity-60"
            } flex items-center cursor-pointer py-2 text-sm`}
            >
                <p>{item.icon}</p>
                <p className="ml-1">{item.tab}</p>
                </div>
                ))}
            </div>
            <div>
                <div className="flex flex-wrap">
                    {activeTab === "Post"? post.profilePost?.map((item)=><ReqUserPostCard post={item}/>):user?.savedPost.map((item)=><ReqUserPostCard post={item}/>)}
                </div>
            </div>
          </div>
    )
}

export default ReqUserPostPart