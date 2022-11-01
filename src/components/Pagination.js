import React from "react";
import styled from "styled-components";
import leftIcon from "../assets/images/ico_arrow_left.png";
import rightIcon from "../assets/images/ico_arrow_right.png";

const PrevButtonIcon = styled.div`
  display: inline-block;
  width: 11px;
  height: 19px;
  background: url(${leftIcon}) no-repeat center;
`;

const NextButtonIcon = styled.div`
  display: inline-block;
  width: 11px;
  height: 19px;
  background: url(${rightIcon}) no-repeat center;
`;

const Pagination = ({ totalCount, limit, page, setPage }) => {
  const numPages = Math.ceil(totalCount / limit);

  return (
    <>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          <PrevButtonIcon></PrevButtonIcon>
        </Button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          <NextButtonIcon></NextButtonIcon>
        </Button>
      </Nav>
    </>
  );
};

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 16px;
  margin-top: 20px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: none;
  color: black;
  font-size: 1rem;

  &:hover {
    /* background: gainsboro; */
    cursor: pointer;
    /* transform: translateY(-2px); */
  }

  &[disabled] {
    background: none;
    cursor: revert;
    transform: revert;
    /* visibility: hidden; */
  }

  &[aria-current] {
    background: none;
    color: #f84450;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

export default Pagination;
