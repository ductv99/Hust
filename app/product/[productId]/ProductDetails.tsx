"use client"
import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import SetSize from "@/app/components/products/SetSize";
import { useCart } from "@/hooks/useCart";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";

interface productDetailsProps {
    product: any
}
export type CartProductType = {
    id: string,
    name: string,
    description: string,
    brand: string,
    selectedImg: SelectedImgType,
    quantity: number,
    price: number,
    size: number
}
export type SelectedImgType = {
    color: string,
    colorCode: string,
    image: string,
}

const Horizontal = () => {
    return <hr className="w-[30%] my-2" />
}
const productDetails: React.FC<productDetailsProps> = ({ product }) => {
    const { handleAddProductToCart, cartProducts } = useCart();
    const [isProductInCart, setIsProductInCart] = useState(false)
    const [cartProduct, setCartProduct] = useState<CartProductType>(
        {
            id: product.id,
            name: product.name,
            description: product.description,
            brand: product.brand,
            selectedImg: { ...product.images[0] },
            quantity: 1,
            price: product.price,
            size: 0
        }
    )

    const router = useRouter()
    console.log(cartProducts)
    useEffect(() => {
        setIsProductInCart(false)
        if (cartProducts) {
            const existingIndex = cartProducts.findIndex((item) => item.id === product.id)
            if (existingIndex > -1) {
                setIsProductInCart(true)
            }
        }

    }, [cartProducts])
    const productRating =
        product.reviews.reduce((acc: number, items: any) =>
            items.rating + acc, 0) / product.reviews.length


    const handleColorSelect = useCallback((value: SelectedImgType) => {
        setCartProduct((prev) => {
            return {
                ...prev, selectedImg: value
            }
        })
    }, [cartProduct.selectedImg])

    const handleSizeSelected = useCallback((value: number) => {
        setCartProduct((prev) => {
            return {
                ...prev, size: value
            }
        })
    }, [cartProduct])

    const handleQtyIncrease = useCallback(() => {
        if (cartProduct.quantity === 99) {
            return;
        }
        setCartProduct((prev) => {
            return {
                ...prev, quantity: prev.quantity + 1
            }
        })
    }, [cartProduct])


    const handleQtyDecrease = useCallback(() => {
        if (cartProduct.quantity === 1) {
            return;
        }
        setCartProduct((prev) => {
            return {
                ...prev, quantity: prev.quantity - 1
            }
        })
    }, [cartProduct])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ProductImage
                cartProduct={cartProduct}
                product={product}
                handleColorSelect={handleColorSelect}
            />
            <div className="flex flex-col gap-1 text-slate-500 text-sm">
                <h2 className="text-3xl font-medium text-slate-700"
                >{product.name} </h2>
                <div className="flex items-center gap-2">
                    <Rating value={productRating} readOnly></Rating>
                    <div>{product.reviews.length} Lượt xem</div>
                </div>
                <Horizontal />
                <div className="text-justify">
                    {product.description}
                </div>
                <Horizontal />
                <div>
                    <span className="font-semibold">Danh mục:</span> {product.category}
                </div>
                <div>
                    <span className="font-semibold">Nhãn hiệu:</span> {product.brand}
                </div>
                <div className={product.inStock ? "text-green-500" : "text-rose-500"}>
                    {product.inStock ? "Còn hàng" : "Hết hàng"}
                </div>
                <Horizontal />
                {isProductInCart ? (<>
                    <p className="mb-2 text-stale-700 flex items-center gap-1">
                        <MdCheckCircle className="text-green-500" size={20} />
                        <span>Sản phẩm đã được thêm vào giỏ hàng</span>
                    </p>
                    <div className="max-w-[300px]">
                        <Button
                            label="Xem giỏ hàng"
                            outline
                            onClick={() => router.push("/cart")}
                        />
                    </div>
                </>) : (<>
                    <SetColor
                        cartProduct={cartProduct}
                        images={product.images}
                        handColorSelect={handleColorSelect}
                    />
                    <Horizontal />
                    <SetSize
                        cartProduct={cartProduct}
                        sizes={product.sizes}
                        handleSizeSelected={handleSizeSelected}
                    />
                    <Horizontal />
                    <SetQuantity
                        cartProduct={cartProduct}
                        handleQtyIncrease={handleQtyIncrease}
                        handleQtyDecrease={handleQtyDecrease}
                    />
                    <Horizontal />
                    <div className="max-w-[300px]">
                        <Button
                            label="Thêm vào giỏ hàng"
                            onClick={() => handleAddProductToCart(cartProduct)}
                        />
                    </div>
                </>)}

            </div>
        </div>
    );
}

export default productDetails;