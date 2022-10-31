import React from "react";
import { useDragLayer } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

const Preview = ({ checkList }) => {
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
        left: 0,
        top: 0,
        transform: `translate(${currentOffset ? currentOffset.x : 0}px, ${
          currentOffset ? currentOffset.y : 0
        }px)`,
      }}
    >
      {"column" === item.type
        ? item.header
        : `${checkList.length} 개 파일 이동`}
    </div>
  ) : null;
};

export default Preview;
