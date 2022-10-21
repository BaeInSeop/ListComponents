import React, { useEffect } from "react";

const DetailItem = ({ data }) => {
  return (
    <ul>
      {Object.keys(data).map((item) => (
        <li>
          <span>{item} / </span>
          <span>{data[item]}</span>
        </li>
      ))}
    </ul>
  );
};

export default DetailItem;
