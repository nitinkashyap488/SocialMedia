import React, { useEffect, useState } from "react";
import { BsBookmark } from "react-icons/bs";
import { GrTable } from "react-icons/gr";
import { RiVideoFill, RiVideoLine } from "react-icons/ri";
import { BiBookmark, BiUserPin } from "react-icons/bi";
import { AiOutlineTable, AiOutlineUser } from "react-icons/ai";
import { RiVideoAddLine } from "react-icons/ri";
import RequestUserPostCard from "./RequestUserPostCard";
import { useDispatch, useSelector } from "react-redux";
import { reqUserPostAction, savePostAction } from "../../Redux/Post/Action";

const RequestUserPostPart = ({ user }) => {
  const [activeTab, setActiveTab] = useState("Post");
  const { post } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const tabs = [
    {
      tab: "Post",
      icon: <AiOutlineTable className="text-xs"></AiOutlineTable>,
      activeTab: "",
    },
    {
      tab: "Reels",
      icon: <RiVideoAddLine className="text-xs"></RiVideoAddLine>,
      activeTab: "",
    },
    {
      tab: "Save",
      icon: <BiBookmark className="text-xs"></BiBookmark>,
      activeTab: "",
    },
    {
      tab: "Tagged",
      icon: <AiOutlineUser className="text-xs"></AiOutlineUser>,
      activeTab: "",
    },
  ];

  useEffect(() => {
    const data = {
      jwt: token,
      userId: user?.id,
    };
    dispatch(reqUserPostAction(data));
  }, [user, post.createdPost]);

  return (
    <div>
      <div className="flex space-x-14 border-t relative">
        {tabs.map((item) => (
          <div
            onClick={() => setActiveTab(item.tab)}
            className={`${
              activeTab === item.tab ? "border-t border-black" : "opacity-60"
            } flex items-center cursor-pointer py-2 text-sm`}
          >
            <p className="ml-1">{item.icon}</p>
            <p className="ml-1 text-xs">{item.tab}</p>
          </div>
        ))}
      </div>
      <div>
        <div className="flex flex-wrap">
          {post.reqUserPost?.length > 0 && activeTab === "Post"
            ? post.reqUserPost?.map((item, index) => (
                <RequestUserPostCard post={item} key={index} />
              ))
            : activeTab === "Saved"
            ? user?.savedPost?.map((item, index) => (
                <RequestUserPostCard post={item} key={index} />
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default RequestUserPostPart;
