import { useState, useEffect, useContext } from 'react';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import TopGroup from './TopGroup';
import GroupAvatarsContext from '../contexts/GroupAvatarsContext';

export default function TopGroups(props) {

    const { user, groups, setGroups } = props;
    const [top5Groups, setTop5Groups] = useState([]);
    const groupAvatarURLs = useContext(GroupAvatarsContext);
    
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
        <Card sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <List>
                {top5Groups.map((g, i) => {
                    const groupAvatarURL = groupAvatarURLs[g.baseName]
                    return (
                        <div key={i}>
                            <TopGroup group={g} groupAvatarURL={groupAvatarURL} setGroups={setGroups} position={i} />
                            {(i !== top5Groups.length - 1) && <Divider />}
                        </div>
                    )
                })}
            </List>
        </Card>
    )
}