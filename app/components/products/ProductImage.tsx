"use client"

import { CartProductType, SelectedImgType } from "@/app/product/[productId]/ProductDetails";
import Image from "next/image";

interface ProductImageProps {
    cartProduct: CartProductType,
    product: any,
    handleColorSelect: (value: SelectedImgType) => void,
}

const ProductImage: React.FC<ProductImageProps> = (
    {
        cartProduct,
        product,
        handleColorSelect
    }
) => {
    // console.log("images", product.images)
    return (
        <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
            <div className="flex flex-col items-center justify-center gap-4 cursor-pointer border h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
                {product.images.map((images: SelectedImgType) => {
                    return (
                        <div key={images.color}
                            onClick={() => handleColorSelect(images)}
                            className={`relative w-[80%] aspect-square rounded border-gray-500
                        ${cartProduct.selectedImg.color ===
                                    images.color ? 'border-[1.5px]' : 'border-none'}`}
                        >
                            <Image src={images.image} alt={images.color} fill className="object-contain" />
                        </div>
                    )
                })}
            </div>
            <div className="col-span-5 relative aspect-square">
                <Image src={cartProduct.selectedImg.image} alt={cartProduct.name} fill className="object-contain w-full h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]" />
            </div>
        </div >
    );
}

export default ProductImage;