import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import SortType from './SortType';
import {default as MostRecentIcon} from '@mui/icons-material/AccessTime';
import {default as HotIcon} from '@mui/icons-material/Whatshot';

export default function SortMenu(props) {

    const { sortHot, sortMostRecent } = props;

    return (
        <Card>
            <Grid container sx={{ marginBottom: '1rem' }}>
                <SortType sortDescription='Hot' sortName='hot' SortIcon={HotIcon} numSorts={2} handleSort={sortHot} />
                <SortType sortDescription='Most Recent' sortName='most-recent' SortIcon={MostRecentIcon} numSorts={2} handleSort={sortMostRecent} />
            </Grid>
        </Card>
    )
}