import React from "react";
import Modal from "react-modal";

const RenderModal = ({ isOpen, setIsOpen, width, height, data }) => {
  const modalStyles = {
    overlay: {
      position: "fixed",
      zIndex: 999,
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: `rgba(255,255,255,0.6)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: width ? width : "500px",
      height: height ? height : "500px",
      transform: "translate(-50%, -50%)",
      border: "1px solid black",
      zIndex: "3",
      padding: "0",
      borderRadius: "5px",
      overflowY: "hidden",
      overflowX: "hidden",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      style={modalStyles}
      ariaHideApp={false}
      onRequestClose={() => setIsOpen(false)}
    >
      {data}
    </Modal>
  );
};

export default RenderModal;
