import './button.styles.scss'

/*

default button 

inverted button 

google sign in button 


*/

const BUTTON_TYPE_CLASS = {
    google: 'google-sign-in',
    inverted: 'inverted'
}

//render wateva are the children inside of the button component e.g h1,span etc
const Button = ({children, buttonType, ...otherProps}) => {
  return (
    <button className={`button-container
     ${BUTTON_TYPE_CLASS[buttonType]}`} 
    {...otherProps}>
        {children}
    </button>
  )
}

export default Button