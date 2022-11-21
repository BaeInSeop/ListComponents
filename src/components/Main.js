import moment from "moment";
import React, { useState } from "react";
import ListComponent from "./ListComponent";

const Main = () => {
  const columns = React.useMemo(
    () => [
      {
        accessor: "checkbox",
        type: "checkbox",
        width: 40,
      },
      {
        className: "list-icon",
        accessor: "icon",
        type: "icon",
        width: 40,
      },
      {
        className: "list-name",
        accessor: "name",
        type: "text",
        useDesc: true,
      },
      {
        className: "list-modified",
        accessor: "modified",
        type: "time",
      },
      {
        accessor: "avatar",
        type: "avatar",
        width: 50,
      },
      {
        accessor: "link",
        type: "link",
      },
      {
        accessor: "image",
        type: "image",
      },
    ],
    []
  );
  const [records, setRecords] = useState([
    {
      icon: "folder",
      name: {
        title: "타이틀타이틀타이틀타이틀타이틀타이틀",
        desc: "부제목부제목부제목부제목부제목부제목부제목부제목부제목부제목부제목",
      },
      modified: moment(),
      avatar: "테스트",
      link: "http://www.navernavernavernavernavernavernavernaver.com",
      image:
        "https://cdn3.iconfinder.com/data/icons/feather-5/24/download-512.png",
    },
    {
      icon: "file",
      name: "테스트 파일",
      modified: moment(),
    },
  ]);

  return (
    <>
      <ListComponent
        columns={columns}
        records={records}
        setRecords={setRecords}
        // onClickRecord={(item) => {
        //   item.isFolder ? onClickFolder(item) : onClickFile(item);
        // }}
        // useBackward={true}
        // onBackward={() => onBackward()}
        // onFileDrop={(droppedFile) => onDroppedFiles(droppedFile)}
        useVirtualized={true}
        useBackward={true}
        useMoveRecord={false}
      />
    </>
  );
};

export default Main;
