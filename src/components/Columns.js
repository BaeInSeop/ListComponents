import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDrop, useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

const Columns = ({ state, column, index, moveColumn }) => {
  const ref = useRef();
  const { id, Header } = column;

  const [, drop] = useDrop({
    accept: "column",
    drop: (item) => {
      moveColumn(item, index);
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: "column",
    item: () => {
      return {
        id,
        index,
        header: Header,
        type: "column",
      };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const memoizedColumn = useMemo(() => column.render("Header"), [column]);
  const opacity = isDragging ? 0 : 1;

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return (
    <>
      <div
        ref={ref}
        {...column.getHeaderProps(column.getSortByToggleProps())}
        className="th"
      >
        {memoizedColumn}
        <span>
          {column.isSorted ? (column.isSortedDesc ? " ↓" : " ↑") : ""}
        </span>
      </div>
      {column.canResize && (
        <div
          {...column.getResizerProps()}
          className={`resizer ${column.isResizing ? "isResizing" : ""}`}
        />
      )}
    </>
  );
};

export default Columns;
