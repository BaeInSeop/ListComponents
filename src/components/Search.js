import React from "react";
import styled from "styled-components";
import searchIcon from "../assets/images/ico_search.png";
const FormBox = styled.form`
  display: flex;
  justify-content: flex-end;
  input {
    border: 2px solid #e4e4e9;
    border-radius: 5px;
    height: 32px;
    padding: 0;
    padding-left: 35px;
    max-width: 370px;
    width: 100%;
    box-sizing: border-box;
    background: url(${searchIcon}) no-repeat 10px center;
  }

  button {
    margin-left: 10px;
    width: 60px;
    height: 32px;
    background: #0073ea;
    border-radius: 5px;
    border: 0;
    font-weight: 500;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
`;

const Search = ({ onSubmit }) => {
  const onClickSearch = (e) => {
    e.preventDefault();
    onSubmit(e.target.elements.filter.value);
  };

  return (
    <FormBox onSubmit={(e) => onClickSearch(e)}>
      <input name="filter" />
      <button>검색</button>
    </FormBox>
  );
};

export default Search;
