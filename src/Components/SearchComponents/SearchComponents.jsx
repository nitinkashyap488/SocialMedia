import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "../../Config/Debounce";
import { searchUserAction } from "../../Redux/User/Action";
import "./SearchComponents.css";
import SearchUsersCard from "./SearchUsersCard";

const SearchComponents = ({ setIsSearchVisible }) => {
  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store);
  const dispatch = useDispatch();
  const handleSearchUser = (query) => {
    const data = {
      jwt: token,
      query,
    };
    dispatch(searchUserAction(data));
  };
  const debouncedHandleSearchUser = debounce(handleSearchUser, 1000);
  return (
    <div className="search-container">
      <div className="px-3 pb-5">
        <h1 className="text-xl pb-5">Search</h1>
        <input
          onChange={(e) => debouncedHandleSearchUser(e.target.value)}
          className="search-input"
          type="text"
          placeholder="Search..."
        />
      </div>
      <hr />
      <div className="px-3 pt-5">
        {user.searchResult.map((item) => (
          <SearchUsersCard
            setIsSearchVisible={setIsSearchVisible}
            key={item.id}
            username={item.username}
            image={item?.image}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchComponents;
