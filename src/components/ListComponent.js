import React, { useEffect, useMemo, useState } from "react";
import Table from "./Table";
import {
  FaRegFile,
  FaRegFilePdf,
  FaRegFileImage,
  FaRegFileAudio,
  FaRegFolder,
} from "react-icons/fa";
import ReactLoading from "react-loading";

function ListComponent({
  columns,
  records,
  rowHeight,
  linkProps,
  avatarProps,
  iconProps,
  imageProps,
  timeFormat,
  onMoveRecord,
  onClickRecord,
  onSelectedRows,
  onFileDrop,
  onContextMenu,
  onBackward,
  useBackward,
}) {
  // const columns = React.useMemo(
  //   () => [
  //     {
  //       accessor: "checkbox",
  //       type: "checkbox",
  //       width: 50,
  //     },
  //     {
  //       accessor: "title",
  //       type: "text",
  //     },
  //     {
  //       accessor: "modified",
  //       type: "time",
  //     },
  //     {
  //       accessor: "extension",
  //       type: "icon",
  //       width: 50,
  //     },
  //     {
  //       accessor: "profile",
  //       type: "avatar",
  //       width: 70,
  //     },
  //     {
  //       accessor: "link",
  //       type: "link",
  //     },
  //     {
  //       accessor: "thumbnail",
  //       type: "image",
  //     },
  //   ],
  //   []
  // );

  // const [records, setRecords] = useState([
  //   {
  //     pk: 1000,
  //     parentKey: 0,
  //     checkbox: true,
  //     title:
  //       "Sample_1rSample_1rSample_1rSample_1rSample_1rSample_1rSample_1rSample_1rSample_1rSample_1rSample_1rSample_1r",
  //     modified: "2010-10-17",
  //     extension: "folder",
  //     profile: "Sample",
  //     isFolder: true,
  //     link: "https://www.googlegooglegooglegooglegoogle.com",
  //     thumbnail:
  //       "https://cdn3.iconfinder.com/data/icons/feather-5/24/download-512.png",
  //     isLock: false,
  //   },
  //   {
  //     checkbox: true,
  //     title: "Test_File",
  //     extension: "file",
  //     profile: "Test",
  //     link: "https://www.naver.com",
  //     thumbnail:
  //       "https://cdn4.iconfinder.com/data/icons/pop-scenes/1000/navigation___explore_space_exploration_astronaut_planets_planet-512.png",
  //   },
  //   {
  //     checkbox: true,
  //     title: "Test_Pdf",
  //     modified: "2010-10-17",
  //     extension: "pdf",
  //     readOnly: true,
  //   },
  // ]);

  // const [columns, setColumns] = useState(
  //   header.map((item) =>
  //     item.accessor
  //       ? { ...item }
  //       : { ...item, accessor: item.header.toLowerCase() }
  //   )
  // );

  // const [data, setData] = useState(items);

  const rowLinkProps = {
    target: linkProps
      ? linkProps.target
        ? linkProps.target
        : "_blank"
      : "_blank",
    text: linkProps ? (linkProps.text ? linkProps.text : "") : "",
  };

  const rowAvatarProps = {
    size: avatarProps ? (avatarProps.size ? avatarProps.size : 30) : 30,
    round: avatarProps
      ? avatarProps.round
        ? avatarProps.round
        : "50%"
      : "50%",
  };

  const rowIconProps = {
    size: iconProps ? (iconProps.size ? iconProps.size : 30) : 30,
    icons: iconProps
      ? iconProps.icons
        ? iconProps.icons
        : {
            folder: <FaRegFolder />,
            file: <FaRegFile width={30} height={30} />,
            pdf: <FaRegFilePdf width={30} height={30} />,
            image: <FaRegFileImage width={30} height={30} />,
            audio: <FaRegFileAudio width={30} height={30} />,
            loading: (
              <ReactLoading type="spin" color={"red"} width={15} height={15} />
            ),
          }
      : {
          folder: <FaRegFolder />,
          file: <FaRegFile width={30} height={30} />,
          pdf: <FaRegFilePdf width={30} height={30} />,
          image: <FaRegFileImage width={30} height={30} />,
          audio: <FaRegFileAudio width={30} height={30} />,
          loading: (
            <ReactLoading type="spin" color={"red"} width={15} height={15} />
          ),
        },
  };

  const rowImageProps = {
    target: imageProps
      ? imageProps.target
        ? imageProps.target
        : "_blank"
      : "_blank",
    size: imageProps ? (imageProps.size ? imageProps.size : 30) : 30,
  };

  const rowTimeFormat = timeFormat ? timeFormat : "YYYY-MM-DD HH:mm:ss";

  return (
    <>
      <Table
        columns={columns ? columns : []}
        data={records ? records : []}
        rowHeight={rowHeight ? rowHeight : 50}
        linkProps={rowLinkProps}
        avatarProps={rowAvatarProps}
        imageProps={rowImageProps}
        iconProps={rowIconProps}
        timeFormat={rowTimeFormat}
        onMoveRecord={
          onMoveRecord
            ? onMoveRecord
            : (dragIndex, hoverIndex, movedItem, droppedRow) => {}
        }
        onClickRecord={onClickRecord ? onClickRecord : (item) => {}}
        onContextMenu={onContextMenu ? onContextMenu : (row, event) => {}}
        onFileDrop={onFileDrop ? onFileDrop : (droppedFile) => {}}
        onSelectedRows={onSelectedRows ? onSelectedRows : (rows) => {}}
        onBackward={onBackward ? onBackward : () => {}}
        useBackward={useBackward ? useBackward : false}
      />
    </>
  );
}

export default ListComponent;
