import React, { useEffect, useState, useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import DropPathName from "./DropPathName";

const Path = ({ currentFolder, setCurrentFolder, checkList }) => {
  const [separatePath, setSeparatePath] = useState([]);
  // const ref = useRef([]);

  // useEffect(() => {
  //   if (0 < separatePath.length) {
  //     separatePath.map((item, idx) => {
  //       console.log("Drop 부여");
  //       drop(ref.current[idx]);
  //     });
  //   }
  // }, [separatePath]);

  const [collectedProps, drop] = useDrop(() => ({
    accept: "row",
    drop: (item, monitor) => {
      console.log("Drop : ", item, monitor);
    },
  }));

  const onMovePath = (pathname, index) => {
    let goPath = "";

    for (let i = 0; i <= index; i++) {
      goPath += `${separatePath[i]}${i !== index ? "/" : ""}`;
    }

    console.log("폴더 변경 처리 필요");
    // setCurrentFolder()
  };

  const drawPath = () =>
    separatePath.map((path, idx) => {
      return (
        <DropPathName
          checkList={checkList}
          currentFolder={currentFolder}
          separatePath={separatePath}
          path={path}
          onMovePath={onMovePath}
          index={idx}
        />
      );
      // return (
      //   <>
      //     <span
      //       ref={(el) => (ref.current[idx] = el)}
      //       key={idx}
      //       onClick={() => onMovePath(path, idx)}
      //     >
      //       {path}{" "}
      //     </span>
      //     <span>{idx !== separatePath.length - 1 && "/"} </span>
      //   </>
      // );
    });

  useEffect(() => {
    setSeparatePath(currentFolder.split("/"));
  }, [currentFolder]);

  return <div>{0 < separatePath.length && drawPath()}</div>;
};

export default Path;
