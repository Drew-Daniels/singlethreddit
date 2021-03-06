import { getGroupAvatarDownloadURL, getGroupBannerDownloadURL } from '../../db/groups/groups';
import { Timestamp } from 'firebase/firestore';
/**
 * Factory function that returns a Group object
 * @param {string} baseName
 * @param {string} displayName
 * @param {string} description
 * @param {Timestamp} timeCreated
 * @param {array} members
 * @param {array} rules
 * @returns validated [Group object]
 */
const Group = ({
    baseName,
    displayName,
    description,
    timeCreated=Timestamp.now(),
    members=[],
    rules=[]
    } = {}) => {
    // run checks here
    // REQUIRED
    if (!validBaseName(baseName)) { throw new Error('"baseName" is required and must be a non-blank string') };
    if (!validDisplayName(displayName)) { throw new Error('"displayName" is required and must be a non-blank string') };
    if (!validDescription(description)) { throw new Error('"description" is required and must be a non-blank string')};
    // OPTIONAL
    if (!validTimestamp(timeCreated)) { throw new Error(`"timeCreated" must be provided and of a Firebase Firestore "Timestamp" data type`)};
    if (!validMembers(members)) { throw new Error('"members" must be an array') };
    if (!validRules(rules)) { throw new Error('"rules" must be an array') };
    // return object after validation
    return (
        {
            baseName,
            displayName,
            description,
            timeCreated,
            members,
            rules,
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
    }
    function validDisplayName(displayName) {
        return (displayName && typeof displayName === 'string');
    }
    function validDescription(description) {
        return (description && typeof description === 'string');
    }
    function validTimestamp(timeCreated) {
        return (timeCreated instanceof Timestamp);
    }
    function validMembers(members) {
        return (Array.isArray(members));
    }
    function validRules(rules) {
        return (Array.isArray(rules));
    }
}

export default Group;
