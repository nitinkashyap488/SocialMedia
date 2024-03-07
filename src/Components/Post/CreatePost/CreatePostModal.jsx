import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalHeader,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import { GrEmoji } from "react-icons/gr";
import { GoLocation } from "react-icons/go";
import { Button } from "@chakra-ui/button";
import "./CreatePostModel.css";

import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../../Redux/Post/Action";
import { uploadToCloudinary } from "../../../Config/UploadToCloudinary";
import CommentModel from "../../Comment/CommentModel";

const CreatePostModal = ({ onOpen, isOpen, onClose }) => {
  const finalRef = React.useRef(null);
  const [file, setFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store);

  const [postData, setPostData] = useState({
    image: "",
    caption: "",
    location: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevValues) => ({ ...prevValues, [name]: value }));
  };

  useEffect(() => {
    console.log("files", file);
  }, [file]);

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (
      droppedFile.type.startsWith("image/") ||
      droppedFile.type.startsWith("video/")
    ) {
      setFile(droppedFile);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    setIsDragOver(true);
  }
  function handleDragLeave(event) {
    setIsDragOver(false);
  }
  const handleOnChange = async (e) => {
    console.log(e.target.value);

    const file = e.target.files[0];
    if (
      file &&
      (file.type.startsWith("image/") || file.type.startsWith("video/"))
    ) {
      setFile(file);
      const url = await uploadToCloudinary(file);
      setPostData((prevValues) => ({ ...prevValues, image: url }));
    } else {
      setFile(null);
      alert("please select an image or video");
    }
  };

  const handleSubmit = async () => {
    const data = {
      jwt: token,
      data: postData,
    };
    if (token) {
      dispatch(createPost(data));
      onClose();
    }

    console.log("data --- ", data);
  };

  return (
    <div>
      <Modal
        size={"4xl"}
        onClose={() => {
          onClose();
          setFile(null);
          setIsDragOver(false);
        }}
        isOpen={isOpen}
        finalFocusRef={finalRef}
        isCentered
      >
        <ModalOverlay />
        <ModalContent fontSize={"sm"}>
          <div className="flex justify-between py-1 px-10 items-center">
            <p>Create New Post</p>
            <Button
              onClick={handleSubmit}
              className="inline-flex"
              colorScheme="blue"
              size={"sm"}
              variant="ghost"
            >
              Share
            </Button>
          </div>
          <hr className="hrLine" />
          <ModalBody>
            <div className="modalBodyBox flex h-[70vh] justify-between pb-5">
              <div className="w-[50%]">
                {!file && (
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className="drag-drop h-full"
                  >
                    <div className="flex justify-center flex-col items-center">
                      <FaPhotoVideo
                        className={`text-3xl ${
                          isDragOver ? "text-blue-800" : ""
                        }`}
                      />
                      <p>Drag Photos and Videos here</p>
                    </div>
                    <label htmlFor="file-upload" className="custom-file-upload">
                      Select from Computer
                    </label>
                    <input
                      className="fileInput"
                      type="file"
                      id="file-upload"
                      accept="image/*, video/*"
                      multiple
                      onChange={(e) => handleOnChange(e)}
                    />
                  </div>
                )}
                {file && (
                  <img
                    className="max-h-full"
                    src={URL.createObjectURL(file)}
                    alt="dropped-img"
                  />
                )}
              </div>
              <div className="w-[1px] border h-full"></div>
              <div className="w-[50%]">
                <div className="flex items-center px-2">
                  <img
                    className="w-7 h-7 rounded-full"
                    src={
                      user?.reqUser?.image ||
                      "https://cdn.pixabay.com/photo/2023/03/29/19/32/man-7886201_640.jpg"
                    }
                    alt=""
                  />{" "}
                  <p className="font-semibold ml-4">
                    {user?.reqUser?.username}
                  </p>
                </div>
                <div className="px-2">
                  <textarea
                    placeholder="Write a caption"
                    className="captionInput"
                    name="caption"
                    rows="8"
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="flex justify-between px-2">
                  <GrEmoji />
                  <p className="opacity-70">{postData.caption?.length}/2,200</p>
                </div>
                <hr />
                <div className="p-2 justify-between items-center flex">
                  <input
                    className="locationInput"
                    type="text"
                    placeholder="location"
                    name="location"
                    onChange={handleInputChange}
                  />
                  <GoLocation />
                </div>
                <hr />
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreatePostModal;
