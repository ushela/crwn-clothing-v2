import { initializeApp } from 'firebase/app'
import {getAuth,
        signInWithRedirect,
        signInWithPopup,
        GoogleAuthProvider} from 'firebase/auth'


import {getFirestore,
        doc,
        getDoc,
        setDoc
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

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  })
 
export const auth = getAuth();
export const signInWithGooglePopup  = () => signInWithPopup(auth, provider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    // database,users and an identifier which is a unique ID
    const userDocRef = doc(db, 'users',userAuth.uid)
    console.log(userDocRef)

    // getting the user data for userDocRef
    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot)
    console.log(userSnapshot.exists());


    // if user snapshot doesnt exist(!userSnapshot .exist())
    if (!userSnapshot.exists()){
        const {displayName,email } = userAuth;
        const createdAt =new Date();

        try{
            //create/set the document with the data in the collection

            await setDoc(userDocRef, {
                displayName,
                    email,
                        createdAt
        });
    }catch(error){
        console.log('error creating the user', error.message);
        }
    }

 

    // if user data exists

    
    //if user data does no exist
    return userDocRef;

    // return userDocRef


}