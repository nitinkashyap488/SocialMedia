import { FETCH_FOLLOWING_USER_STORY, FETCH_USER_STORY } from "./ActionType";
import { API_BASE_URL } from "../../Config/BaseUrl";

export const findFollowingUserStory = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/stories/f/${data.userIds}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
    });
    const stories = await res.json();
    dispatch({ type: FETCH_FOLLOWING_USER_STORY, payload: stories });
  } catch (error) {
    console.log("catch error : ", error);
  }
};

export const findStoryByUserId = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/stories/${data.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
    });
    const stories = await res.json();
    console.log("stories :- ", stories);
    dispatch({ type: FETCH_USER_STORY, payload: stories });
  } catch (error) {
    console.log("catch error : ", error);
  }
};
