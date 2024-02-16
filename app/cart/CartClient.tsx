"use client"
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/Heading";
import Button from "../components/Button";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/utils/formatPrice";


const CartClient = () => {
    const { cartProducts, handleClearCart, cartTotalAmount } = useCart()
    if (!cartProducts || cartProducts.length === 0) {
        return (
            <div className="flex flex-col items-center">
                <div className="text-2xl">Giỏ hàng của bạn trống</div>
                <div>
                    <Link href={"/"} className="text-slate flex items-center gap-1 mt-2">
                        <MdArrowBack />
                        <span>Quay trở lại mua sắm</span>
                    </Link>
                </div>
            </div>
        )
    }
    return (
        <div>
            <Heading title="Giỏ Hàng" center />
            <div className="grid grid-cols-6 text-xs gap-4 items-center mt-8">
                <div className="col-span-2 justify-self-start">Tên sản phẩm</div>
                <div className="justify-self-center">Giá tiền</div>
                <div className="justify-self-center">Size</div>
                <div className="justify-self-center">Số lượng</div>
                <div className="justify-self-end">Tổng</div>
            </div>
            <div>
                {cartProducts && cartProducts.map((item) => {
                    return (
                        <ItemContent key={item.id} item={item} />
                    )
                })}
            </div>
            <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
                <div className="w-[120px]">
                    <Button label="Xóa toàn bộ" onClick={() => { handleClearCart() }} small outline />
                </div>
                <div className="text-sm flex flex-col gap-1 items-start">
                    <div className="flex justify-between w-full text-base font-semibold">
                        <span>Tổng Tiền</span>
                        <span>{formatPrice(cartTotalAmount)}</span>
                    </div>
                    <p className="text-slate-500">Bao gồm cả phí vận chuyển</p>
                    <Button label="checkout" onClick={() => { }} />
                    <Link href={"/"} className="text-slate-500 flex items-center gap-1 mt-2">
                        <MdArrowBack />
                        <span>
                            Tiếp tục mua sắm
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CartClient;