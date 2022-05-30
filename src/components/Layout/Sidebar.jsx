import Container from '@mui/material/Container';
import TopGroups from '../TopGroups';

export default function Sidebar(props) {

    const { children } = props;

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 0 }}>{children}</Container>
    )
}