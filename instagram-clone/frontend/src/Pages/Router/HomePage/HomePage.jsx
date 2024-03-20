import React, { useEffect, useState } from 'react'
import StoryCircle from '../../../Components/Story/StoryCircle'
import HomeRight from '../../../Components/HomeRight/HomeRight'
import PostCard from '../../../Components/Post/PostCard'
import { useDisclosure } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { findUserPostAction } from '../../../Redux/Post/Action'
import { findUserByUserIdsAction, getSuggestionUser, getUserProfileAction } from '../../../Redux/User/Action'
import { hasStory } from '../../../Config/Logics'


const HomePage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [userIds, setUserIds] = useState([]);
    const { user, post, story } = useSelector(store => store);
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();

    useEffect(()=>{
        const newIds = user.reqUser?.following?.map((user) => user.id) || [];
        setUserIds([user.reqUser?.id, ...newIds]);
    }, [user.reqUser]);
    
    useEffect(() => {
            const data = {
                jwt: token,
                userIds: [userIds].join(","),// Dizi elemanlarını virgülle birleştir
            };
            dispatch(findUserPostAction(data));
            dispatch(findUserByUserIdsAction(data));
            dispatch(getSuggestionUser(token));
        
    }, [userIds, post.createdPost, post.deletedPost]);

    useEffect(()=>{
        dispatch(getUserProfileAction(token))
    },[token])
    
    const storyUsers=hasStory(user.findByUserIds)
    console.log("story:",storyUsers)

    
    return (
        <div>
            <div className="mt-10 flex w-[100%] justify-center">
                <div className="w-[44%] px-10 ">
                    <div className='storyDiv flex space-x-2 border p-4 rounded-md justify-start w-full'>
                        {storyUsers.length>0 && storyUsers.map((item) => (
                            <StoryCircle user={item} />))}
                    </div>

                    <div className="space-y-10 w-ful mt-10">
                        {post.usersPost.length > 0 && post.usersPost.map((item) => 
                        (<PostCard post={item} />))}
                    </div>
                </div>
                <div className="w-[30%]">
                    <HomeRight />
                </div>
            </div>

        </div>
    )
}

export default HomePage