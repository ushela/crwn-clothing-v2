import {BaseButton, GoogleSignInButton, InvertedButton} from './button.styles.jsx'

/*

default button 

inverted button 

google sign in button 


*/

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted',
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => (
  //off the buttonType return the specific button i want 
  {
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,

  }[buttonType]
)

//render wateva are the children inside of the button component e.g h1,span etc
const Button = ({children, buttonType, ...otherProps}) => {
  const CustomButton = getButton(buttonType)
  return (
    <CustomButton {...otherProps}>{children}</CustomButton>
  )
}

export default Button