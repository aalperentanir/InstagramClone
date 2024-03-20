import React, { useState } from 'react'
import { IoReorderThreeOutline } from "react-icons/io5"
import { menu } from './SidebarConfig'
import { useNavigate } from 'react-router-dom';
import { FaThreads } from "react-icons/fa6";
import CreatePostModal from '../Post/CreatePostModal';
import { useDisclosure } from '@chakra-ui/react';
import SearchComponents from '../SearchComponents/SearchComponents';
import { useSelector } from 'react-redux';
const Sidebar = () => {
const [activeTab,setActiveTab]=useState();
const navigate=useNavigate();
const {isOpen,onClose,onOpen}=useDisclosure();
const[isSearchVisible,setIsSearchVisible]= useState(false);
const {user}=useSelector(store=>store);


    const handleTabClick=(title)=>{
        setActiveTab(title);
        if(title==="Profile"){
            navigate(`/${user.reqUser?.username}`)
        }
        else if(title==="Home"){
            navigate("/")
        }
        else if(title==="Create"){
            onOpen();
        }
        if(title=="Search"){
            setIsSearchVisible(true);
        }else{
            setIsSearchVisible(false);
        }
    };
    return (
        <div className="sticky top-0 h-[100vh] flex">
            <div className={`flex flex-col justify-between h-full px-10 ${activeTab==="Search"? "px-2":"px-10"}`}>
                {<div>
                    {!activeTab==="Search" &&<div className="pt-10">
                        <img className="w-40" src="https://i.imgur.com/zqpwkLQ.png" alt="" />
                    </div>}
                    <div className="mt-10">
                        {menu.map((item) => (
                            <div onClick={()=>handleTabClick(item.title)} className="flex items-center mb-5 cursor-pointer text-lg">

                                {activeTab===item.title? item.activeIcon:item.icon}
                                {activeTab!=="Search" &&<p className={`${activeTab===item.title?"font-bold":"font-semibold"}`}>{item.title}</p>}
                            </div>


                        ))}
                    </div>
                </div>}

                <div className="flex items-center cursor-pointer pb-10">
                    <IoReorderThreeOutline className="text-2xl"/>
                    {activeTab!=="Search" &&<p className="ml-5">More</p>}
                </div>
    
            </div>
            <CreatePostModal onClose={onClose} isOpen={isOpen}/>
            {isSearchVisible &&<SearchComponents/>}
        </div>
    );
};

export default Sidebar;