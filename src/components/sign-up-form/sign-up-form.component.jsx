import { useState,useContext } from "react"


import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils" 


import './sign-up-form.styles.scss'
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}



const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {displayName, email, password, confirmPassword} = formFields;


   

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            alert("passwords do not match");
            return;
        }

        try{
            //user sign up
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user,{displayName});
            //setCurrentUser(user);
            resetFormFields();
        } catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('cannot create user, email already in use')
            }else {
                console.log('user created encounterd an error', error)
            } 
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    
  return (
    <div className="sign-up-container">
        <h2>Don't have an account?</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={handleSubmit}>
            
            <FormInput type="text"
            label ="Display Name"
             required name="displayName"
              value={displayName}
               onChange={handleChange}/>

            
            <FormInput 
            label ="Email"
             type="email" 
             required name="email"
              value={email}
               onChange={handleChange}/>

            <FormInput 
            label ="Password"
            type="password"
             required name="password" 
             value={password} 
             onChange={handleChange}/>

            
            <FormInput 
            label ="Confirm Password" 
            type="password"  
            required 
            name="confirmPassword" 
            value={confirmPassword} 
            onChange={handleChange}/>

            <Button type="submit">Sign Up</Button>
        </form>
    </div>
  )
}

export default SignUpForm