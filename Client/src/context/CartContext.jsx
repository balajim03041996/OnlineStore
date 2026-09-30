import { createContext, useContext, useState } from "react";


// build in method to use CartContext object as context object 
const CartContext = createContext(null);
// received children here so, they can acess ther belo defined methods 
export const CartProvider = ({ children }) => { 
    //[ {product: iPhone, quantity: 2}, {product: Samsung, quantity: 1} ]
    const [items, setItems] = useState([]);
//methods to  add item , if already threse jus add count 
    const addToCart = (product) => { 
        setItems((prev) => {
            const existing = prev.find((x) => x.product.id === product.id);
            if (existing) {
                return prev.map((x) => x.product.id === product.id ? { ...x, quantity: x.quantity + 1 } : x);
            }
            return [...prev, { product, quantity: 1 }];
        });
    };

    // method to remove the itmems based on id 
    const removeFromCart = (productId) => {
        setItems((prev) => prev.filter((x) => x.product.id !== productId));
    };

    const cartCount = items.reduce((sum, x) => sum + x.quantity, 0);// recalculate the total list count 
    return (

        <CartContext.Provider value={{ items, addToCart, removeFromCart, cartCount }}>{/*// this component will return a context object , we can include or wrap where we need to use inside */}
            {children}
        </CartContext.Provider>
    );
};
/*// use cart object is method to usecontext of CartContext => items, addto cart method, remove card method and total count*/
export const useCart = () => useContext(CartContext);
