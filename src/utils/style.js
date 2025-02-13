let fontFamily_ = "Inter_800";

let style = {
  popupContainerMain: {
    width: "450px",
    height: "600px",
    padding: "0px",
    background: "#000",
  },
  popupLogoGrid: {
    padding: "20px",
    justifyContent: "space-between",
    alignItems: "center",
  },
  popupFooterGrid: {
    padding: "20px",
  },
  popupFooterGridContainer: {
    alignItems: "center",
  },
  popupFooterText: {
    fontFamily: fontFamily_,
    fontSize: "14px",
  },
  popupMainContent: {
    height: "calc(100vh - 130px)",
    padding: "20px",
    overflow: "scroll",
  },
  popupFormInput: {
    backgroundColor: "#fff",
    borderRadius: "11px",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "transparent",
      },
      "&:hover fieldset": {
        borderColor: "transparent",
      },
      "&.Mui-focused fieldset": {
        borderColor: "transparent",
      },
    },
    "& .MuiInputBase-input": {
      color: "#000",
      padding: "6px,14px",
      fontSize: "14px",
    },
  },
  popupFormLable: {
    color: "#fff",
    fontSize: "1.1rem",
  },
  popupFormLayout: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    height: "100%",
  },
  containedButton: {
    background: "linear-gradient(to bottom, #FCF6BA, #BF953F);",
    color: "#000",
    padding: "0.5rem 1.5rem",
    fontSize: "16px",
    borderRadius: "8px",
    textTransform: "none",
    "&:hover": {
      background: "linear-gradient(to bottom,rgb(245, 241, 196), #BF953F);",
    },
  },
  submitUserDetailButton: {
    maxWidth: "fit-content",
    display: "block",
    marginLeft: "auto",
  },
};
export default style;
