"use client"
import { CartProductType, SelectedImgType } from "@/app/product/[productId]/ProductDetails"

interface SetColorProps {
    images: SelectedImgType[],
    cartProduct: CartProductType,
    handColorSelect: (value: SelectedImgType) => void
}
const SetColor: React.FC<SetColorProps> = ({ images, cartProduct, handColorSelect }) => {
    return (
        <div>
            <div className="flex gap-4 items-center">
                <span className="font-semibold">Màu sắc:</span>
                <div className="flex gap-1 ">
                    {images.map((image) => {
                       
                        // console.log("id", cartProduct.selectedImg.color)
                        return (
                            <div
                                key={image.color}
                                onClick={() => handColorSelect(image)}
                                className={`h-7 w-7 rounded-full border-green-500 flex items-center justify-center border-[1.5px]
                            ${cartProduct.selectedImg.color ===
                                        image.color ? 'border-[1.5px]' : "border-none"}`}>
                                <div style={{ background: image.colorCode }} className="h-5 w-5 rounded-full border-[1.2px] border-slate-300 cursor-pointer">
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default SetColor;