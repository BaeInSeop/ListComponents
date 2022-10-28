import React from "react";
import styled from "styled-components";
import Popup from "reactjs-popup";
import RenderIcon from "./RenderIcon";
import { insertFolder } from "../../libs/DbApi";

const AddUtility = ({ refreshView, CONTENTS_TYPE, currentFolder }) => {
  const StyledButton = styled.button`
    width: 88px;
    height: 26px;
    background-color: #0073ea;
    border-radius: 3px;
    font-size: 12px;
    font-weight: 400;
    color: white;
    cursor: pointer;
  `;

  const StyledUl = styled.ul`
    list-style: none;
    padding: 10px;
    margin: 0;
    width: 172px;
    background-color: #ffffff;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
  `;

  const StyledLi = styled.li`
    width: 100%;
    height: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
  `;

  const StyledDiv = styled.div`
    width: 100%;
    display: flex;
    &.image {
      width: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &.text {
      width: calc(100% - 40px);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `;

  const onInsertFolder = () => {
    var folderName = prompt("폴더명", "");
    var folder = {
      name: folderName,
      parentKey: currentFolder.pk,
      type: CONTENTS_TYPE,
    };

    insertFolder(folder).then((res) => {
      if (res.code === 0) {
        refreshView();
      } else if (res.code === 100) {
        alert("이름 중복됨");
      } else {
        alert(res.desc);
      }
    });
  };

  return (
    <Popup
      trigger={<StyledButton>신규 생성</StyledButton>}
      position="bottom left"
    >
      {(close) => (
        <StyledUl>
          <StyledLi
            onClick={(e) => {
              onInsertFolder();
              close();
            }}
          >
            <StyledDiv>
              <StyledDiv className="image">
                <RenderIcon type={"folder"} cursor={true} size={"20px"} />
              </StyledDiv>
              <StyledDiv className="text">새로운 폴더</StyledDiv>
            </StyledDiv>
          </StyledLi>
        </StyledUl>
      )}
    </Popup>
  );
};

export default AddUtility;
