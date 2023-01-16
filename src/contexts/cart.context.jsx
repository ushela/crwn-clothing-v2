import { createContext, useEffect, useState } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  //find if cartitems contains productToAdd
  //if existing cartitem matches the one we are trying to add
const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)
  //if found increment quantity
if (existingCartItem){
  return cartItems.map((cartItem) => 
  cartItem.id === productToAdd.id ?
  {...cartItem, quantity: cartItem.quantity + 1} :
  cartItem
  )
}

  //return new array with modified cartItems/new cart item
  //wen finding a new product
  return [...cartItems,{...productToAdd, quantity: 1} ]
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
      const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity,0)
      setCartCount(newCartCount);
  },[cartItems])

  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product))
  }


  const value = { isCartOpen, setIsCartOpen,cartItems, addItemToCart,cartCount };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};