import { initializeApp } from 'firebase/app'
import {getAuth,
        signInWithRedirect,
        signInWithPopup,
        GoogleAuthProvider,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut, 
        onAuthStateChanged,
    } from 'firebase/auth'


import {getFirestore,
        doc,
        getDoc,
        setDoc,
        collection,
        writeBatch,
        query,
        getDocs
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBhHSOUVP10ORbcGQxIjQ1BCNY_uD34BOA",
    authDomain: "crwn-clothing-db-60122.firebaseapp.com",
    projectId: "crwn-clothing-db-60122",
    storageBucket: "crwn-clothing-db-60122.appspot.com",
    messagingSenderId: "150325637989",
    appId: "1:150325637989:web:011f6e3f003bdf1054a78c"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: "select_account"
  })
 
export const auth = getAuth();
export const signInWithGooglePopup  = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect  = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
    collectionKey,
     objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) =>{
        //collection ref tell the doc method which db we are using 
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object)
    });
    await batch.commit();
    console.log('done')
}


export const getCategoriesAndDocuments = async () => {
   const collectionRef = collection(db, 'categories');
   const q = query(collectionRef);

   //fetching the document snapshots
   const querySnapshot = await getDocs(q)
   //access different document snapshots from query snapshots
   //give an array of individual snapshot 

    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
       const {title, items} = docSnapshot.data();
       acc[title.toLowerCase()] = items;
       return acc;
    }, {})
   
   return categoryMap;
   
   /*
    hats{
        title: 'Hats',
        items: [
            {},
            {}        ]
    }

 */ 
}



// alternate way to add collection
// export const addCollectionAndDocuments = async (
//     collectionKey,
//      objectsToAdd,
//      field = 'title') => {
//     const collectionRef = collection(db, collectionKey);
//     const batch = writeBatch(db);

//     objectsToAdd.forEach((object) =>{
//         //collection ref tell the doc method which db we are using 
//         const docRef = doc(collectionRef, object[field].toLowerCase());
//         batch.set(docRef, object)
//     });

//     await batch.commit();
//     console.log('done')
// }




//additionalInformation is for incase we recieve displayName which is an object
export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
// security measure
    if(!userAuth) return;
    // database,users and an identifier which is a unique ID
    const userDocRef = doc(db, 'users',userAuth.uid)
  
    // getting the user data for userDocRef
    const userSnapshot = await getDoc(userDocRef)


    // if user snapshot doesnt exist(!userSnapshot .exist())
    if (!userSnapshot.exists()){
        const {displayName,email } = userAuth;
        const createdAt = new Date();

        try{
            //create/set the document with the data in the collection

            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
        })
        }catch(error){
        console.log('error creating the user', error.message);
        }
    }

 

    // if user data exists

    
    //if user data does no exist
    return userDocRef;

    // return userDocRef


}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    // security measure
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}


export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    // security measure
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser =async  () => await signOut(auth);

// callback function for wen authentication state changes e.g Sign In and Sign Out state
// an open listener to check if auth states are changing.
export const onAuthStateChangedListener = (callback) => 
onAuthStateChanged(auth, callback);