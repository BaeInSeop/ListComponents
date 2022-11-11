import React, { useState } from "react";
import ListComponent from "./ListComponent";

const Main = () => {
  const columns = React.useMemo(
    () => [
      {
        accessor: "checkbox",
        type: "checkbox",
        width: 50,
      },
      {
        accessor: "title",
        type: "text",
      },
      {
        accessor: "modified",
        type: "time",
      },
      {
        accessor: "extension",
        type: "icon",
        width: 50,
      },
      {
        accessor: "profile",
        type: "avatar",
        width: 70,
      },
      {
        accessor: "link",
        type: "link",
      },
      {
        accessor: "thumbnail",
        type: "image",
      },
    ],
    []
  );
  const [records, setRecords] = useState([
    {
      pk: 0,
      id: 0,
      pk: 1000,
      parentKey: 0,
      title:
        "Sample_1rSample_1rSample_1rSample_1rSample_1rSample_1rSample_1rSample_1rSample_1rSample_1rSample_1rSample_1r",
      modified: "2022-11-10 11:00:00",
      extension: "folder",
      profile: "Sample",
      isFolder: true,
      link: "https://www.googlegooglegooglegooglegoogle.com",
      thumbnail:
        "https://cdn3.iconfinder.com/data/icons/feather-5/24/download-512.png",
      checked: false,
    },
    {
      pk: 1,
      id: 1,
      title: "Test_File",
      extension: "file",
      profile: "Test",
      link: "https://www.naver.com",
      thumbnail:
        "https://cdn4.iconfinder.com/data/icons/pop-scenes/1000/navigation___explore_space_exploration_astronaut_planets_planet-512.png",
      checked: false,
    },
    {
      pk: 2,
      id: 2,
      title: "Test_Pdf",
      modified: "2010-10-17",
      extension: "pdf",
      readOnly: true,
      checked: false,
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
        useMoveRecord={false}
        iconProps={{
          size: 30,
          icons: {
            folder: <img src="logo192.png" />,
          },
        }}
      />
    </>
  );
};

export default Main;
