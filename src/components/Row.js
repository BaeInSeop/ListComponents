import React, { useCallback, useEffect, useRef, useState } from "react";
import moment from "moment";

import { DndProvider, useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import axios from "axios";
import Avatar from "react-avatar";

import RenderIcon from "./RenderIcon";
import ReactLoading from "react-loading";

import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import styled from "styled-components";

const Row = ({
  rows,
  row,
  data,
  setData,
  index,
  moveRow,
  rowHeight,
  style,
  prepareRow,
  setModalData,
  // setCurrentFolder,
  // resizeWidth,
  // onUpdateItem,
  // onDeleteItem,
  onClickRecord,
  onContextMenu,
  linkProps,
  avatarProps,
  iconProps,
  timeProps,
  calcColumnsWidth,
  useMoveRecord,
}) => {
  const dropRef = useRef(null);
  const dragRef = useRef(null);
  const inputRef = useRef(null);

  const [isMouseOverDiv, setIsMouseOverDiv] = useState(false);
  const [isMouseOverSpan, setIsMouseOverSpan] = useState(false);

  const [enterFolderIndex, setEnterFolderIndex] = useState(null);

  const [, drop] = useDrop({
    accept: "row",
    drop: (item) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      // console.log(item, row);
      moveRow(
        dragIndex,
        hoverIndex,
        0 < data.filter((record) => record.checked).length
          ? data.filter((record) => record.checked)
          : [item],
        row
      );
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
        // setEnterFolderIndex(null);
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        // setEnterFolderIndex(null);
        return;
      }
      // Time to actually perform the action

      if ("folder" === rows[hoverIndex].original.extension) {
        // setEnterFolderIndex(rows[hoverIndex].original.id);
      } else {
        // setEnterFolderIndex(null);
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
    onClickRecord(row);
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
    if (timeProps.lang) {
      moment().locale(timeProps.lang.toLowerCase());
    }
  }, []);

  useEffect(() => {
    if (1 < data.filter((item) => item.checked).length) {
      preview(getEmptyImage(), { captureDraggingState: true });
    }
  }, [preview]);

  // useEffect(() => {
  //   var checkBox = document.getElementById(row.id);

  //   if (checkBox) {
  //     checkBox.addEventListener("click", (e) => {
  //       e.stopImmediatePropagation();
  //     });
  //   }
  // }, [checkList]);

  const convertValueToType = (cell) => {
    switch (cell.column.type) {
      case "time":
        return (
          <DrawFlexContainer>{convertTimeFormat(cell.value)}</DrawFlexContainer>
        );

      case "icon":
        return (
          <DrawFlexContainer>
            <RenderIcon
              type={cell.value}
              cursor={false}
              iconProps={iconProps}
            />
          </DrawFlexContainer>
        );

      case "avatar":
        return (
          <DrawFlexContainer>
            <Avatar
              name={cell.value}
              size={avatarProps.size ? avatarProps.size : "25"}
              round={avatarProps.round ? avatarProps.round : "50%"}
            />
          </DrawFlexContainer>
        );

      case "link":
        return (
          <DrawFlexContainer>
            <div
              style={{
                width: "100%",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              <a href={cell.value} target="_blank">
                {"" !== linkProps.text ? linkProps.text : cell.value}
              </a>
            </div>
          </DrawFlexContainer>
        );

      case "checkbox":
        return <DrawFlexContainer>{drawCheckBox()}</DrawFlexContainer>;

      case "image":
        if (!cell.value) {
          return;
        }
        return (
          <DrawFlexContainer>
            <div style={{ fontSize: 0 }}>
              <a href={cell.value} target="_blank">
                <img src={cell.value} width="30px" height="30px" />{" "}
              </a>
            </div>
          </DrawFlexContainer>
        );

      case "text":
      default:
        return (
          <DrawFlexContainer>
            {typeof cell.value === "object" ? (
              <>
                <div
                  style={{
                    width: "100%",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                  title={cell.value.title}
                >
                  {cell.value.title}
                </div>
                <div
                  style={{
                    width: "100%",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    fontSize: "smaller",
                    color: "#8B8E95",
                  }}
                >
                  {cell.value.desc}
                </div>
              </>
            ) : (
              cell.render("Cell")
            )}
          </DrawFlexContainer>
        );
    }
  };

  const DrawFlexContainer = ({ children }) => {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 0,
        }}
      >
        {children}
      </div>
    );
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

    if ("" !== timeProps.format) {
      returnDate = moment(date)
        .locale(timeProps.lang ? timeProps.lang : "ko")
        .format(timeProps.format);
    } else {
      returnDate = moment(date)
        .locale(timeProps.lang ? timeProps.lang : "ko")
        .fromNow();
    }

    return returnDate;
  };

  const drawCheckBox = () => {
    return (
      <StyledLabel htmlFor={row.id}>
        <StyledCheckBox
          className={
            row.original.checked ? "checked" : !isMouseOverDiv && "hidden"
          }
          type="checkbox"
          id={row.id}
          checked={row.original.checked ? true : false}
          onChange={(e) => {
            if (setData) {
              if (e.target.checked) {
                let tempData = data.map((item) =>
                  Number(item.id) === Number(row.original.id)
                    ? { ...item, checked: true }
                    : item
                );
                setData(tempData);
              } else {
                let tempData = data.map((item) =>
                  Number(item.id) === Number(row.original.id)
                    ? { ...item, checked: false }
                    : item
                );

                setData(tempData);
              }
            }
          }}
        />
      </StyledLabel>
    );
  };

  return (
    <>
      <div
        ref={dropRef}
        style={{
          width: "100%",
          minWidth: calcColumnsWidth(),
          fontWeight: isDragging ? "bold" : "",
          // border:
          //   row.original.id === enterFolderIndex ? "1px solid red" : "none",
          // userSelect: "none",
        }}
        className="tr"
      >
        <div
          ref={useMoveRecord ? dragRef : null}
          style={{
            fontWeight: isMouseOverDiv ? "bold" : "",
            background: isMouseOverDiv ? "#F8F8F8" : "none",
            cursor: isMouseOverDiv ? "pointer" : "default",
            transition: "all 0.3s ease-out",
          }}
          onMouseEnter={() => setIsMouseOverDiv(true)}
          onMouseLeave={() => setIsMouseOverDiv(false)}
          // onMouseDown={(e) =>
          //   1 < checkList.length
          //     ? null
          //     : row.original.checkbox
          //     ? setCheckList([row.id])
          //     : null
          // }
          onClick={(e) => {
            // onClickRecord(row.original);
            // if (row.original.checkBox) {
            //   setCheckList([row.id]);
            // }
          }}
          onContextMenu={(event) => onContextMenu(row, event)}
          // draggable={false}
        >
          {row.cells.map((cell) => {
            prepareRow(row);

            return (
              <>
                <div
                  {...cell.getCellProps()}
                  style={{
                    ...cell.getCellProps().style,
                    verticalAlign: "middle",
                    minHeight: rowHeight,
                    boxSizing: "border-box",
                    height: `${rowHeight ? rowHeight : 50}px`,
                    // lineHeight: `${rowHeight ? rowHeight : 50}px`,
                    opacity: `${
                      "checkbox" !== cell.column.type
                        ? row.original.readOnly
                          ? 0.5
                          : 1
                        : 1
                    }`,
                  }}
                  className={
                    cell.column.className ? `td ${cell.column.className}` : `td`
                  }
                  onClick={() =>
                    "checkbox" !== cell.column.type
                      ? clickItem(row.original)
                      : null
                  }
                >
                  {convertValueToType(cell)}
                </div>
              </>
            );
          })}
        </div>
      </div>

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
    </>
  );
};

export default Row;

const StyledLabel = styled.label`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

const StyledCheckBox = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid rgba(228, 228, 233, 1);
  border-radius: 50%;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: limegreen;
  }

  &.hidden {
    visibility: hidden;
  }
`;
