import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  useBlockLayout,
  useColumnOrder,
  useFlexLayout,
  useResizeColumns,
  useTable,
  useSortBy,
  useGlobalFilter,
  useRowSelect,
} from "react-table";

import {
  ContextMenu,
  MenuItem,
  ContextMenuTrigger,
  showMenu,
} from "react-contextmenu";
import moment from "moment";

import { FileDrop } from "react-file-drop";

import styled from "styled-components";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Row from "./Row";
import Preview from "./Preview";
import Columns from "./Columns";
import Search from "./Search";

import { ReactComponent as Icon_Check } from "./Images/icon_check.svg";
import "./css/ContextMenu.css";
import RenderModal from "./RenderModal";
import DetailItem from "./DetailItem";

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
      width: 3px;
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
    .td {
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

const Table = ({ columns, setColumns, data, setData }) => {
  const [checkList, setCheckList] = useState([]);
  const [records, setRecords] = useState(data);
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
  const [modalData, setModalData] = useState();

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

  const defaultSize = useMemo(() => ({
    minWidth: 30,
    width: 150,
    maxWidth: 400,
  }));
  const getRowId = useCallback((row) => {
    return row.id;
  }, []);

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
    // selectedFlatRows,
    state,
    setColumnOrder,
    setGlobalFilter,
    setHiddenColumns,
  } = useTable(
    {
      data: records,
      columns,
      // getRowId,
      initialState: {
        columnOrder: initialColumnOrder,
        // hiddenColumns: hideColumns,
      },

      defaultColumn: defaultSize,
    },
    useColumnOrder,
    useBlockLayout,
    useResizeColumns,
    useGlobalFilter,
    useSortBy
  );

  const moveColumn = useCallback(
    (item, newIndex) => {
      const newOrder = headerGroups[0].headers.map((header) => header.id);
      const { index: currentIndex } = item;

      const [removedColumn] = newOrder.splice(currentIndex, 1);

      newOrder.splice(newIndex, 0, removedColumn);

      console.log("nowOrder : ", newOrder);

      setColumnOrder(newOrder);
    },
    [state, setColumnOrder]
  );

  const moveRow = (dragIndex, hoverIndex) => {
    console.log(dragIndex, hoverIndex);
    const dragRecord = records[dragIndex];
    const tempRecords = [...records];

    tempRecords.splice(dragIndex, 1);
    tempRecords.splice(hoverIndex, 0, dragRecord);

    console.log("tempRecords : ", tempRecords);

    setRecords(tempRecords);
  };

  const handleItemClick = (e, data) => {
    console.log(" handleItemClick : ", e, data);
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
    const addFiles = files.map((file) => {
      return {
        title: file.name,
        type: "file",
        modified: moment(file.lastModified).format("YYYY-MM-DD"),
      };
    });

    console.log("addFiles : ", addFiles);
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Search onSubmit={setGlobalFilter} />
        <Styles>
          <div {...getTableProps()} className="table">
            <ContextMenuTrigger id="same_unique_identifier">
              <div>
                {headerGroups.map((headerGroup) => (
                  <div
                    {...headerGroup.getHeaderGroupProps({
                      style: { width: "100%" },
                    })}
                    className="tr"
                  >
                    <div>
                      <input
                        style={{ width: "50px" }}
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
            <ContextMenu id="same_unique_identifier" hideOnLeave={true}>
              {columns &&
                columns.map((column) => (
                  <MenuItem
                    data={{ accessor: column.accessor }}
                    onClick={handleItemClick}
                  >
                    {column.Header}
                    {isShowingColumn(column.Header) && (
                      <span>
                        <Icon_Check width={"20px"} />
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
                        index={index}
                        row={row}
                        moveRow={moveRow}
                        checkList={checkList}
                        setCheckList={setCheckList}
                        prepareRow={prepareRow}
                        setModalData={setModalData}
                        {...row.getRowProps()}
                      />
                    )
                )}
              </div>
            </FileDrop>
          </div>
          <Preview />
        </Styles>
      </DndProvider>
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
