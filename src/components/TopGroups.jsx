import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TopGroup from './TopGroup';

export default function TopGroups(props) {

    const { groups } = props;
    const [top5Groups, setTop5Groups] = useState([]);

    useEffect(() => {
        if (!groups) { return }
        groups.sort(function sortGroups(groupA, groupB) { 
            const gANumMembers = groupA.members.length;
            const gBNumMembers = groupB.members.length;
            if (gANumMembers < gBNumMembers) {
                return -1;
            }
            if (gANumMembers < gBNumMembers) {
                return 1;
            }
            return 0;
        });
    
        setTop5Groups(firstN(groups, 5));
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
                    <TopGroup group={g} />
                )
            })}
        </Box>
    )
}