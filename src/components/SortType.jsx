import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export default function SortType(props) {

    const { numSorts, sortDescription, SortIcon } = props;

    return (
        <Grid item xs={12 / numSorts} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button>
                <SortIcon sx={{ marginRight: '.25rem' }} />
                <span>{sortDescription}</span>
            </Button>
        </Grid>
    )
}