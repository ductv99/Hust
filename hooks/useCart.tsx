import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast"
type CartContextType = {
    cartTotalQty: number;
    cartTotalAmount: number,
    cartProducts: CartProductType[] | null,
    handleAddProductToCart: (product: CartProductType) => void
    handleRemoveProductFromCart: (product: CartProductType) => void
    handleCartQtyIncrease: (product: CartProductType) => void
    handleCartQtyDecrease: (product: CartProductType) => void
    handleClearCart: () => void
}
export const CartContext = createContext<CartContextType | null>(null)

interface Props {
    [propName: string]: any
}
export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0)
    const [cartTotalAmount, setCartTotalAmount] = useState(0)
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null)

    useEffect(() => {
        const cartItems: any = localStorage.getItem('ldShopCartItems')
        const cProducts: CartProductType[] | null = JSON.parse(cartItems)
        setCartProducts(cProducts)
    }, [])

    useEffect(() => {
        const getTotals = () => {
            if (cartProducts) {
                const { total, qty } = cartProducts?.reduce((acc, item) => {
                    const itemTotal = item.price * item.quantity

                    acc.total += itemTotal
                    acc.qty += item.quantity
                    return acc
                }, {
                    total: 0,
                    qty: 0
                })
                setCartTotalQty(qty)
                setCartTotalAmount(total)
            }
        }
        getTotals()
    }, [cartProducts])

    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            let updatedCart;
            if (prev) {
                updatedCart = [...prev, product]
            } else {
                updatedCart = [product]
            }
            localStorage.setItem('ldShopCartItems', JSON.stringify(updatedCart))
            return updatedCart
        })
        toast.success('Đã thêm vào giỏ hàng')
    }, [])

    const handleRemoveProductFromCart = useCallback((
        product: CartProductType
    ) => {
        if (cartProducts) {
            const filteredProducts = cartProducts.filter
                ((item) => {
                    return (item.id != product.id)
                })
            setCartProducts(filteredProducts)
            localStorage.setItem("ldShopCartItems", JSON.stringify(filteredProducts))
            toast.success('Đã xóa sản phẩm khỏi giỏ hàng')
        }
    }, [cartProducts])

    const handleCartQtyIncrease = useCallback((product: CartProductType) => {
        let updatedCart
        if (product.quantity == 99) {
            return toast.error("Xin lỗi! Đã đạt giới hạn tối đa")
        }
        if (cartProducts) {
            updatedCart = [...cartProducts]
            const existingIndex = cartProducts.findIndex((item) => item.id === product.id)
            if (existingIndex > -1) {
                updatedCart[existingIndex].quantity += 1
            }
            setCartProducts(updatedCart)
            localStorage.setItem("ldShopCartItems", JSON.stringify(updatedCart))
        }
    }, [cartProducts])

    const handleCartQtyDecrease = useCallback((product: CartProductType) => {
        let updatedCart
        if (product.quantity == 1) {
            return toast.error("Xin lỗi! Đã đạt giới hạn tối thiểu")
        }
        if (cartProducts) {
            updatedCart = [...cartProducts]
            const existingIndex = cartProducts.findIndex((item) => item.id === product.id)
            if (existingIndex > -1) {
                updatedCart[existingIndex].quantity -= 1
            }
            setCartProducts(updatedCart)
            localStorage.setItem("ldShopCartItems", JSON.stringify(updatedCart))
        }
    }, [cartProducts])


    const handleClearCart = useCallback(() => {
        setCartProducts(null)
        setCartTotalQty(0)
        localStorage.setItem("ldShopCartItems", JSON.stringify(null))
    }, [cartProducts])



    const value = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart
    }
    return <CartContext.Provider value={value} {...props} />
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === null) {
        throw new Error("useCart must be used within a CartContextProvider")
    }
    return context
}