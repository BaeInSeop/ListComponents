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
      width: 150px;
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
  setColumns,
  data,
  setData,
  currentPath,
  setCurrentPath,
  checkList,
  setCheckList,
  searchFilter,
  path,
  pagination,
}) => {
  const resizeWidth = process.env.REACT_APP_RESIZING_WIDTH;

  const [currentPage, setCurrentPage] = useState(1);
  const [maximumRow, setMaximumRow] = useState(10);
  const [totalRowCount, setTotalRowCount] = useState(30);

  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
  const [modalData, setModalData] = useState();
  const [showContextMenu, setShowContextMenu] = useState(false);

  const [initialColumnOrder, setInitialColumnOrder] = useState([
    "id",
    "title",
    "type",
    "modified",
  ]);

  useEffect(() => {
    const noShowingColumns = columns.filter((e) => !e.show);
    setHiddenColumns(noShowingColumns.map((column) => column.accessor));
  }, [columns]);

  useEffect(() => {
    console.log("searchFilter : ", searchFilter);
  }, [searchFilter]);

  const defaultSize = useMemo(() => ({
    minWidth: 80,
    width: 150,
    maxWidth: 400,
  }));

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

  // const IndeterminateCheckbox = React.forwardRef(
  //   ({ row, indeterminate, ...rest }, ref) => {
  //     const defaultRef = React.useRef();
  //     const resolvedRef = ref || defaultRef;

  //     React.useEffect(() => {
  //       resolvedRef.current.indeterminate = indeterminate;
  //     }, [resolvedRef, indeterminate]);

  //     const [isTrue, setIsTrue] = useState(false);
  //     // const isDisabled = row.orginal.orderAmount > 1;

  //     useEffect(() => {
  //       if (row?.values?.orderAmount < 2) {
  //         setIsTrue(true);
  //       }
  //     }, [row]);
  //     return (
  //       <>
  //         <input
  //           type="checkbox"
  //           ref={resolvedRef}
  //           {...rest}
  //           disabled={isTrue}
  //         />
  //       </>
  //     );
  //   }
  // );

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
      initialState: {
        columnOrder: initialColumnOrder,
      },
      defaultColumn: defaultSize,
    },
    useColumnOrder,
    useBlockLayout,
    useResizeColumns,
    useGlobalFilter,
    useSortBy
  );

  useEffect(() => {
    if (0 < Object.keys(state.columnResizing.columnWidths).length) {
      console.log(
        "DB Update Column Size : ",
        state.columnResizing.columnWidths
      );
    }
  }, [state.columnResizing.columnWidths]);

  useEffect(() => {
    console.log("DB Update Column Order : ", state.columnOrder);
  }, [state.columnOrder]);

  useEffect(() => {
    if (0 < state.hiddenColumns.length) {
      console.log("DB Update HiddenColumn : ", state.hiddenColumns);
    }
  }, [state.hiddenColumns]);

  useEffect(() => {
    console.log("Page Changed - Get Item List", currentPage, totalRowCount);
  }, [currentPage]);

  useEffect(() => {
    console.log("Path Changed - Get Item List", currentPath);
  }, [currentPath]);

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

  const moveRow = (dragIndex, hoverIndex, item, row) => {
    if (dragIndex === hoverIndex) {
      return;
    }
    if ("folder" === row.original.type) {
      console.log("DB Update Move Item to Folder", checkList, row);
      return;
    } else {
      console.log("DB Update Change Row : ", dragIndex, hoverIndex);
      return;
    }

    // const dragRecord = data[dragIndex];
    // const tempRecords = [...data];

    // tempRecords.splice(dragIndex, 1);
    // tempRecords.splice(hoverIndex, 0, dragRecord);

    // console.log("tempRecords : ", tempRecords);

    // setData(tempRecords);
  };

  const onClickContextMenu = (e, data) => {
    const col = columns.find((column) => column.accessor === data.accessor);

    setColumns((prev) =>
      prev.map((item) =>
        item === col ? { ...col, show: !item.show } : { ...item }
      )
    );
  };

  const isShowingColumn = (column) => {
    const col = columns.find((item) => item.Header === column);

    return col.show ? true : false;
  };

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
        path: currentPath,
        status: 0,
      });
      rowIndex++;
    }

    setData((prev) => prev.concat(fileList));
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {searchFilter && <Search onSubmit={setGlobalFilter} />}
        {path && (
          <FolderPath
            currentPath={currentPath}
            setCurrentPath={setCurrentPath}
            checkList={checkList}
          />
        )}
        <Styles resizeWidth={resizeWidth}>
          <div
            {...getTableProps()}
            className="table"
            style={{ pointerEvents: showContextMenu ? "none" : "initial" }}
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
                        initialColumnOrder={initialColumnOrder}
                        setInitialColumnOrder={setInitialColumnOrder}
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
                        setCurrentPath={setCurrentPath}
                        {...row.getRowProps()}
                      />
                    )
                )}
              </div>
            </FileDrop>
          </div>
          <Preview checkList={checkList} />
        </Styles>
      </DndProvider>
      {pagination && (
        <Pagination
          totalCount={totalRowCount}
          limit={maximumRow}
          page={currentPage}
          setPage={setCurrentPage}
        />
      )}

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
