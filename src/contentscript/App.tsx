import React,{useState } from "react";
import { Box, Button,Drawer, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import CloseIcon from '@mui/icons-material/Close';

export default function App() {
  const [visibleSideBar, setVisibleSideBar] = useState(false);

  const mainSideBarOpen = () =>{
    setVisibleSideBar(true)
  }

  const closeSideBar = () =>{
    setVisibleSideBar(false)
  }
  

  return (
    <>
      {!visibleSideBar &&
        <Box sx={styleSx}>
          <Button
            onClick={() => mainSideBarOpen()}
          >
            Open
          </Button>
        </Box>
      }
      <Drawer
        anchor={'right'}
        open={visibleSideBar}
        onClose={closeSideBar}
      >
        <Box p={"20px"} width={"280px"}>
          <Grid container spacing={2} textAlign={"end"}> 
            <Grid size={12}>
              <CloseIcon sx={{cursor:"pointer"}} onClick={closeSideBar}/>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={sideBarContentSx} >
            <Grid size={12}>
              <Box>
                  <Typography>Side Bar</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </>
  );
}

let styleSx = {
  top: "100px",
  zIndex: 9999,
  right: "0px",
  background: "#ffffff",
  width: "61px",
  height: "58px",
  borderRadius: "8px",
  position: "fixed",
  boxShadow: "0px 4px 8px 0px #00000066",
  "&:hover": {
    background: "#ffffff",
  },
  display:'flex'
};

let sideBarContentSx = {
  justifyContent:'center',
  textAlign: 'center',
  alignItems: 'center',
  height:"90vh"
}