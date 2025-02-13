import React from 'react'
import style  from '../utils/style'
import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';

export default function Footer() {
    const {popupFooterGrid,popupFooterGridContainer,popupFooterText} = style 
    return (
        <Grid container component={"footer"}>
            <Grid size={12} sx={popupFooterGrid}>
                <Grid container sx={popupFooterGridContainer}>
                    <Grid size={1}>
                        <HelpCenterIcon/>
                    </Grid>
                    <Grid size={11}>
                        <Typography sx={popupFooterText}>
                            Please visit our help article to learn how to use the Cometly Setup Plugin.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
