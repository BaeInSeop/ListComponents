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

import { FileDrop } from "react-file-drop";

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
const StyledTable = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  h1 {
    margin-top: 62px;
    margin-bottom: 38px;
  }
`;
const Styles = styled.div`
  margin-top: 35px;
  /* padding: 1rem; */
  font-family: Open Sans, sans-serif;
  font-size: 13px;

  .table {
    border-spacing: 0;
    width: 100%;
    /* border-bottom: 1px solid #dddfe2; */

    .resizer {
      display: inline-block;
      /* background: black; */
      width: ${(props) => props.resizeWidth};
      position: relative;
      transform: translateX(50%);
      z-index: 1;
      ${"" /* prevents from scrolling while dragging on touch devices */}
      touch-action:none;

      &.isResizing {
        background: red;
      }
      &::after {
        content: "";
        display: block;
        position: absolute;
        bottom: 0;
        left: -2px;
        height: 1px;
        width: 4px;
        background: #ccc;
      }
    }

    .tr {
      :last-child {
        .td {
          /* border-bottom: 0; */
        }
      }
      .td + span {
        &:nth-of-type(1),
        &:nth-of-type(2),
        &:nth-of-type(3),
        &:nth-of-type(4) {
          position: relative;
          &::after {
            content: "";
            display: block;
            position: absolute;
            bottom: 0;
            left: -2px;
            height: 1px;
            width: 5px;
            background: #ccc;
          }
        }
      }
    }

    .th {
      /* width: 150px; */
      /* &:first-child {
        width: 9%;
      } */
      &:nth-of-type(2) {
        width: calc(52% - 66px);
      }
      &:nth-of-type(4) {
        text-align: center;
        width: 12%;
      }
      &:nth-of-type(6) {
        text-align: center;
        width: 18%;
      }
      &:nth-of-type(8) {
        text-align: center;
        width: 18%;
      }
      /* background-color: #ddd; */
      font-weight: bold;
    }
    .td {
      /* &:first-child {
        width: 9%;
      } */
      &:nth-of-type(2) {
        width: calc(52% - 66px);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        & > div {
          max-width: 500px;
        }
      }
      &:nth-of-type(3) {
        width: 12%;

        & > svg {
          line-height: 41px;
          vertical-align: middle;
        }
      }
      &:nth-of-type(4) {
        width: 18%;
      }
      &:nth-of-type(5) {
        width: 18%;
      }
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
  setColumns,
  data,
  setData,
  resizeWidth,
  maximumRowCount,
  totalCount,
  useAddPopup,
  useSearchFilter,
  useFolderPath,
  usePagination,
  onChangeColumnWidth,
  onChangeColumnOrder,
  onAddFolder,
  onMoveRow,
  onMoveItemToFolder,
  onChangeHiddenColumn,
  onChangeCurrentPage,
  onChangePath,
  onUpdateItem,
  onDeleteItem,
  onClickItem,
}) => {
  const [currentFolder, setCurrentFolder] = useState("home"); //현재 폴더

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [maximumRow, setMaximumRow] = useState(maximumRowCount); // 아이템 최대 갯수
  const [totalRowCount, setTotalRowCount] = useState(totalCount); // 불러온 아이템 최대 개수
  const [checkList, setCheckList] = useState([]); // 체크된 아이템

  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false); // 상세보기 Open State
  const [modalData, setModalData] = useState(); // 상세보기 데이터 State
  const [showContextMenu, setShowContextMenu] = useState(false); // 컨텍스트 메뉴 Open Sate

  // 현재 경로가 변경될 시 목록 최신화
  useEffect(() => {
    onChangePath(currentFolder);
  }, [currentFolder]);

  // Column - Show 항목이 false 인 경우 보여주지 않는 컬럼 설정
  useEffect(() => {
    const noShowingColumns = columns.filter((e) => !e.show);
    setHiddenColumns(noShowingColumns.map((column) => column.accessor));
  }, [columns]);

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
      // columnOrder: initialColumnOrder,
      // },
      defaultCanSort: true,
    },
    useColumnOrder,
    useBlockLayout,
    useResizeColumns,
    useGlobalFilter,
    useSortBy
  );

  // Column - 사이즈 변경 시 DB 업데이트
  useEffect(() => {
    if (0 < Object.keys(state.columnResizing.columnWidths).length) {
      onChangeColumnWidth(state.columnResizing.columnWidths);
    }
  }, [state.columnResizing.columnWidths]);

  // Column - 순서 변경 시 DB 업데이트
  useEffect(() => {
    onChangeColumnOrder(state.columnOrder);
  }, [state.columnOrder]);

  // Column - 숨김 처리 변경 시 DB 업데이트
  useEffect(() => {
    if (0 < state.hiddenColumns.length) {
      onChangeHiddenColumn(state.hiddenColumns);
    }
  }, [state.hiddenColumns]);

  // 페이지 변경 시 목록 갱신
  useEffect(() => {
    onChangeCurrentPage(currentPage, totalRowCount);
  }, [currentPage]);

  // Column 순서 변경
  const moveColumn = useCallback(
    (item, newIndex) => {
      const newOrder = headerGroups[0].headers.map((header) => header.id);
      const { index: currentIndex } = item;

      const [removedColumn] = newOrder.splice(currentIndex, 1);

      newOrder.splice(newIndex, 0, removedColumn);

      setColumnOrder(newOrder);
    },
    [state, setColumnOrder]
  );

  // 아이템 - 순서 변경
  const moveRow = (dragIndex, hoverIndex, item, row) => {
    if (dragIndex === hoverIndex) {
      return;
    }
    if ("folder" === row.original.extension) {
      onMoveItemToFolder(checkList, row);
      return;
    } else {
      onMoveRow(item, row);
      return;
    }

    // const dragRecord = data[dragIndex];
    // const tempRecords = [...data];

    // tempRecords.splice(dragIndex, 1);
    // tempRecords.splice(hoverIndex, 0, dragRecord);

    // console.log("tempRecords : ", tempRecords);

    // setData(tempRecords);
  };

  // 컨텍스트 메뉴 클릭
  const onClickContextMenu = (e, data) => {
    const col = columns.find((column) => column.accessor === data.accessor);

    setColumns((prev) =>
      prev.map((item) =>
        item === col ? { ...col, show: !item.show } : { ...item }
      )
    );
  };

  // 컨텍스트 메뉴 - 활성화된 컬럼인지 체크
  const isShowingColumn = (column) => {
    const col = columns.find((item) => item.Header === column);

    return col.show ? true : false;
  };

  // 로컬 파일 드롭
  const onDropFile = (files, event) => {
    console.log("files : ", files);
    let rowIndex = rows.length;
    let fileList = [];

    for (let i = 0; i < files.length; i++) {
      fileList.push({
        id: rowIndex,
        title: files[i].name,
        type: "file",
        modified: moment(files[i].lastModified).format("YYYY-MM-DD"),
        status: 0,
      });
      rowIndex++;
    }

    setData((prev) => prev.concat(fileList));
  };

  return (
    <>
      <StyledTable>
        <h1>목록</h1>

        <DndProvider backend={HTML5Backend}>
          {/* 찾기 */}
          {useSearchFilter && <Search onSubmit={setGlobalFilter} />}

          {/* 새로 만들기 팝업 */}
          {useAddPopup && (
            <AddUtility
              currentFolder={currentFolder}
              onAddFolder={onAddFolder}
            />
          )}

          {/* 현재 경로 */}
          {/* {useFolderPath && ( 
<FolderPath 
currentFolder={currentFolder} 
setCurrentFolder={setCurrentFolder} 
checkList={checkList} 
onMoveItemToFolder={onMoveItemToFolder} 
/> 
)} */}
          <StyledTable>
            <Styles resizeWidth={resizeWidth}>
              <div
                {...getTableProps()}
                className="table"
                style={{
                  pointerEvents: showContextMenu ? "none" : "initial",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                }}
              >
                <ContextMenuTrigger
                  id="same_unique_identifier"
                  mouseButton={2}
                  holdToDisplay={-1}
                >
                  <div>
                    {headerGroups.map((headerGroup) => (
                      <div
                        {...headerGroup.getHeaderGroupProps({
                          style: { display: "flex", width: "100%" },
                        })}
                        className="tr"
                      >
                        <div
                          style={{
                            display: "inline-block",
                            textAlign: "center",
                            width: "66px",
                            boxSizing: "border-box",
                            lineHeight: "41px",
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
                        {column.Header}
                        {isShowingColumn(column.Header) && (
                          <span>
                            <RenderIcon type="check" size="20px" />
                          </span>
                        )}
                      </MenuItem>
                    ))}
                </ContextMenu>

                <FileDrop onDrop={(files, event) => onDropFile(files, event)}>
                  <div {...getTableBodyProps()}>
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
                            setData={setData}
                            setCurrentFolder={setCurrentFolder}
                            resizeWidth={resizeWidth}
                            onUpdateItem={onUpdateItem}
                            onDeleteItem={onDeleteItem}
                            onClickItem={onClickItem}
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
          </StyledTable>
        </DndProvider>

        {/* 페이지네이션 */}
        {usePagination && (
          <Pagination
            totalCount={totalRowCount}
            limit={maximumRow}
            page={currentPage}
            setPage={setCurrentPage}
          />
        )}

        {/* 상세보기 Modal */}
        <RenderModal
          isOpen={isOpenDetailModal}
          setIsOpen={setIsOpenDetailModal}
          width="400px"
          height="600px"
          data={<DetailItem data={modalData} />}
        />
      </StyledTable>
    </>
  );
};

export default Table;
