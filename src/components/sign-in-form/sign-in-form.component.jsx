import { useState } from "react"


import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"
import {  createUserDocumentFromAuth,
     signInWithGooglePopup, 
     signInAuthUserWithEmailAndPassword
    } from "../../utils/firebase/firebase.utils" 

import './sign-in-form.styles.scss'
const defaultFormFields = {
    email: '',
    password: '',
}



const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password} = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        // used destructuring from the object recieved
          const {user} = await signInWithGooglePopup();
         await createUserDocumentFromAuth(user);
          
          
      }

    const handleSubmit = async (event) => {
        event.preventDefault();



        try{
            const response = await signInAuthUserWithEmailAndPassword(email, password)
            console.log(response)
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
    <div className="sign-up-container">
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

            <div className="buttons-container">
                <Button type="submit">Sign In</Button>
                <Button type='button' buttonType='google' onClick={signInWithGoogle}>
                    Google sign In
                </Button>
            </div>
            
        </form>
    </div>
  )
}

export default SignInForm