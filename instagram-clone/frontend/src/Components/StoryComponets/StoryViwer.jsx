import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Progressbar from "./Progressbar";

const StoryViewerContainer = styled.div`
display:flex;
justify-content:center;
align-items:center;
height:100vh;
background-color:black;
`

const StroyImage = styled.img`
max-height:90vh;
object-fit:contain;
`

const StoryViewer = ({ stories }) => {
    const [curentStoryIndex, setCurentStoryIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleNextStory = () => {
        if (curentStoryIndex < stories?.length - 1) {
            setCurentStoryIndex(curentStoryIndex + 1);
            setActiveIndex(activeIndex + 1);
        } else if (curentStoryIndex === stories?.length - 1) {
            setCurentStoryIndex(0);
            setActiveIndex(0);
        }
    }
    useEffect(() => {
        const interval = setInterval(() => { handleNextStory() }, 2000);
        return () => clearInterval(interval);
    }, [curentStoryIndex])


    return (
        <div className="relative w-full">
            <StoryViewerContainer>
                <StroyImage src={stories?.[curentStoryIndex].image} />

                <div className="absolute top-0 flex w-full">
                    {stories?.map((item,index)=> <Progressbar key={index} duration={2000} index={index} activeIndex={activeIndex}/>)}
                </div>
            </StoryViewerContainer>
        </div>
    )
}

export default StoryViewer