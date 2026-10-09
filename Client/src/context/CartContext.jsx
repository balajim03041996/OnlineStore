import { createContext, useContext, useState, useEffect } from "react";


// build in method to use CartContext object as context object 
const CartContext = createContext(null);
// received children here so, they can acess ther belo defined methods 
export const CartProvider = ({ children }) => {
    //[ {product: iPhone, quantity: 2}, {product: Samsung, quantity: 1} ]
    const [items, setItems] = useState(() => {
        const saved = localStorage.getItem("cart");// read saved cart
        return saved ? JSON.parse(saved) : [];
    });
    // to save last items data to prevent loosiing data in refresh , saving in local storage 
    useEffect(()=>{
        localStorage.setItem("cart", JSON.stringify(items));
    },[items]);
    //methods to  add item , if already threse jus add count 
    const addToCart = (product) => {
        setItems((prev) => {
            const existing = prev.find((x) => x.product.id === product.id);
            if (existing) {
                //console.debug(existing);
                return prev.map((x) => x.product.id === product.id ? { ...x, quantity: x.quantity + 1 } : x);
            }
            return [...prev, { product, quantity: 1 }];
        });
    };

    // method to remove the itmems based on id 
    const removeFromCart = (productId) => {
        setItems((prev) => prev.filter((x) => x.product.id !== productId));
    };

    const decreaseQuantity = (productId) => {
        const existing = items.find((x) => x.product.id === productId);
        if (existing) {
            if (existing.quantity === 1) {
                removeFromCart(productId);
            }
            else if (existing.quantity > 1) {
                setItems((previous) => previous.map((x) => x.product.id === productId ? { ...x, quantity: x.quantity - 1 } : x));
            }
        }
    };

    const cartCount = items.reduce((sum, x) => sum + x.quantity, 0);// recalculate the total list count 
    const cartTotal = items.reduce((sum, x) => sum + x.quantity * x.product.price, 0);
    return (

        <CartContext.Provider value={{ items, addToCart, removeFromCart, cartCount, decreaseQuantity, cartTotal }}>{/*// this component will return a context object , we can include or wrap where we need to use inside */}
            {children}
        </CartContext.Provider>
    );
};
/*// use cart object is method to usecontext of CartContext => items, addto cart method, remove card method and total count*/
export const useCart = () => useContext(CartContext);
