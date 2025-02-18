import React from "react";

export default function Logo(props) {
  const { alt = "TopDawg", width = "110px", height = "auto" } = props;
  return (
    <img
      alt={alt}
      width={width}
      height={height}
      src={chrome.runtime.getURL("images/logo.png")}
    />
  );
}
