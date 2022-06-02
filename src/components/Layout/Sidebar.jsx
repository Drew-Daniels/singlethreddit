import Container from '@mui/material/Container';

export default function Sidebar(props) {

    const { children } = props;

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 0, height: '100%' }}>{children}</Container>
    )
}