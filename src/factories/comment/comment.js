/**
 * 
 * @param {string} user - userEmail 
 * @param {string} group - group base name
 * @param {string} body - comment text here
 * @param {integer} numUpvotes 
 * @param {integer} numDownvotes 
 * @param {string} title - if post will not be undefined, otherwise leave blank
 * @param {*} idParent
 * 'idParent' NOTES:
 * if null, this should be rendered in the DOM as a POST
 * if NOT null, this should be rendered in the DOM as a COMMENT
 * if the parent id is the id of a comment that themselves has a null parent, this should be rendered as the first comment in a potential thread of comments
 * if the parent id is the id of a comment that 
 * 'id' on the Comment will be automatically generated from Firebase
 * @returns [Comment object]
 */
const Comment = (userEmail, group, body, numUpvotes, numDownvotes, title=undefined, idParent=undefined) => ({
    userEmail,
    group,
    title,
    body,
    numUpvotes,
    numDownvotes,
    idParent,
    dateTimeCreated: Date.now(),
    isPost() {
        return idParent == null;
    },
    getKarma() {
        return numUpvotes - numDownvotes;
    }
});

export default Comment;