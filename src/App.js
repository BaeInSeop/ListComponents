import logo from "./logo.svg";
import "./App.css";
import { useEffect, useMemo, useState } from "react";
import Table from "./components/dnd/Table";
import dummyData from "./components/dnd/data/data.json";

function App() {
  const [currentPath, setCurrentPath] = useState("home");

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
      width: 300,
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

  const [data, setData] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const [homeData, setHomeData] = useState(dummyData["home"]);
  const [testFolderData, setTestFolderData] = useState(
    dummyData["home/Test_Folder"]
  );

  useEffect(() => {
    setCheckList([]);
    if ('""' !== currentPath) {
      switch (currentPath) {
        case "home":
          return setData(homeData);

        case "home/Test_Folder":
          return setData(testFolderData);

        default:
          return setData(homeData);
      }
    }
  }, [currentPath]);

  return (
    <div className="App">
      <Table
        columns={columns}
        setColumns={setColumns}
        data={data}
        setData={setData}
        currentPath={currentPath}
        setCurrentPath={setCurrentPath}
        checkList={checkList}
        setCheckList={setCheckList}
        searchFilter
        path
        pagination
      />
    </div>
  );
}

export default App;
