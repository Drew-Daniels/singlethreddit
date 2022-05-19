import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Sidebar from '../components/Sidebar';
import Rules from '../components/Rules/Rules';

export default function SubmitPostPage(props) {

    return (
        // <Container maxWidth={false}>
            
        //     <Sidebar>
        //         <Rules />
        //     </Sidebar>
        // </Container>
        <Grid container spacing={2} sx={{ marginTop: '1rem'}}>
            <Grid item md={2}/>
            <Grid item xs={12} sm={9} md={5}>
                
            </Grid>
            <Grid item sm={0} md={3}>
                <Sidebar />
            </Grid>
            <Grid item md={2} />
        </Grid>
    )
}
