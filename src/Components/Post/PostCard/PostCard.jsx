import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { RiSendPlaneLine } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa";
import {
  BsBookmark,
  BsBookmarkFill,
  BsEmojiSmile,
  BsThreeDots,
  BsDot,
} from "react-icons/bs";
import "./PostCard.css";
import CommentModel from "../../Comment/CommentModel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import {
  isPostLikedByUser,
  isReqUserPost,
  isSavedPost,
} from "../../../Config/Logic";

import { createComment } from "../../../Redux/Comment/Action";
import {
  deletePostAction,
  likePostAction,
  savePostAction,
  unLikePostAction,
  unSavePostAction,
} from "../../../Redux/Post/Action";

const PostCard = ({
  userProfileImage,
  username,
  location,
  postImage,
  createdAt,
  post,
}) => {
  const [commentContent, setCommentContent] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store);
  const [isSaved, setIsSaved] = useState(false);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCommnetInputChange = (e) => {
    setCommentContent(e.target.value);
  };
  const [numberOfLikes, setNumberOfLike] = useState(0);

  const data = {
    jwt: token,
    postId: post.id,
  };

  const handleAddComment = () => {
    const data = {
      jwt: token,
      postId: post.id,
      data: {
        content: commentContent,
      },
    };
    console.log("comment content ", commentContent);
    dispatch(createComment(data));
  };

  const handleOnEnterPress = (e) => {
    if (e.key === "Enter") {
      handleAddComment();
    } else return;
  };

  const handleLikePost = () => {
    dispatch(likePostAction(data));
    setIsPostLiked(true);
    setNumberOfLike(numberOfLikes + 1);
  };
  const handleUnLikePost = () => {
    dispatch(unLikePostAction(data));
    setIsPostLiked(false);
    setNumberOfLike(numberOfLikes - 1);
  };

  const handleSavePost = (postId) => {
    dispatch(savePostAction(data));
    setIsSaved(true);
  };

  const handleUnSavePost = () => {
    dispatch(unSavePostAction(data));
    setIsSaved(false);
  };

  const handleNavigate = (username) => {
    navigate(`/${username}`);
  };

  useEffect(() => {
    setIsSaved(isSavedPost(user.reqUser, post.id));
    setIsPostLiked(isPostLikedByUser(post, user.reqUser?.id));
    setNumberOfLike(post?.likedByUsers?.length);
  }, [user.reqUser, post]);

  function handleClick() {
    setShowDropdown(!showDropdown);
  }

  function handleWindowClick(event) {
    if (!event.target.matches(".dots")) {
      setShowDropdown(false);
    }
  }

  useEffect(() => {
    window.addEventListener("click", handleWindowClick);

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  const handleDeletePost = (postId) => {
    const data = {
      jwt: token,
      postId,
    };
    dispatch(deletePostAction(data));
  };
  const isOwnPost = isReqUserPost(post, user.reqUser);

  const handleOpenCommentModal = () => {
    navigate(`/p/${post.id}`);
    onOpen();
  };
  return (
    <div className="flex flex-col w-full border rounded-md">
      <div className="flex justify-between items-center w-full py-4 px-5">
        <div className="flex items-center">
          <img
            className="h-12 w-12 rounded-full"
            src={userProfileImage}
            alt=""
          />
          <div className="pl-2">
            <p className="font-semibold text-sm flex items-center">
              <span
                onClick={() => handleNavigate(username)}
                className="cursor-pointer"
              >
                {username}
              </span>
              <span className="opacity-50 flex items-center">
                <BsDot />
                {createdAt}
              </span>{" "}
            </p>
            <p className="font-thin text-sm">{location}</p>
          </div>
        </div>
        <div className="dropdown">
          <BsThreeDots className="dots" onClick={handleClick} />
          {isOwnPost && (
            <div className="dropdown-content">
              {showDropdown && (
                <p
                  onClick={() => handleDeletePost(post.id)}
                  className="bg-black text-white py-1 px-4 rounded-md cursor-pointer"
                >
                  Delete
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="w-full">
        <img className="w-full" src={postImage} alt="" />
      </div>
      <div className="w-full px-5 pt-3">
        <p className="text-sm">{post.caption}</p>
      </div>

      <div className="flex justify-between items-center w-full px-5 py-4">
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

          <FaRegComment
            onClick={handleOpenCommentModal}
            className="text-xl hover:opacity-50 cursor-pointer"
          />
          <RiSendPlaneLine className="text-xl hover:opacity-50 cursor-pointer" />
        </div>
        <div className="cursor-pointer">
          {isSaved ? (
            <BsBookmarkFill
              onClick={() => handleUnSavePost(post.id)}
              className="text-xl hover:opacity-50 cursor-pointer"
            />
          ) : (
            <BsBookmark
              onClick={() => handleSavePost(post.id)}
              className="text-xl hover:opacity-50 cursor-pointer"
            />
          )}
        </div>
      </div>
      <div className="w-full py-2 px-5">
        {numberOfLikes > 0 && <p className="text-sm">{numberOfLikes} likes </p>}
        {post?.comments?.length > 0 && (
          <p
            onClick={handleOpenCommentModal}
            className="opacity-50 text-sm py-2 -z-0 cursor-pointer"
          >
            View all {post?.comments?.length} comments
          </p>
        )}
      </div>
      <div className="border border-t w-full">
        <div className="flex w-full items-center px-5">
          <BsEmojiSmile />
          <input
            onKeyPress={handleOnEnterPress}
            onChange={handleCommnetInputChange}
            className="commentInput"
            type="text"
            placeholder="Add a comment..."
          />
        </div>
      </div>
      <CommentModel
        handleLikePost={handleLikePost}
        handleSavePost={handleSavePost}
        handleUnSavePost={handleUnSavePost}
        handleUnLikePost={handleUnLikePost}
        isPostLiked={isPostLiked}
        isSaved={isSaved}
        postData={post}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
    </div>
  );
};

export default PostCard;
