import axios from "axios";
const initialState = {
  status: "idle",
  entities: {},
};
export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "users/usersLoading": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "users/usersLoaded": {
      const newEntities = {};
      action.payload.forEach((user) => {
        newEntities[user.id] = user;
      });
      return {
        ...state,
        status: "idle",
        entities: newEntities,
      };
    }
    default:
      return state;
  }
};
export const usersLoading = () => ({ type: "users/usersLoading" });

export const usersLoaded = (users) => ({
  type: "users/usersLoaded",
  payload: users,
});

export const fetchUsers = () => async (dispatch) => {
  dispatch(usersLoading());
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  dispatch(usersLoaded(response.data));
};
export const selectUserEntities = (state) => state.users.entities;
export const selectFilteredUsersId = (state, inputText) => {
  const sanitizedString = inputText.toLowerCase().trim();
  if (sanitizedString === "") return [];
  const userEntities = selectUserEntities(state);
  const users = Object.keys(userEntities);
  return users.filter(
    (user) =>
      userEntities[user].name
        .toLowerCase()
        .trim()
        .startsWith(sanitizedString) === true
  );
};
