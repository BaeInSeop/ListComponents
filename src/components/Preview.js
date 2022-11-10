import React from "react";
import { useDragLayer } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

const Preview = ({ data }) => {
  const { isDragging, item, currentOffset, initialOffset } = useDragLayer(
    (monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    })
  );

  return isDragging ? (
    <div
      className="preview"
      style={{
        position: "fixed",
        pointerEvents: "none",
        left: 20,
        top: 0,
        transform: `translate(${currentOffset ? currentOffset.x : 0}px, ${
          currentOffset ? currentOffset.y : 0
        }px)`,
      }}
    >
      {"column" === item.type
        ? item.header
        : 1 < data.filter((item) => item.checked).length &&
          `${data.filter((item) => item.checked).length} 개의 아이템 이동`}
    </div>
  ) : null;
};

export default Preview;
