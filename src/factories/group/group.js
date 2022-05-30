import { getGroupAvatarDownloadURL, getGroupBannerDownloadURL } from '../../db/groups/groups';
import { Timestamp } from 'firebase/firestore';
/**
 * Factory function that returns a Group object
 * @param {string} baseName
 * @param {string} displayName
 * @param {string} description
 * @param {integer} timeCreated
 * @param {array} members
 * @returns validated [Group object]
 */
const Group = ({
    baseName,
    displayName,
    description,
    timeCreated=Timestamp.now(),
    members=[]
    } = {}) => {
    // run checks here
    // REQUIRED
    if (!validBaseName(baseName)) { throw new Error('"baseName" is required and must be a non-blank string') };
    if (!validDisplyName(displayName)) { throw new Error('"displayName" is required and must be a non-blank string') };
    if (!validDescription(description)) { throw new Error('"description" is required and must be a non-blank string')};
    // OPTIONAL
    if (!validTimestamp(timeCreated)) { throw new Error(`"timeCreated" must be provided and of a Firebase Firestore "Timestamp" data type`)};
    if (!validMembers(members)) { throw new Error('"members" must be an array') };
    // return object after validation
    return (
        {
            baseName,
            displayName,
            description,
            timeCreated,
            members,
            async getAvatarURL() {
                return getGroupAvatarDownloadURL(baseName);
            },
            async getBannerURL() {
                return getGroupBannerDownloadURL(baseName);
            }
        }
    )

    function validBaseName(baseName) {
        return (baseName && typeof baseName === 'string');
    };
    function validDisplyName(displayName) {
        return (displayName && typeof displayName === 'string');
    };
    function validDescription(description) {
        return (description && typeof description === 'string');
    };
    function validTimestamp(timeCreated) {
        return (timeCreated instanceof Timestamp);
    };
    function validMembers(members) {
        return (Array.isArray(members));
    };
}

export default Group;
