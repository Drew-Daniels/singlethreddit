import {Box} from '@mui/system'

export default function NotFoundPage(props) {

    return (
        <main>
            <Box display='flex' flexGrow={1} justifyContent={'center'}>
                <h1>Err... that page was not found</h1>
            </Box>
        </main>
    )
}
