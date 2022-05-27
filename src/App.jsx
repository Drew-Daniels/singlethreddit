import parallel from 'async/parallel';
import { auth, signIn, db, storage } from './firebase-setup';
import { query, collection, where, orderBy, onSnapshot } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage'
// import { getAllComments } from './db/comments/comments';
// import { getAllGroups } from './db/groups/groups';
import Comment from './factories/comment/comment';
import Group from './factories/group/group';
import 'firebaseui/dist/firebaseui.css'
import { useState, useEffect, useMemo, useReducer } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from 'react-router-dom';
import {ReactComponent as AppIcon} from './icons/app-icon.svg';
import Navbar from './components/Navbar';
import { GROUPS_COLLECTION_NAME, GROUP_AVATARS_STORAGE_FOLDER_NAME, COMMENTS_COLLECTION_NAME } from './constants';

/**
 * Converter function used to parse data to send to Firestore for writes and instantiating data from Firestore as Comment object.
 */
 const commentConverter = {
  toFirestore: (comment) => {
      const { 
          uid, 
          userName, 
          baseName, 
          body, 
          timeCreated,
          timeEdited,
          upvoters,
          downvoters,
          title,
          userAvatarURL,
          groupAvatarURL,
      } = comment;
      return {
          uid,
          userName,
          baseName,
          body,
          timeCreated,
          timeEdited,
          upvoters,
          downvoters,
          title,
          userAvatarURL,
          groupAvatarURL
      }
  },
  fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return Comment(data);
  }
}

const commentsRef = collection(db, COMMENTS_COLLECTION_NAME).withConverter(commentConverter);

const groupConverter = {
  toFirestore: (group) => {
      return {
          baseName: group.baseName,
          displayName: group.displayName,
          description: group.description,
          timeCreated: group.timeCreated,
          members: group.members
      }
  },
  fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return Group(data);
  }
}

const groupsRef = collection(db, GROUPS_COLLECTION_NAME).withConverter(groupConverter);
const groupAvatarsRef = ref(storage, GROUP_AVATARS_STORAGE_FOLDER_NAME);

function App() {
  const appName = 'Singlethreddit'
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [groups, setGroups] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(prevUser => user);
    });

    setCommentsListener();
    setGroupsListener();

    async function setCommentsListener() {
      const q = query(commentsRef);
      const unsubscribe = setQueryListener(q, setComments);
    };

    async function setGroupsListener() {
      const q = query(groupsRef);
      const unsubscribe = setQueryListener(q, setGroups);
    }

    function setQueryListener(query, setter) {
      const unsubscribe = onSnapshot(query, (querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push(doc.data());
        });
        setter(prev => docs);
      });
      return unsubscribe;
    }
  }, []);
    // setup();

    // // DEFINITIONS
    // async function setup() {
    //   parallel([
    //     async function loadComments(cb) {
    //       try {
    //         const cs = await getAllComments();
    //         setComments(cs);
    //         return true;
    //       }
    //       catch (err) {
    //         console.error(err);
    //         return false;
    //       }
    //     },
    //     async function loadGroups(cb) {
    //       try {
    //         const gs = await getAllGroups();
    //         setGroups(gs);
    //       }
    //       catch (err) {
    //         console.error(err);
    //       }
    //     },
    //   ], function(err) {
    //     if (err) {
    //       console.error(err);
    //     } else {
    //       setLoaded(true);
    //     }
    //   })
    // }

  function sortHot() {
    var newOrder = [...comments].sort(compareHot);
    setComments(prevOrder => newOrder);

    function compareHot(a, b) {
        return (b.getKarma()) - (a.getKarma());
    }
  }

  function sortMostRecent() {
      var newOrder = [...comments].sort(compareMostRecent);
      setComments(prevOrder => newOrder);

      function compareMostRecent(a, b) {
          return b.timeCreated - a.timeCreated;
      }
  }

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
      <Container maxWidth={false} disableGutters className="App" sx={{ minHeight: '100vh' }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar AppIcon={AppIcon} appName={appName} signIn={signIn} user={user} groups={groups} selectedGroup={selectedGroup} handleSelectGroup={setSelectedGroup} />
          <Outlet context={{ user, groups, setGroups, selectedGroup, handleSelectGroup: setSelectedGroup, comments, sortHot, sortMostRecent }} />
        </ThemeProvider>
      </Container>
  );
}

export default App;
