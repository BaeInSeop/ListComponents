import React, { useRef } from "react";
const RenderIcon = ({ type, cursor, size, iconProps }) => {
  const ref = useRef();

  const style = {
    cursor: cursor ? "pointer" : "default",
    width: size ? size : "20px",
    height: size ? size : "20px",
  };

  const isReactComponent = (component) => {
    return React.isValidElement(component);
  };

  if (isReactComponent(iconProps.icons[type])) {
    return iconProps.icons[type];
  } else {
    return (
      <div style={{ fontSize: 0, width: "100%", height: "100%" }}>
        <img
          style={{ verticalAlign: "middle", display: "inline-block" }}
          src={iconProps.icons[type]}
          width={`${iconProps.size}px`}
          height={`${iconProps.size}px`}
        />
      </div>
    );
  }
};

export default RenderIcon;
