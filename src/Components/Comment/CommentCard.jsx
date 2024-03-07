import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { isCommentLikedByUser, timeDifference } from "../../Config/Logic";
import { likeComment } from "../../Redux/Comment/Action";

const CommentCard = ({ comment }) => {
  const [isCommentLiked, setIsCommentLiked] = useState(false);
  const { user } = useSelector((store) => store);
  const [commentLikes, setCommentLikes] = useState(0);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("token");

  const handleCommentLiked = () => {
    dispatch(likeComment({ jwt, commentId: comment.id }));
    setIsCommentLiked(true);
    setCommentLikes(commentLikes + 1);
  };
  const handleCommentUnLiked = () => {
    dispatch(likeComment({ jwt, commentId: comment.id }));
    setIsCommentLiked(false);
    setCommentLikes(commentLikes - 1);
  };
  useEffect(() => {
    setCommentLikes(comment?.likedByUsers?.length);
  }, [comment]);

  useEffect(() => {
    setIsCommentLiked(isCommentLikedByUser(comment, user.reqUser?.id));
  }, [comment, user.reqUser]);

  return (
    <div>
      <div className="reqUser flex item-center justify-between py-5">
        <div className="flex items-center">
          <div>
            <img
              className="w-9 h-9 rounded-full"
              src="https://cdn.pixabay.com/photo/2023/10/30/02/34/woman-8351528_640.jpg"
              alt=""
            />
          </div>
          <div className="ml-3">
            <p>
              <span className="font-semibold">username</span>
              <span className="ml-2">{comment.content}</span>
            </p>
            <div className="flex items-center space-x-3 text-xs opacity-60 pt-2">
              <span>{timeDifference(comment?.createdAt)}</span>
              {commentLikes > 0 && <span>{commentLikes} like</span>}
            </div>
          </div>
        </div>

        {isCommentLiked ? (
          <AiFillHeart
            onClick={handleCommentUnLiked}
            className="text-xs hover:opacity-50 cursor-pointer text-red-600"
          />
        ) : (
          <AiOutlineHeart
            onClick={handleCommentLiked}
            className="text-xs hover:opacity-50 cursor-pointer "
          />
        )}
      </div>
    </div>
  );
};

export default CommentCard;
