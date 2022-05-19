import Container from '@mui/material/Container';
import TopGroups from './TopGroups';

export default function Sidebar(props) {

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', border: '1px solid blue' }}>
            <TopGroups />
        </Container>
    )
}