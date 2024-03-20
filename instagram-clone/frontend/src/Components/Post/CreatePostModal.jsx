import { Button, Modal, ModalBody, ModalContent, ModalOverlay, SelectField } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import "./CreatePostModal.css";
import { GrEmoji } from "react-icons/gr"
import { GoLocation } from "react-icons/go"
import { useDispatch, useSelector } from "react-redux";
import { createPostAction } from "../../Redux/Post/Action";
import { uploadToCloudinary } from "../../Config/UploadToCloudinary";


const CreatePostModal = ({
    onClose, isOpen
}) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [file, setFile] = useState();
    const [caption, setCaption] = useState("");
    const dispatch=useDispatch();
    const [imgUrl,setImageUrl]=useState("");
    const[location,setLocation]=useState("");
    const token=localStorage.getItem("token");
    const { user,post } = useSelector(store => store);

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.file[0];
        if (droppedFile.type.startsWith("image/") || droppedFile.type.startsWith("video/")) {
            setFile(droppedFile);
        }
    }

    const handleDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
        setIsDragOver(true);
    }

    const handleDragLeave = () => {
        setIsDragOver(false);
    }

    const handleOnChange = async(e) => {
        const file = e.target.files[0];
        if (file && (file.type.startsWith("image/") || file.type.startsWith("video/"))) {
            const imgUrl=await uploadToCloudinary(file);
            setImageUrl(imgUrl);
            setFile(file);
        }
        else {
            setFile(null);
            alert("Please select an image or video");
          }    
        }
        const handleCaptionChange = (e) => {
            setCaption(e.target.value);
    }

    const handleCreatePost=()=>{
        const data={
            jwt:token,
            data:{
                caption,
                image:imgUrl,
                location,    
            }
        }
        dispatch(createPostAction(data));
    }
    return (
        <div>
            <Modal size={"4xl"} onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <div className="flex justify-between py-1 px-10 items-center">
                        <p>Create new Post</p>
                        <Button variant={"ghost"} size="sm" colorScheme={"blue"} onClick={handleCreatePost}>
                            Share
                        </Button>
                    </div>
                    <hr />
                    <ModalBody>
                        <div className="h-[70vh justify-between] pb-5 flex">
                            <div className="w-[50%]">
                                {!file && <div onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} className="drag-drop h-full">
                                    <div>
                                        <FaPhotoVideo className="text-3xl" />
                                        <p>Drag Photos or videos here</p>
                                    </div>
                                    <label htmlFor="file-upload" className="custom-file-upload">Select From Computer</label>
                                    <input className="fileInput" type="file" id="file-upload" accept="image/*, video/*" onChange={handleOnChange} />
                                </div>}
                                {file && <img className="max-h-full" src={URL.createObjectURL(file)} alt="" />}

                            </div>
                            <div className="w-[1px] border-2 h-full"></div>
                            <div className="w-[50%]">

                                <div className="flex items-center px-2">
                                    <img className="w-7 h-7 rounded-full" src={user.reqUser?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="" />
                                    <p className="font-semibold ml-4">{user.reqUser?.username}</p>
                                </div>
                                <div className="px-2">
                                    <textarea placeholder="Write a caption" className="captionInput" name="caption" rows="8" onChange={handleCaptionChange}></textarea>
                                </div>
                                <div className="flex justify-between px-2">
                                    <GrEmoji />
                                    <p className="opacity-70">{caption?.length} /2,200</p>
                                </div>
                                <hr />
                                <div className="p-2 flex justify-between items-center">
                                    <input onChange={(e)=>setLocation(e.target.value)} className="locationInput" type="text" placeholder="location" name="location" />
                                    <GoLocation />
                                </div>
                                <hr />
                            </div>
                        </div>

                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default CreatePostModal