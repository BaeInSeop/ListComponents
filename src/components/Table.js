import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  useBlockLayout,
  useColumnOrder,
  useResizeColumns,
  useTable,
  useSortBy,
  useGlobalFilter,
} from "react-table";

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import moment from "moment";

import AutoSizer from "react-virtualized-auto-sizer";
import { FileDrop } from "react-file-drop";
import { FixedSizeList } from "react-window";

import styled from "styled-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Row from "./Row";
import Preview from "./Preview";
import Columns from "./Columns";
import Search from "./Search";

import "./css/ContextMenu.css";
import RenderModal from "./RenderModal";
import DetailItem from "./DetailItem";
import FolderPath from "./FolderPath";
import Pagination from "./Pagination";
import RenderIcon from "./RenderIcon";
import AddUtility from "./AddUtility";

// 스타일 설정
const Styles = styled.div`
  padding: 1rem;
  font-family: Open Sans, sans-serif;
  font-size: 13px;

  .table {
    border-spacing: 0;
    width: 100%;

    .resizer {
      display: inline-block;
      background: black;
      width: ${(props) => props.resizeWidth};
      position: relative;
      transform: translateX(50%);
      z-index: 1;
      ${"" /* prevents from scrolling while dragging on touch devices */}
      touch-action:none;

      &.isResizing {
        background: red;
      }
    }

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .th {
      width: 50px;
      background-color: #ddd;
      font-weight: bold;
    }

    .th,
    .td,
    .checkbox {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid #ccc;
      border-right: 0;

      :last-child {
        border-right: 0;
      }

      .resizer {
        display: inline-block;
        background: black;
        width: 3px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;
        ${"" /* prevents from scrolling while dragging on touch devices */}
        touch-action:none;

        &.isResizing {
          background: red;
        }
      }
    }
  }
`;

const Table = ({
  columns,
  // setColumns,
  data,
  // setData,
  linkProps,
  avatarProps,
  iconProps,
  timeFormat,
  onMoveRow,
  onClickItem,
  onFileDrop,
  onSelectedRows,
  onContextMenu,
  onBackward,
}) => {
  // const [currentFolder, setCurrentFolder] = useState("home"); //현재 폴더

  // const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  // const [maximumRow, setMaximumRow] = useState(maximumRowCount); // 아이템 최대 갯수
  // const [totalRowCount, setTotalRowCount] = useState(totalCount); // 불러온 아이템 최대 개수
  const [checkList, setCheckList] = useState([]); // 체크된 아이템
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false); // 상세보기 Open State
  const [modalData, setModalData] = useState(); // 상세보기 데이터 State
  // const [showContextMenu, setShowContextMenu] = useState(false); // 컨텍스트 메뉴 Open Sate

  // 현재 경로가 변경될 시 목록 최신화
  // useEffect(() => {
  //   onChangePath(currentFolder);
  // }, [currentFolder]);

  // Column - Show 항목이 false 인 경우 보여주지 않는 컬럼 설정
  // useEffect(() => {
  //   const noShowingColumns = columns.filter((e) => !e.show);
  //   setHiddenColumns(noShowingColumns.map((column) => column.accessor));
  // }, [columns]);

  // Column 기본 사이즈 설정 (사용 안함)
  const defaultSize = useMemo(() => ({
    minWidth: 80,
    width: 150,
    maxWidth: 400,
  }));

  // 아이템 - 상세보기 처리
  useEffect(() => {
    if (!isOpenDetailModal) {
      setModalData();
    }
  }, [isOpenDetailModal]);

  useEffect(() => {
    if (modalData) {
      setIsOpenDetailModal(true);
    }
  }, [modalData]);

  useEffect(() => {
    onSelectedRows(checkList);
  }, [checkList]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setColumnOrder,
    setGlobalFilter,
    setHiddenColumns,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      data,
      columns,
      // getRowId,
      // initialState: {
      //   columnOrder: initialColumnOrder,
      // },
      defaultSize: {
        maxHeight: 100,
      },
      defaultCanSort: true,
    },
    useColumnOrder,
    useBlockLayout,
    useResizeColumns,
    useGlobalFilter,
    useSortBy
  );

  // Column - 사이즈 변경 시 DB 업데이트
  // useEffect(() => {
  //   if (0 < Object.keys(state.columnResizing.columnWidths).length) {
  //     onChangeColumnWidth(state.columnResizing.columnWidths);
  //   }
  // }, [state.columnResizing.columnWidths]);

  // Column - 순서 변경 시 DB 업데이트
  // useEffect(() => {
  //   onChangeColumnOrder(state.columnOrder);
  // }, [state.columnOrder]);

  // Column - 숨김 처리 변경 시 DB 업데이트
  // useEffect(() => {
  //   if (0 < state.hiddenColumns.length) {
  //     onChangeHiddenColumn(state.hiddenColumns);
  //   }
  // }, [state.hiddenColumns]);

  // // 페이지 변경 시 목록 갱신
  // useEffect(() => {
  //   onChangeCurrentPage(currentPage, totalRowCount);
  // }, [currentPage]);

  // Column 순서 변경
  // const moveColumn = useCallback(
  //   (item, newIndex) => {
  //     const newOrder = headerGroups[0].headers.map((header) => header.id);
  //     const { index: currentIndex } = item;

  //     const [removedColumn] = newOrder.splice(currentIndex, 1);

  //     newOrder.splice(newIndex, 0, removedColumn);

  //     setColumnOrder(newOrder);
  //   },
  //   [state, setColumnOrder]
  // );

  // 아이템 - 순서 변경
  const moveRow = (dragIndex, hoverIndex, movedItem, droppedRow) => {
    if (dragIndex === hoverIndex) {
      return;
    } else {
      onMoveRow(dragIndex, hoverIndex, movedItem, droppedRow);
    }
  };

  // 컨텍스트 메뉴 클릭
  // const onClickContextMenu = (e, data) => {
  //   const col = columns.find((column) => column.accessor === data.accessor);

  //   setColumns((prev) =>
  //     prev.map((item) =>
  //       item === col ? { ...col, show: !item.show } : { ...item }
  //     )
  //   );
  // };

  // 컨텍스트 메뉴 - 활성화된 컬럼인지 체크
  const isShowingColumn = (column) => {
    const col = columns.find((item) => item.header === column);

    return col.show ? true : false;
  };

  // 로컬 파일 드롭
  const onDropFile = (files, event) => {
    onFileDrop(files);
  };

  const calcColumnsWidth = () => {
    let width = 0;

    columns.map((col) => (col.width ? (width += col.width) : (width += 150)));

    return width + 2;
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {/* 찾기 */}
        {/* {useSearchFilter && <Search onSubmit={setGlobalFilter} />} */}

        {/* 새로 만들기 팝업 */}
        {/* {useAddPopup && (
          <AddUtility currentFolder={currentFolder} onAddFolder={onAddFolder} />
        )} */}

        {/* 현재 경로 */}
        {/* {useFolderPath && (
          <FolderPath
            currentFolder={currentFolder}
            setCurrentFolder={setCurrentFolder}
            checkList={checkList}
            onMoveItemToFolder={onMoveItemToFolder}
          />
        )} */}

        <Styles>
          <div
            {...getTableProps()}
            className="table"
            style={{
              // pointerEvents: showContextMenu ? "none" : "initial",
              userSelect: "none",
              WebkitUserSelect: "none",
            }}
          >
            {/* {useColumn && (
              <>
                <ContextMenuTrigger
                  id="same_unique_identifier"
                  mouseButton={2}
                  holdToDisplay={-1}
                >
                  <div>
                    {headerGroups.map((headerGroup) => (
                      <div
                        {...headerGroup.getHeaderGroupProps({
                          style: { width: "100%" },
                        })}
                        className="tr"
                      >
                        <div
                          style={{
                            display: "inline-block",
                            textAlign: "center",
                            width: "66px",
                            boxSizing: "border-box",
                          }}
                          className="th"
                        >
                          <input
                            style={{ width: "50px", margin: 0 }}
                            type="checkbox"
                            id={"checkall"}
                            onChange={(e) => {
                              if (e.target.checked) {
                                let rowIdList = [];
                                rows.map((row) => rowIdList.push(row.id));

                                setCheckList(rowIdList);
                              } else {
                                setCheckList([]);
                              }
                            }}
                            checked={
                              checkList.length === rows.length ? true : false
                            }
                          />
                        </div>
                        {headerGroup.headers.map((column, idx) => (
                          <Columns
                            state={state}
                            moveColumn={moveColumn}
                            key={column.id}
                            column={column}
                            index={idx}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </ContextMenuTrigger>
                <ContextMenu
                  id="same_unique_identifier"
                  onShow={() => setShowContextMenu(true)}
                  onHide={() => setShowContextMenu(false)}
                >
                  {columns &&
                    columns.map((column, idx) => (
                      <MenuItem
                        key={idx}
                        data={{ accessor: column.accessor }}
                        onClick={onClickContextMenu}
                      >
                        {column.header}
                        {isShowingColumn(column.header) && (
                          <span>
                            <RenderIcon type="check" size="20px" />
                          </span>
                        )}
                      </MenuItem>
                    ))}
                </ContextMenu>
              </>
            )} */}

            <FileDrop
              onDrop={(files, event) => onDropFile(files, event)}
              style={{ overflowX: "auto" }}
            >
              <div
                {...getTableBodyProps()}
                style={{ overflowX: "auto", width: calcColumnsWidth() }}
              >
                {rows.map(
                  (row, index) =>
                    prepareRow(row) || (
                      <Row
                        rows={rows}
                        index={index}
                        row={row}
                        moveRow={moveRow}
                        checkList={checkList}
                        setCheckList={setCheckList}
                        prepareRow={prepareRow}
                        setModalData={setModalData}
                        // setData={setData}
                        linkProps={linkProps}
                        avatarProps={avatarProps}
                        iconProps={iconProps}
                        timeFormat={timeFormat}
                        // setCurrentFolder={setCurrentFolder}
                        // resizeWidth={resizeWidth}
                        // onUpdateItem={onUpdateItem}
                        // onDeleteItem={onDeleteItem}
                        onClickItem={onClickItem}
                        onContextMenu={onContextMenu}
                        onBackward={onBackward}
                        {...row.getRowProps()}
                      />
                    )
                )}
              </div>
            </FileDrop>
          </div>

          {/* 드래그 시 UI */}
          <Preview checkList={checkList} />
        </Styles>
      </DndProvider>

      {/* 페이지네이션 */}
      {/* {usePagination && (
        <Pagination
          totalCount={totalRowCount}
          limit={maximumRow}
          page={currentPage}
          setPage={setCurrentPage}
        />
      )} */}

      {/* 상세보기 Modal */}
      <RenderModal
        isOpen={isOpenDetailModal}
        setIsOpen={setIsOpenDetailModal}
        width="400px"
        height="600px"
        data={<DetailItem data={modalData} />}
      />
    </>
  );
};

export default Table;
