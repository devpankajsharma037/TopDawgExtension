import React from 'react'
import Logo from './Logo'
import style  from '../utils/style'
import Grid from '@mui/material/Grid2';

export default function Header() {
    const {popupLogoGrid} = style 
    return (
        <Grid container component={"header"}>
            <Grid size={12} sx={popupLogoGrid}>
                <Logo/>
            </Grid>
        </Grid>
    )
}
