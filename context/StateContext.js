import React,{createContext,useContext,useEffect,useState} from 'react';
import { toast } from 'react-hot-toast';


const Context = createContext();

export const StateContext = ({ children }) => {

    const [showCart, setShowCart] = useState(false);
    const [cartItems,setCartItems] = useState([]);
    // we always do we know what items do we have in our cart
    const [totalPrice,setTotalPrice] = useState(0);
    const [totalQuantities,setTotalQuantities] = useState(0);
    const [qty,setQty] = useState(1);


    let foundProduct;
    let index;


    const onAdd=(product,quantity)=>{
        const checkProductInCart=cartItems.find((item)=>item._id===product._id);
        setTotalPrice((prevTotalPrice)=> parseFloat(( prevTotalPrice + (product.price * quantity)).toFixed(2)))
        setTotalQuantities((prevTotalQuantity)=>prevTotalQuantity + quantity)
        if(checkProductInCart){
            const updateCartItems= cartItems.map((cartProduct)=>{
                if(cartProduct._id === product._id) return{
                    ...cartProduct,
                    quantity:cartProduct.quantity+quantity
                }
            })
            setCartItems(updateCartItems)
        }else{
            product.quantity = quantity;
            
            setCartItems([...cartItems,{ ...product}])
        }
        toast.success(`${qty} ${product.name} added to the cart`)
    }

    const removeCartItem= (product) => {
        foundProduct = cartItems.find((item)=>item._id === product._id);
        const newCartItems = cartItems.filter((item)=> item._id !== product._id);
        setTotalPrice((prevTotalPrice) =>  parseFloat((prevTotalPrice - (foundProduct.price*product.quantity)).toFixed(2)))
        setTotalQuantities((prevTotalQuantity)=>prevTotalQuantity-foundProduct.quantity);
        setCartItems(newCartItems)
    }

    const toggleCartItemQuantity=(id,value)=>{
        foundProduct = cartItems.find((item)=>item._id === id);
        index = cartItems.findIndex((product)=> product._id === id);
        const newCartItems = cartItems.filter((item)=> item._id !== id);


        if(value === 'inc'){
            setCartItems([...newCartItems, {...foundProduct, quantity:foundProduct.quantity+1}])
            setTotalPrice((prevTotalPrice) => parseFloat((prevTotalPrice + foundProduct.price).toFixed(2)) )
            setTotalQuantities((prevTotalQuantity)=>prevTotalQuantity+1)

        }else if(value === 'dec'){
            if(foundProduct.quantity>1){
                setCartItems([...newCartItems, {...foundProduct, quantity:foundProduct.quantity-1}])
                setTotalPrice((prevTotalPrice) =>  parseFloat((prevTotalPrice - foundProduct.price).toFixed(2)))
                setTotalQuantities((prevTotalQuantity)=>prevTotalQuantity-1)
            }
        }

    }

    const incQty= () => {
        setQty((prevQty)=>
            prevQty + 1
        );
    }
    const decQty= ()=>{
        setQty((prevQty)=>{
            if(prevQty-1 < 1){
                return 1;
            }else{
                return prevQty - 1;
            }
        });
    }
  return (
    <Context.Provider
        value={{
            showCart,
            setShowCart,
            cartItems,
            totalPrice,
            setCartItems,
            setTotalPrice,
            setTotalQuantities,
            totalQuantities,
            qty,
            incQty,
            decQty,
            onAdd,
            toggleCartItemQuantity,
            removeCartItem
        }}
        // we can access to all these in all components/go on pages>_app.js
    >
        {children}
    </Context.Provider>
  )
}

export const useStateContext=()=>useContext(Context);