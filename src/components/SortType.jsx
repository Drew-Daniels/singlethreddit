import { useContext } from 'react';
import SortContext from '../contexts/SortContext';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export default function SortType(props) {

    const { numSorts, sortDescription, sortName, SortIcon, handleSort } = props;
    const activeSort = useContext(SortContext);
    const color = activeSort === sortName ? '#FF4301': 'gray';
    return (
        <Grid item xs={12 / numSorts} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button onClick={handleSort} >
                <SortIcon sx={{ marginRight: '.25rem', color: color }} />
                <span>{sortDescription}</span>
            </Button>
        </Grid>
    )
}