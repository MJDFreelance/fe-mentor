"use client"

import {createContext, FC, ReactNode, useContext, useMemo, useState} from "react";
import data from "@/app/audiophile/data.json";

type ValueType = {
    cart: Record<string, number>;
    addToCart: (id: string) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    updateQuantity: (slug:string, quantity:number) => void;
    basketProducts?: any[];
}

const CartContext = createContext<ValueType>({
    cart: {},
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {},
    updateQuantity: () => {},
    basketProducts: []
});
export const useCart = () => useContext(CartContext);
export const CartProvider: FC<{ children?: ReactNode | undefined }> = props => {
    const [cart, setCart] = useState<Record<string, number>>({});

    const basketProducts = useMemo(() => {
        return Object.keys(cart).map((slug) => {
            const product = data.find((product) => product.slug === slug);
            return {
                ...product,
                quantity: cart[slug]
            };
        });
    }, [cart]);

    const addToCart = (id: string) => {
        setCart((prevCart) => {
            return {
                ...prevCart,
                [id]: (prevCart[id] || 0) + 1
            };
        });
    };

    const removeFromCart = (id: string) => {
        setCart((prevCart) => {
            const updatedCart = {...prevCart};
            if (updatedCart[id] === 1) {
                delete updatedCart[id];
            } else {
                updatedCart[id] -= 1;
            }
            return updatedCart;
        });
    };

    const clearCart = () => {
        setCart({});
    };

    const updateQuantity = (slug:string, quantity:number) => {
        setCart((prevCart) => {
            if (prevCart[slug]) {
                if (quantity === 0 || (quantity + prevCart[slug] <= 0)) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const {[slug]: _, ...rest} = prevCart;
                    return rest;
                }
                return {
                    ...prevCart,
                    [slug]: prevCart[slug] + quantity
                };
            }

            else if (quantity < 0) return prevCart;

            return {
                ...prevCart,
                [slug]: quantity
            };
        });
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            clearCart,
            updateQuantity,
            basketProducts
        }}>
            {props.children}
        </CartContext.Provider>
    );
};
