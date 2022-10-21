import React from "react";

const Search = ({ onSubmit }) => {
  const onClickSearch = (e) => {
    e.preventDefault();
    onSubmit(e.target.elements.filter.value);
  };

  return (
    <form onSubmit={(e) => onClickSearch(e)}>
      <input name="filter" />
      <button>찾기</button>
    </form>
  );
};

export default Search;
