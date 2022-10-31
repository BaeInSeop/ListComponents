import React, { useEffect, useState, useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import DropPathName from "./DropPathName";

const Path = ({
  currentFolder,
  setCurrentFolder,
  checkList,
  onMoveItemToFolder,
}) => {
  const [separatePath, setSeparatePath] = useState([]);

  useEffect(() => {
    setSeparatePath(currentFolder.split("/"));
  }, [currentFolder]);

  const onMovePath = (pathname, index) => {
    let goPath = "";

    for (let i = 0; i <= index; i++) {
      goPath += `${separatePath[i]}${i !== index ? "/" : ""}`;
    }

    setCurrentFolder(goPath);
  };

  const drawPath = () =>
    separatePath.map((path, idx) => {
      return (
        <DropPathName
          checkList={checkList}
          separatePath={separatePath}
          path={path}
          onMovePath={onMovePath}
          index={idx}
          onMoveItemToFolder={onMoveItemToFolder}
        />
      );
    });

  return <div>{0 < separatePath.length && drawPath()}</div>;
};

export default Path;
