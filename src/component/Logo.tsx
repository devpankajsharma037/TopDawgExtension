import React from "react";

export default function Logo(props) {
  const { alt = "TopDawg", width = "25px", height = "25px" } = props;
  return (
    <img
      alt={alt}
      width={width}
      height={height}
      src={chrome.runtime.getURL("images/icon.png")}
    />
  );
}
