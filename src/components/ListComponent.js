import React, { useEffect, useMemo, useState } from "react";
import Table from "./Table";
import dummyData from "./data/data.json";

function ListComponent({
  header,
  items,
  resizeWidth,
  useSearchFilter,
  useAddPopup,
  useFolderPath,
  usePagination,
}) {
  const [columns, setColumns] = useState(
    header
      ? header
      : [
          {
            Header: "Name",
            accessor: "name",
            maxWidth: 400,
            minWidth: 140,
            width: 300,
            disableResizing: false,
            show: true,
            disableSortBy: false,
          },
          {
            Header: "Extension",
            accessor: "extension",
            minWidth: 100,
            width: 100,
            disableResizing: false,
            show: true,
            disableSortBy: false,
          },
          {
            Header: "LastWork",
            accessor: "lastwork",
            minWidth: 100,
            width: 150,
            disableResizing: false,
            show: true,
            disableSortBy: false,
          },
          {
            Header: "Action",
            accessor: "action",
            width: 150,
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

  return (
    <div>
      <Table
        columns={columns}
        setColumns={setColumns}
        data={data}
        setData={setData}
        resizeWidth={resizeWidth ? resizeWidth : "3px"}
        maximumRowCount={10}
        totalCount={30}
        useAddPopup={true}
        useSearchFilter={true}
        useFolderPath={true}
        usePagination={true}
        onChangeColumnWidth={(column) => {
          console.log("Change Column Width : ", column);
        }}
        onChangeColumnOrder={(column) => {
          console.log("Change Column Order : ", column);
        }}
        onAddFolder={(currentFolder) => {
          console.log("Add Folder in this Path : ", currentFolder);
        }}
        onMoveRow={(dragIndex, hoverIndex) => {
          console.log("onMoveRow", dragIndex, hoverIndex);
        }}
        onMoveItemToFolder={(checklist, row) => {
          console.log("Move Checklist File to Folder : ", checklist, row);
        }}
        onChangeHiddenColumn={(column) => {
          console.log("Change Hidden Column : ", column);
        }}
        onChangeCurrentPage={(page) => {
          console.log("Change Page : ", page);
        }}
        onChangePath={(path) => {
          console.log("Change Path : ", path);
        }}
        onUpdateItem={(row) => {
          console.log("Update Item : ", row);
        }}
        onDeleteItem={(row) => {
          console.log("Delete Item : ", row);
        }}
        onClickItem={(item) => {
          if (1 === item.original.status) {
            if ("folder" === item.original.extension) {
              console.log("Folder Click : ", item);
            } else {
              console.log("on Item Click : ", item);
            }
          } else {
            console.log("Cannot Use Item : ", item);
          }
        }}
      />
    </div>
  );
}

export default ListComponent;
