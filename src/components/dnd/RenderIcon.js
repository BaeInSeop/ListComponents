import React from "react";
import { FcAudioFile, FcFolder, FcImageFile, FcFile } from "react-icons/fc";
import { BsCheck } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { GrDocumentPdf, GrNotes, GrUpdate } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";

const RenderIcon = ({ type, cursor, size }) => {
  const style = {
    cursor: cursor ? "pointer" : "default",
    width: size ? size : "20px",
    height: size ? size : "20px",
  };
  switch (type) {
    case "audio":
      return <FcAudioFile style={style} />;

    case "file":
      return <FcFile style={style} />;

    case "folder":
      return <FcFolder style={style} />;

    case "note":
      return <GrNotes style={style} />;

    case "pdf":
      return <GrDocumentPdf style={style} />;

    case "dot":
      return <BiDotsVerticalRounded style={style} />;

    case "check":
      return <BsCheck style={style} />;

    case "image":
      return <FcImageFile style={style} />;

    case "update":
      return <GrUpdate style={style} />;

    case "delete":
      return <MdDeleteOutline style={style} />;

    default:
      return type;
  }
};

export default RenderIcon;
