import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  BsBookmark,
  BsBookmarkFill,
  BsEmojiSmile,
  BsThreeDots,
} from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { timeDifference } from "../../Config/Logic";
import { createComment } from "../../Redux/Comment/Action";
import { findPostByIdAction } from "../../Redux/Post/Action";
import "./CommentModel.css";
import CommentCard from "./CommentCard";

const CommentModel = ({
  onClose,
  isOpen,
  isSaved,
  isPostLiked,
  handlePostLike,
  handleSavePost,
  onOpen,
  postData,
  handleLikePost,
  handleUnLikePost,
  handleUnSavePost,
}) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("token");
  const { post, comments } = useSelector((store) => store);
  const [commentContent, setCommentContent] = useState("");
  const { postId } = useParams();
  const navigate = useNavigate();
  // console.log("comments :",comments)
  useEffect(() => {
    dispatch(
      findPostByIdAction({
        jwt,
        postId,
      })
    );
  }, [postId, comments?.createdComment]);

  const handleAddComment = () => {
    const data = {
      jwt,
      postId,
      data: {
        content: commentContent,
      },
    };
    console.log("comment content ", commentContent);
    dispatch(createComment(data));
    setCommentContent("");
  };

  const handleCommnetInputChange = (e) => {
    setCommentContent(e.target.value);
  };
  const handleOnEnterPress = (e) => {
    if (e.key === "Enter") {
      handleAddComment();
    } else return;
  };

  const handleClose = () => {
    onClose();
    navigate("/");
  };
  return (
    <div>
      <Modal size={"4xl"} onClose={handleClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <div className="flex h-[75vh] ">
              <div className="w-[45%] flex flex-col justify-center">
                <img
                  className="max-h-full max-w-full"
                  src={post.singlePost?.image}
                  alt=""
                />
              </div>
              <div className="w-[55%] pl-10 relative">
                <div className="reqUser flex justify-between items-center py-5">
                  <div className="flex items-center">
                    <div>
                      <img
                        className="w-9 h-9 rounded-full"
                        src="https://cdn.pixabay.com/photo/2024/01/07/11/17/welsh-corgi-8492879_640.jpg"
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p>{post?.singlePost?.user?.name}</p>
                      <p>{post?.singlePost?.user?.username}</p>
                    </div>
                  </div>
                  <BsThreeDots />
                </div>
                <hr />
                <div className="comment">
                  {post?.singlePost?.comments?.length > 0 &&
                    post?.singlePost?.comments.map((item) => (
                      <CommentCard comment={item} />
                    ))}
                </div>
                <div className="absolute bottom-0 w-[90%]">
                  <div className="flex justify-between items-center w-full  mt-5">
                    <div className="flex items-center space-x-2">
                      {isPostLiked ? (
                        <AiFillHeart
                          className="text-2xl hover:opacity-50 cursor-pointer text-red-700"
                          onClick={handleUnLikePost}
                        />
                      ) : (
                        <AiOutlineHeart
                          className="text-2xl hover:opacity-50 cursor-pointer"
                          onClick={handleLikePost}
                        />
                      )}

                      <FaRegComment className="text-xl hover:opacity-50 cursor-pointer" />
                      <RiSendPlaneLine className="text-xl hover:opacity-50 cursor-pointer" />
                    </div>
                    <div className="cursor-pointer">
                      {isSaved ? (
                        <BsBookmarkFill
                          onClick={() => handleUnSavePost(post.singlePost?.id)}
                          className="text-xl hover:opacity-50 cursor-pointer"
                        />
                      ) : (
                        <BsBookmark
                          onClick={() => handleSavePost(post.singlePost?.id)}
                          className="text-xl hover:opacity-50 cursor-pointer"
                        />
                      )}
                    </div>
                  </div>
                  <div className="w-full py-2 ">
                    {post.singlePost?.likedByUsers?.length > 0 && (
                      <p className="text-sm font-semibold py-2">
                        {post.singlePost?.likedByUsers?.length} likes{" "}
                      </p>
                    )}
                    <p className="opacity-70 text-sm pb-5">
                      {timeDifference(post?.singlePost?.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center w-full">
                    <BsEmojiSmile className="mr-3 text-xl" />
                    <input
                      className="commentInput w-[70%]"
                      type="text"
                      placeholder="Add a comment..."
                      onKeyPress={handleOnEnterPress}
                      onChange={handleCommnetInputChange}
                      value={commentContent}
                    />
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CommentModel;
