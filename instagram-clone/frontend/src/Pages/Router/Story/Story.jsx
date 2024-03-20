import React, { useEffect } from "react";
import StoryViewer from "../../../Components/StoryComponets/StoryViwer";
import { useDispatch, useSelector } from "react-redux";
import { findStoryByUserId } from "../../../Redux/Story/Action";
import { useParams } from "react-router-dom";

const Story = () => {
    const dispatch = useDispatch();
    const {userId} = useParams();
    const jwt=localStorage.getItem("token");
    const {story} =useSelector(store=>store);

    console.log("stories",story)

    useEffect(()=>{
        const data ={
            jwt,userId
        };
        dispatch(findStoryByUserId(data));
          
    },[userId])
    return(
        <div>
           { <StoryViewer stories={story?.stories}/>}
        </div>
    )
}

export default Story