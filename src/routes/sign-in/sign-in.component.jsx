
import { 
  signInWithGooglePopup,
  signInWithGoogleRedirect,
   createUserDocumentFromAuth,
    } from '../../utils/firebase/firebase.utils'

    import SignUpForm from '../../components/sign-up-form/sign-up-form.component';


const SignIn = () => {
  // //second argument [] tells useEffect to call this function only once 
  // useEffect(async () => {
  //   // get me the response for the redirect(signInWithGoogleRedirect) that just happened based on the auth
  //   //auth track all authentication state 
  //   const response = await getRedirectResult(auth);
  //   if (response){
  //     const userDocRef = await createUserDocumentFromAuth(response.user)
  //   }
  // }, [])

    const logGoogleUser = async () => {
      // used destructuring from the object recieved
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        
        
    }




  return (
    <div>
        <h1>Sign in page</h1>
        <button onClick={logGoogleUser}>
        sign in with google
        </button>
        <SignUpForm />
    </div>

  )
}

export default SignIn