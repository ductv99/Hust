"use client"

import { CartProductType } from "@/app/product/[productId]/ProductDetails";

interface SetSizeProps {
    cartProduct: CartProductType,
    sizes: number[]
    handleSizeSelected: (value: number) => void
}
const SetSize: React.FC<SetSizeProps> = (
    {
        cartProduct,
        sizes,
        handleSizeSelected
    }
) => {
    return (
        <div>
            <div className="flex gap-4 items-center">
                <span className="font-semibold">Size:</span>
                <div className="flex gap-1">
                    {sizes.map((size, index) => {
                        // console.log("size map", size)
                        // console.log("size product", cartProduct)
                        return (
                            <div key={index}
                                onClick={() => handleSizeSelected(size)}
                                className={`h-7 w-7 rounded-md border-green-500 flex items-center justify-center 
                                 ${cartProduct.size == size ? 'border-[1.5px]' : "border-none"}
                               `}>
                                <div className="h-6 w-6 flex items-center justify-center rounded-md border-[1.2px] border-slate-300 cursor-pointer">
                                    {size}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default SetSize;

