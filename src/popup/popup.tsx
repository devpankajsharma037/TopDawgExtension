import React from "react";
import { createRoot } from "react-dom/client";
import { Container } from "@mui/material";
import style from "../utils/style";
import "./popup.css";
import Header from "../component/Header";
import Footer from "../component/Footer";
import LayoutContent from "./layout/LayoutContent";

const { popupContainerMain } = style;
const popupContainer = (
  <Container sx={popupContainerMain}>
    <Header />
    <LayoutContent />
    {/* <Footer/> */}
  </Container>
);

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(popupContainer);

window.onload = function () {
  var font = document.createElement("style");
  font.textContent =
    '@font-face { font-family: Inter_800; src: url("' +
    chrome.runtime.getURL("fonts/Inter/Inter_18pt-Regular.ttf") +
    '"); }';
  document.head.appendChild(font);
};
