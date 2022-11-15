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
  setRecords,
  rowHeight,
  linkProps,
  avatarProps,
  iconProps,
  imageProps,
  timeProps,
  onMoveRecord,
  onClickRecord,
  onFileDrop,
  onContextMenu,
  onBackward,
  useBackward,
  useMoveRecord,
  useVirtualized,
}) {
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

  const rowTimeProps = {
    lang: timeProps ? timeProps.lang && timeProps.lang : "ko",
    format: timeProps ? timeProps.format && timeProps.format : "",
  };

  return (
    <>
      <Table
        columns={columns ? columns : []}
        data={records ? records : []}
        setData={setRecords ? setRecords : null}
        rowHeight={rowHeight ? rowHeight : 70}
        linkProps={rowLinkProps}
        avatarProps={rowAvatarProps}
        imageProps={rowImageProps}
        iconProps={rowIconProps}
        timeProps={rowTimeProps}
        onMoveRecord={
          onMoveRecord
            ? onMoveRecord
            : (dragIndex, hoverIndex, movedItem, droppedRow) => {}
        }
        onClickRecord={onClickRecord ? onClickRecord : (item) => {}}
        onContextMenu={onContextMenu ? onContextMenu : (row, event) => {}}
        onFileDrop={onFileDrop ? onFileDrop : (droppedFile) => {}}
        onBackward={onBackward ? onBackward : () => {}}
        useBackward={undefined !== useBackward ? useBackward : false}
        useMoveRecord={undefined !== useMoveRecord ? useMoveRecord : true}
        useVirtualized={undefined !== useVirtualized ? useVirtualized : false}
      />
    </>
  );
}

export default ListComponent;
