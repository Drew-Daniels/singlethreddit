import Grid from '@mui/material/Grid';
import SortType from './SortType';
import {default as MostRecentIcon} from '@mui/icons-material/AccessTime';
import {default as HotIcon} from '@mui/icons-material/Whatshot';

export default function SortMenu(props) {

    const { handleSortHot, handleSortMostRecent } = props;

    return (
        <Grid container sx={{ border: '1px solid green', marginBottom: '1rem' }}>
            <SortType sortDescription='Hot' SortIcon={HotIcon} numSorts={2} handleSort={handleSortHot} />
            <SortType sortDescription='Most Recent' SortIcon={MostRecentIcon} numSorts={2} handleSort={handleSortMostRecent} />
        </Grid>
    )
}