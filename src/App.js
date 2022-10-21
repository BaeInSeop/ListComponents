import logo from "./logo.svg";
import "./App.css";
import { useEffect, useMemo, useState } from "react";
import Table from "./components/dnd/Table";

function App() {
  const [hideColumns, setHideColumns] = useState([]);
  const [columns, setColumns] = useState([
    {
      Header: "ID",
      accessor: "id",
      width: 30,
      disableResizing: true,
      show: false,
    },
    {
      Header: "Title",
      accessor: "title",
      width: 100,
      disableResizing: false,
      show: true,
    },
    {
      Header: "Type",
      accessor: "type",
      width: 50,
      disableResizing: false,
      show: true,
    },
    {
      Header: "Modified",
      accessor: "modified",
      width: 100,
      disableResizing: false,
      show: true,
    },
  ]);

  const [data, setData] = useState([
    {
      id: 0,
      title: "Test_File",
      type: "file",
      modified: "2022-10-17",
    },
    {
      id: 1,
      title: "Test_Note",
      type: "note",
      modified: "2022-10-18",
    },
    {
      id: 2,
      title: "Test_pdf.pdf",
      type: "pdf",
      modified: "2022-10-20",
    },
    {
      id: 3,
      title: "Test_Folder",
      type: "folder",
      modified: "2022-10-19",
    },
  ]);

  useEffect(() => {
    const noShowingColumns = columns.filter((e) => !e.show);
    setHideColumns(noShowingColumns.map((column) => column.accessor));
  }, [columns]);

  useEffect(() => {
    console.log("hideColumns : ", hideColumns);
  }, [hideColumns]);

  return (
    <div className="App">
      <Table
        columns={columns}
        setColumns={setColumns}
        data={data}
        setData={setData}
      />
    </div>
  );
}

export default App;
