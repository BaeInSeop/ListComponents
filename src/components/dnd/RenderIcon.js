import React from "react";
import { FcAudioFile, FcFolder, FcImageFile, FcFile } from "react-icons/fc";
import { BsCheck } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { GrDocumentPdf, GrNotes, GrUpdate } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";

const RenderIcon = ({ type, size }) => {
  switch (type) {
    case "audio":
      return <FcAudioFile size={size ? size : "20px"} />;

    case "file":
      return <FcFile size={size ? size : "20px"} />;

    case "folder":
      return <FcFolder size={size ? size : "20px"} />;

    case "note":
      return <GrNotes size={size ? size : "20px"} />;

    case "pdf":
      return <GrDocumentPdf size={size ? size : "20px"} />;

    case "dot":
      return <BiDotsVerticalRounded size={size ? size : "20px"} />;

    case "check":
      return <BsCheck size={size ? size : "20px"} />;

    case "image":
      return <FcImageFile size={size ? size : "20px"} />;

    case "update":
      return <GrUpdate size={size ? size : "20px"} />;

    case "delete":
      return <MdDeleteOutline size={size ? size : "20px"} />;

    default:
      return type;
  }
};

export default RenderIcon;
