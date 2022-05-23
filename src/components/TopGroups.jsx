import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TopGroup from './TopGroup';

export default function TopGroups(props) {

    const { groups } = props;
    const [top5Groups, setTop5Groups] = useState([]);

    useEffect(() => {
        if (!groups) { return }
        groups.sort(sortGroupsAsc);
        setTop5Groups(firstN(groups, 5));

        function sortGroupsAsc(groupA, groupB) {
            return sortGroups(true, groupA, groupB);
        }
        function sortGroups(asc, groupA, groupB) {
            const sorted = asc ? groupB.members.length - groupA.members.length : groupA.members.length - groupB.members.length;
            return sorted;
        }
    }, [groups])


    /**
     * Returns a subsection of an array up to and including N.
     * @param {array} arr 
     * @param {integer} n 
     * @returns array
     */
    function firstN(arr, n) {
        return arr.slice(0, n + 1)
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {top5Groups.map((g, i) => {
                return (
                    <TopGroup key={i} group={g} position={i} />
                )
            })}
        </Box>
    )
}