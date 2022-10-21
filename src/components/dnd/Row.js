import React, { useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { ReactComponent as Icon_Note } from "./Images/icon_note.svg";
import { ReactComponent as Icon_Audio } from "./Images/icon_audio.svg";
import { ReactComponent as Icon_Pdf } from "./Images/icon_pdf.svg";
import { ReactComponent as Icon_File } from "./Images/icon_file.svg";
import { ReactComponent as Icon_Folder } from "./Images/icon_folder.svg";
import { ReactComponent as Icon_Dot } from "./Images/icon_dot.svg";

const Row = ({
  row,
  index,
  moveRow,
  prepareRow,
  checkList,
  setCheckList,
  setModalData,
}) => {
  const dropRef = useRef(null);
  const dragRef = useRef(null);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const [, drop] = useDrop({
    accept: "row",
    hover(item, monitor) {
      if (!dropRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = dropRef.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveRow(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: "row",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const onClickItem = (row) => {
    console.log("Clicked Item : ", row);
    setCheckList([row.id]);
  };

  const renderImage = (type) => {
    const size = "20px";

    switch (type) {
      case "file":
        return <Icon_File width={size} height={size} />;

      case "audio":
        return <Icon_Audio width={size} height={size} />;

      case "pdf":
        return <Icon_Pdf width={size} height={size} />;

      case "note":
        return <Icon_Note width={size} height={size} />;

      case "folder":
        return <Icon_Folder width={size} height={size} />;

      default:
        return type;
    }
  };

  const opacity = isDragging ? 0 : 1;

  preview(drop(dropRef));
  drag(dragRef);

  return (
    <div ref={dropRef} style={{ opacity }} className="tr">
      <div ref={dragRef} onClick={(e) => onClickItem(row)}>
        <input
          style={{ width: "50px" }}
          type="checkbox"
          id={row.id}
          onChange={(e) => {
            if (e.target.checked) {
              setCheckList([...checkList, row.id]);
            } else {
              setCheckList(checkList.filter((list) => list !== row.id));
            }
          }}
          checked={checkList.includes(row.id) ? true : false}
        />
        {row.cells.map((cell) => {
          prepareRow(row);
          return (
            <div {...cell.getCellProps()} className="td">
              {"Type" === cell.column.Header ? (
                renderImage(cell.value)
              ) : "Title" === cell.column.Header ? (
                <div
                  onMouseEnter={() => setIsMouseOver(true)}
                  onMouseLeave={() => setIsMouseOver(false)}
                >
                  {cell.render("Cell")}
                  <span onClick={() => setModalData(row.original)}>
                    {isMouseOver && <Icon_Dot width="10px" />}
                  </span>
                </div>
              ) : (
                cell.render("Cell")
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Row;
