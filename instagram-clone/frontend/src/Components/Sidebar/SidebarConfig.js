import { AiFillCompass, AiFillHeart, AiFillHome, AiFillMessage, AiFillPlusCircle, AiOutlineCompass, AiOutlineHeart, AiOutlineHome, AiOutlineMessage, AiOutlinePlusCircle, AiOutlineSearch } from 'react-icons/ai'
import { RiVideoFill, RiVideoLine } from "react-icons/ri"
import { CgProfile } from "react-icons/cg"
import { FaThreads } from 'react-icons/fa6'
export const menu = [
    { title: "Home", icon: <AiOutlineHome className='text-2xl mr-5'></AiOutlineHome>, activeIcon: <AiFillHome className='text-2xl mr-5'></AiFillHome> },
    {
        title: "Search", icon: <AiOutlineSearch className='text-2xl mr-5'></AiOutlineSearch>, activeIcon: <AiOutlineSearch className='text-2xl mr-5'></AiOutlineSearch>
    },
    {
        title: "Explore", icon: <AiOutlineCompass className='text-2xl mr-5'></AiOutlineCompass>, activeIcon: <AiFillCompass className='text-2xl mr-5'></AiFillCompass>
    },
    {
        title: "Reels", icon: <RiVideoLine className='text-2xl mr-5'></RiVideoLine>, activeIcon: <RiVideoFill className='text-2xl mr-5'></RiVideoFill>
    },
    {
        title: "Message", icon: <AiOutlineMessage className='text-2xl mr-5'></AiOutlineMessage>, activeIcon: <AiFillMessage className='text-2xl mr-5'></AiFillMessage>
    },
    {
        title: "Notification", icon: <AiOutlineHeart className='text-2x1 mr-5'></AiOutlineHeart>, activeIcon: <AiFillHeart className='text-2x1 mr-5'></AiFillHeart>
    },
    {
        title: "Create", icon: <AiOutlinePlusCircle className='text-2xl mr-5'></AiOutlinePlusCircle>, activeIcon: <AiFillPlusCircle className='text-2xl mr-5'></AiFillPlusCircle>
    },
    {
        title: "Profile", icon: <CgProfile className='text-2xl mr-5'></CgProfile>, activeIcon: <CgProfile className='text-2xl mr-5'></CgProfile>
    },
    {
        title:"Threads", icon:<FaThreads  className='text-2xl mr-5'></FaThreads>,activeIcon:<FaThreads className='text-2xl mr-5'></FaThreads>
    }
]