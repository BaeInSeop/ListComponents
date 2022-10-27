import React, { useEffect, useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";

const DropPathName = ({
  currentPath,
  path,
  onMovePath,
  separatePath,
  index,
}) => {
  const ref = useRef();

  const [collectedProps, drop] = useDrop(() => ({
    accept: "row",
    drop: (item, monitor) => {
      console.log(
        "DB Update Move Item to Folder",
        item.row.original.title,
        "Into ",
        ref.current.id
      );
    },
  }));

  drop(ref);

  return (
    <>
      <span
        ref={ref}
        key={index}
        id={path}
        onClick={() => onMovePath(path, index)}
      >
        {path}{" "}
      </span>
      <span>{index !== separatePath.length - 1 && "/"} </span>
    </>
  );
};

export default DropPathName;
