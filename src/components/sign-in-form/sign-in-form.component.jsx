import { useState } from "react"


import FormInput from "../form-input/form-input.component"
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component"

import {  
     signInWithGooglePopup, 
     signInAuthUserWithEmailAndPassword
    } from "../../utils/firebase/firebase.utils" 
    

import {SignInContainer, ButtonsContainer} from './sign-in-form.styles.jsx'
const defaultFormFields = {
    email: '',
    password: '',
}



const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password} = formFields;



    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        // used destructuring from the object recieved
         await signInWithGooglePopup();
        
          
          
      }

    const handleSubmit = async (event) => {
        event.preventDefault();



        try{
            await signInAuthUserWithEmailAndPassword(
                email, 
                password)
        //setCurrentUser(user);
            resetFormFields();
        } catch(error){
                switch(error.code){
                    case 'auth/wrong-password' :
                        alert('incorrect password for email');
                        break;
                    case 'auth/user-not-found' :
                        alert('no user associated with the email');
                        break;
                    default:
                        console.log(error)
                }

            // if(error.code === "auth/wrong-password") {
            //     alert('incorrect password for email')
            // } else if
            //     (error.code === "auth/user-not-found"){
            //         alert('no user associated with the email')
            //     }
            console.log(error)
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    
  return (
    <SignInContainer>
        <h2>Already have an account?</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={handleSubmit}>
            
            <FormInput 
            label ="Email"
             type="email" 
             required 
             name="email"
                value={email}
               onChange={handleChange}/>

            <FormInput 
            label ="Password"
            type="password"
             required 
             name="password" 
             value={password} 
             onChange={handleChange}/>

            <ButtonsContainer>
                <Button type="submit">Sign In</Button>
                <Button 
                    type='button' 
                    buttonType={BUTTON_TYPE_CLASSES.google} 
                    onClick={signInWithGoogle}
                    >
                    Google sign In
                </Button>
            </ButtonsContainer>
            
        </form>
    </SignInContainer>
  )
}

export default SignInForm