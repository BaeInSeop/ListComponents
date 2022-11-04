import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import axios from "axios";
import Avatar from "react-avatar";

import RenderIcon from "./RenderIcon";
import ReactLoading from "react-loading";

const Row = ({
  rows,
  row,
  index,
  moveRow,
  prepareRow,
  checkList,
  setCheckList,
  setModalData,
  // setCurrentFolder,
  // resizeWidth,
  // onUpdateItem,
  // onDeleteItem,
  onClickItem,
  onContextMenu,
  linkProps,
  avatarProps,
  iconProps,
  timeFormat,
  onBackward,
}) => {
  const dropRef = useRef(null);
  const dragRef = useRef(null);
  const inputRef = useRef(null);

  const [isMouseOverDiv, setIsMouseOverDiv] = useState(false);
  const [isMouseOverSpan, setIsMouseOverSpan] = useState(false);
  const [isMouseOverBackward, setIsMouseOverBackward] = useState(false);

  const [enterFolderIndex, setEnterFolderIndex] = useState(null);

  const [, drop] = useDrop({
    accept: "row",
    drop: (item) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      // console.log(item, row);
      moveRow(dragIndex, hoverIndex, item, row);
      setEnterFolderIndex(null);
    },
    hover(item, monitor) {
      if (!dropRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        setEnterFolderIndex(null);
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
        setEnterFolderIndex(null);
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        setEnterFolderIndex(null);
        return;
      }
      // Time to actually perform the action

      if ("folder" === rows[hoverIndex].original.extension) {
        setEnterFolderIndex(rows[hoverIndex].original.id);
      } else {
        setEnterFolderIndex(null);
      }

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      // item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: "row",
    item: { index, row, type: "row" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const clickItem = (row) => {
    onClickItem(row);
  };

  // const onUpdateClick = (row) => {
  //   onUpdateItem(row);
  // };

  // const onDeleteClick = (row) => {
  //   onDeleteItem(row);
  // };

  const opacity = isDragging ? 0 : 1;

  // preview(drop(dropRef));
  drag(drop(dragRef));

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  useEffect(() => {
    var checkBox = document.getElementById(row.id);

    if (checkBox) {
      checkBox.addEventListener("mousedown", (e) => {
        e.stopImmediatePropagation();
      });
    }
  }, [checkList]);

  const convertValueToType = (cell) => {
    switch (cell.column.type) {
      case "text":
        return cell.render("Cell");

      case "time":
        return convertTimeFormat(cell.value);

      case "icon":
        return (
          <RenderIcon type={cell.value} cursor={false} iconProps={iconProps} />
        );

      case "avatar":
        return (
          <Avatar
            name={cell.value}
            size={avatarProps.size ? avatarProps.size : "25"}
            round={avatarProps.round ? avatarProps.round : "50%"}
          />
        );

      case "link":
        return (
          <a href={cell.value} target="_blank">
            <span
              style={{
                display: "inline-block",
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {"" !== linkProps.text ? linkProps.text : cell.value}
            </span>
          </a>
        );

      case "checkbox":
        if (!cell.value) {
          return;
        }
        return drawCheckBox();

      case "image":
        if (!cell.value) {
          return;
        }
        return (
          <a href={cell.value} target="_blank">
            <img src={cell.value} width="30px" height="30px" />{" "}
          </a>
        );

      default:
        return cell.render("Cell");
    }
  };

  const convertTimeFormat = (date) => {
    var returnDate = "";

    if (!date) {
      return returnDate;
    }
    if ("undefined" === date || "null" === date) {
      return returnDate;
    }

    if (moment(date).isValid === false) {
      return returnDate;
    }

    returnDate = moment(date).format(timeFormat);

    return returnDate;
  };

  const drawCheckBox = () => {
    return (
      <div style={{ display: "inline-block" }}>
        <input
          className="checkbox"
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
      </div>
    );
  };

  return (
    <>
      {false && 0 === index && (
        <div
          className="td"
          style={{
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
            background: isMouseOverBackward ? "#EFF1F7" : "none",
          }}
          onClick={() => onBackward()}
          onMouseEnter={() => setIsMouseOverBackward(true)}
          onMouseLeave={() => setIsMouseOverBackward(false)}
        >
          Move to parent folder
        </div>
      )}
      <div
        ref={dropRef}
        style={{
          fontWeight: isDragging ? "bold" : "",
          border:
            row.original.id === enterFolderIndex ? "1px solid red" : "none",
          userSelect: "none",
        }}
        className="tr"
      >
        <div
          ref={dragRef}
          style={{
            fontWeight: isMouseOverDiv ? "bold" : "",
            background: isMouseOverDiv ? "#EFF1F7" : "none",
            cursor: isMouseOverDiv ? "pointer" : "default",
          }}
          onMouseEnter={() => setIsMouseOverDiv(true)}
          onMouseLeave={() => setIsMouseOverDiv(false)}
          onMouseDown={(e) =>
            1 < checkList.length
              ? null
              : row.original.checkbox
              ? setCheckList([row.id])
              : null
          }
          onClick={(e) => {
            onClickItem(row);

            if (row.original.checkBox) {
              setCheckList([row.id]);
            }
          }}
          onContextMenu={(event) => onContextMenu(row, event)}
        >
          {row.cells.map((cell) => {
            prepareRow(row);

            return (
              <>
                <div
                  {...cell.getCellProps()}
                  style={{
                    ...cell.getCellProps().style,
                    verticalAlign: "bottom",
                  }}
                  className="td"
                >
                  {convertValueToType(cell)}
                </div>
              </>
            );
          })}

          {/* {row.cells.map((cell) => {
          prepareRow(row);
          return (
            <>
              <div
                {...cell.getCellProps()}
                style={{
                  ...cell.getCellProps().style,
                  verticalAlign: "bottom",
                }}
                className="td"
              >
                {"Extension" === cell.column.header ? (
                  <RenderIcon type={cell.value} cursor={false} size="20px" />
                ) : "Name" === cell.column.header ? (
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      opacity: 1 !== row.original.status ? 0.5 : 1,
                    }}
                    onMouseEnter={() => setIsMouseOverDiv(true)}
                    onMouseLeave={() => setIsMouseOverDiv(false)}
                  >
                    <span
                      style={{
                        fontWeight: isMouseOverSpan ? "bold" : "",
                        textDecoration: isMouseOverSpan ? "underline" : "none",
                      }}
                      onMouseOver={() => setIsMouseOverSpan(true)}
                      onMouseLeave={() => setIsMouseOverSpan(false)}
                      onClick={(e) => clickItem(row)}
                    >
                      {cell.render("Cell")}
                    </span>

                    {2 === row.original.status ? (
                      <span>
                        <ReactLoading
                          type="spin"
                          color={"red"}
                          width={15}
                          height={15}
                        />
                      </span>
                    ) : (
                      <span onClick={() => setModalData(row.original)}>
                        {isMouseOverDiv && (
                          <RenderIcon type={"dot"} cursor={true} size="15px" />
                        )}
                      </span>
                    )}
                  </div>
                ) : "Action" === cell.column.header ? (
                  <>
                    <button onClick={(e) => onUpdateClick(row)}>
                      <RenderIcon type={"update"} size="15px" cursor={true} />
                    </button>
                    <button onClick={(e) => onDeleteClick(row)}>
                      <RenderIcon
                        type={"delete"}
                        size="15px"
                        cursor={true}
                        onClick={(e) => onDeleteClick(row)}
                      />
                    </button>
                  </>
                ) : (
                  cell.render("Cell")
                )}
              </div>
              <span
                style={{
                  display: "inline-block",
                  width: resizeWidth,
                  height: "100%",
                  padding: "0.5rem",
                }}
              />
            </>
          );
        })} */}
        </div>
      </div>
    </>
  );
};

export default Row;
