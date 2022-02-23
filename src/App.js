import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { selectUserEntities, selectFilteredUsersId } from "./usersSlice";

const App = ({ state }) => {
  useEffect(() => {
    const closeDropdown = (event) => {
      if (event.path[1].tagName !== "DIV") reset();
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);
  const [inputValue, setInputValue] = useState("");
  const [filteredUsersId, setFilteredUsersId] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const userEntities = selectUserEntities(state);
  const activeUserId = filteredUsersId[activeIndex];
  const changeHandler = (event) => {
    setInputValue(event.target.value);
    setFilteredUsersId(selectFilteredUsersId(state, event.target.value));
    setActiveIndex(-1);
  };
  const reset = () => {
    setFilteredUsersId([]);
    setActiveIndex(-1);
  };
  const clickHandler = (name) => {
    setInputValue(name);
    reset();
  };
  const keydownHandler = (event) => {
    if (event.keyCode === 40 && activeIndex !== filteredUsersId.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
    if (event.keyCode === 38 && activeIndex !== 0) {
      setActiveIndex((prev) => prev - 1);
    }
    if (event.keyCode === 13) {
      setInputValue(userEntities[activeUserId].name);
      reset();
    }
  };
  return (
    <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
      <div onKeyDown={keydownHandler} className="autocomplete">
        <input
          id="myInput"
          type="text"
          name="name"
          placeholder="Name"
          onChange={changeHandler}
          value={inputValue}
        />
        <div className="autocomplete-items">
          {filteredUsersId.map((userId) => (
            <div
              onClick={() => clickHandler(userEntities[userId].name)}
              key={userId}
              className={activeUserId === userId ? "autocomplete-active" : ""}
            >
              {userEntities[userId].name}
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};
export default connect((state) => ({ state }))(App);
