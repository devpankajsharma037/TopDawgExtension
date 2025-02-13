import React, { useState } from 'react'
import { Box } from '@mui/material';
import style  from '../../utils/style'
import Grid from '@mui/material/Grid2';
import Guest from './Guest'
import LoggedIn from './LoggedIn'

export default function LayoutContent() {
  const [isloggedIn,setIsLoggedIn] = useState(false)
  const {popupMainContent} = style

  return (
    <Box component={"main"} sx={popupMainContent}> 
      {isloggedIn?<LoggedIn/>:<Guest/>}
    </Box>
  )
}
