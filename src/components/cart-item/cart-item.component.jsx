import React from 'react'
import {CartItemContainer, Image, ItemDetails, Name, Price} from './cart-item.styles.jsx'


const CartItem = ({cartItem}) => {
    const {name, quantity,imageUrl, price} = cartItem;
  return (
    <CartItemContainer>
        <Image src={imageUrl} alt={`${name}`}/>
        <ItemDetails>
          <Name>{name}</Name>
          <Price>{quantity} x ₦{price}</Price>
        </ItemDetails>
       
    </CartItemContainer>
  );
}

export default CartItem