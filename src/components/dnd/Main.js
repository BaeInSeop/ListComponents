import React, { useEffect, useMemo, useState } from "react";
import Table from "./Table";
import dummyData from "./data/data.json";

function Main() {
  const [columns, setColumns] = useState([
    {
      Header: "Title",
      accessor: "title",
      maxWidth: 400,
      minWidth: 140,
      width: 300,
      disableResizing: false,
      show: true,
      disableSortBy: false,
    },
    {
      Header: "Type",
      accessor: "type",
      width: 50,
      disableResizing: false,
      show: true,
      disableSortBy: false,
    },
    {
      Header: "Modified",
      accessor: "modified",
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

  const [data, setData] = useState(dummyData.home);

  return (
    <div className="App">
      <Table
        columns={columns}
        setColumns={setColumns}
        data={data}
        setData={setData}
        resizeWidth={"3px"}
        searchFilter
        path
        pagination
      />
    </div>
  );
}

export default Main;
