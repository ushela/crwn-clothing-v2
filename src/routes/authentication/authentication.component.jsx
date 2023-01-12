

    import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
    import SignInForm from '../../components/sign-in-form/sign-in-form.component';
    import './authentication.styles.scss'

const Authentication = () => {
  // //second argument [] tells useEffect to call this function only once 
  // useEffect(async () => {
  //   // get me the response for the redirect(signInWithGoogleRedirect) that just happened based on the auth
  //   //auth track all authentication state 
  //   const response = await getRedirectResult(auth);
  //   if (response){
  //     const userDocRef = await createUserDocumentFromAuth(response.user)
  //   }
  // }, [])






  return (
    <div className='authentication-container'>
        <SignInForm />
        <SignUpForm />
        
    </div>

  )
}

export default Authentication