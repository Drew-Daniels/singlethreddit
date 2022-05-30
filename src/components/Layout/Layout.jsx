import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Main from '../Layout/Main';
import Sidebar from '../Layout/Sidebar';
import { styled } from '@mui/material/styles';

export default function Layout(props) {

    const { mainComponent, sidebarComponent, bannerURL } = props;

    const StyledImage = styled('img')`
        height: auto;
        width: 100%;
        object-fit: cover;
    `

    return (
        <>
            {bannerURL && 
                <Box sx={{ display: 'flex', height: '10vh' }}>
                    <StyledImage src={bannerURL} />
                </Box>
            }
            <Grid container spacing={2} sx={{ marginTop: '1rem'}}>
                <Grid item md={2}/>
                <Grid item xs={12} sm={9} md={5}>
                    <Main children={mainComponent} />
                </Grid>
                <Grid item sm={0} md={3}>
                    <Sidebar children={sidebarComponent}/>
                </Grid>
                <Grid item md={2} />
            </Grid>
        </>
    )
}
