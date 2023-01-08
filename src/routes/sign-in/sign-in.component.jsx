import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'


const SignIn = () => {
    const logGoogleUser = async () => {
      // used destructuring from the object recieved
        const {user} = await signInWithGooglePopup();
        createUserDocumentFromAuth(user)
    }


  return (
    <div>
        <h1>Sign in page</h1>
        <button onClick={logGoogleUser}>
        sign in with google
        </button>
    </div>

  )
}

export default SignIn