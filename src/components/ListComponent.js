import React, { useEffect, useMemo, useState } from "react";
import Table from "./Table";
import dummyData from "./data/data.json";

function ListComponent({
  header,
  items,
  resizeWidth,
  maximumRowCount,
  totalCount,
  useSearchFilter,
  useAddPopup,
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
}) {
  const [columns, setColumns] = useState(
    header
      ? header
      : [
          {
            header: "Name",
            accessor: "name",
            maxWidth: 400,
            minWidth: 140,
            width: 300,
            disableResizing: false,
            show: true,
            disableSortBy: true,
          },
          {
            header: "Extension",
            accessor: "extension",
            // minWidth: 100,
            // width: 100,
            disableResizing: false,
            show: true,
            disableSortBy: false,
          },
          {
            header: "LastWork",
            accessor: "lastwork",
            // minWidth: 100,
            // width: 150,
            disableResizing: false,
            show: true,
            disableSortBy: false,
          },
          {
            header: "Action",
            accessor: "action",
            // width: 150,
            disableResizing: true,
            show: true,
            disableSortBy: true,
          },
        ]
  );

  // 초기 컬럼 설정
  // const [columns, setColumns] = useState(header);
  ///// Example - Column
  // {
  //   Header: String
  //   accessor: String
  //   maxWidth: Number 400,
  //   minWidth: Number 140,
  //   width: Number 300,
  //   disableResizing: Boolean false,
  //   show: Boolean true,
  //   disableSortBy: Boolean false,
  // },

  const [data, setData] = useState(items ? items : dummyData.home);
  // 초기 데이터들 설정
  ///// Example - Row
  // {
  //   "id": 0,
  //   "title": "Test_File",
  //   "type": "file",
  //   "modified": "2022-10-17",
  //   "path": "home",
  //   "status": 0 - Not Use / 1 - Can Use / 2 - Loading
  // },

  useEffect(() => {
    console.log("data : ", data);
  }, [data]);

  return (
    <div>
      <Table
        columns={columns}
        setColumns={setColumns}
        data={data}
        setData={setData}
        resizeWidth={resizeWidth ? resizeWidth : "3px"}
        maximumRowCount={maximumRowCount ? maximumRowCount : 10}
        totalCount={totalCount ? totalCount : 30}
        useAddPopup={useAddPopup ? useAddPopup : true}
        useSearchFilter={useSearchFilter ? useSearchFilter : true}
        useFolderPath={useFolderPath ? useFolderPath : true}
        usePagination={usePagination ? usePagination : true}
        onChangeColumnWidth={
          onChangeColumnWidth
            ? onChangeColumnWidth
            : (column) => {
                console.log("Change Column Width : ", column);
              }
        }
        onChangeColumnOrder={
          onChangeColumnOrder
            ? onChangeColumnOrder
            : (column) => {
                console.log("Change Column Order : ", column);
              }
        }
        onAddFolder={
          onAddFolder
            ? onAddFolder
            : (currentFolder) => {
                console.log("Add Folder in this Path : ", currentFolder);
              }
        }
        onMoveRow={
          onMoveRow
            ? onMoveRow
            : (dragIndex, hoverIndex) => {
                console.log("onMoveRow", dragIndex, hoverIndex);
              }
        }
        onMoveItemToFolder={
          onMoveItemToFolder
            ? onMoveItemToFolder
            : (checklist, row) => {
                console.log("Move Checklist File to Folder : ", checklist, row);
              }
        }
        onChangeHiddenColumn={
          onChangeHiddenColumn
            ? onChangeHiddenColumn
            : (column) => {
                console.log("Change Hidden Column : ", column);
              }
        }
        onChangeCurrentPage={
          onChangeCurrentPage
            ? onChangeCurrentPage
            : (page) => {
                console.log("Change Page : ", page);
              }
        }
        onChangePath={
          onChangePath
            ? onChangePath
            : (path) => {
                console.log("Change Path : ", path);
              }
        }
        onUpdateItem={
          onUpdateItem
            ? onUpdateItem
            : (row) => {
                console.log("Update Item : ", row);
              }
        }
        onDeleteItem={
          onDeleteItem
            ? onDeleteItem
            : (row) => {
                console.log("Delete Item : ", row);
              }
        }
        onClickItem={
          onClickItem
            ? onClickItem
            : (item) => {
                if (1 === item.original.status) {
                  if ("folder" === item.original.extension) {
                    console.log("Folder Click : ", item);
                  } else {
                    console.log("on Item Click : ", item);
                  }
                } else {
                  console.log("Cannot Use Item : ", item);
                }
              }
        }
      />
    </div>
  );
}

export default ListComponent;
