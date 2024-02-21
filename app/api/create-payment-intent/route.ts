import { getCurrentUser } from '@/actions/getCurrentUser'
import { CartProductType } from '@/app/product/[productId]/ProductDetails'
import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'


const calculateOrdersAmout = (item: CartProductType[]) => {
    const totalPrice = item.reduce((acc, item) => {
        const iteamTotal = item.price * item.quantity
        return acc + iteamTotal
    }, 0)
    return totalPrice
}

export async function POST(request: Request) {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 })
    }
    const body = await request.json()
    const { items, payment_intent_id } = body
    const total = calculateOrdersAmout(items) * 100000
    const orderData = {
        user: { connect: { id: currentUser.id } },
        amount: total,
        currency: "VND",
        status: "Đang chờ thanh toán",
        deliveryStatus: "Đang chờ vận chuyển",
        paymentIntentId: payment_intent_id,
        products: items,
    }
    if (payment_intent_id) {
        //update order
    } else {
        // create the intent
        // create the order
    }
}