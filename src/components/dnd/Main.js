import React, { useEffect, useMemo, useState } from "react";
import Table from "./Table";
import dummyData from "./data/data.json";
import {
  selectFolder,
  insertFolder,
  updateFolder,
  deleteFolder,
  insertFile,
} from "../../libs/DbApi";
// import { selectFolder } from "../libs/DbApi";

function Main({
  header,
  // items,
  resizeWidth,
  useSearchFilter,
  useAddPopup,
  useFolderPath,
  usePagination,
}) {
  const items = dummyData.home;
  const [columns, setColumns] = useState([
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
  ]);

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

  const [data, setData] = useState(items);
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
        useAddPopup={true}
        useSearchFilter={true}
        useFolderPath={false}
        usePagination={true}
        // useAddPopup={useAddPopup}
        // useSearchFilter={useSearchFilter}
        // useFolderPath={useFolderPath}
        // usePagination={usePagination}
      />
    </div>
  );
}

export default Main;
