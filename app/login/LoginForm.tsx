"use client"

import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { SafeUser } from "@/types";

interface LoginFormProps {
    currentUser: SafeUser | null
}

const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {
    const [isLoading, setIsloading] = useState(false)
    const router = useRouter()
    useEffect(() => {
        if (currentUser) {
            router.push('/')
            router.refresh
        }
    }, [])
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onsubmit: SubmitHandler<FieldValues> = (data) => {
        setIsloading(true)
        signIn('credentials', {
            ...data,
            redirect: false,
        }).then((callback) => {
            setIsloading(false)
            if (callback?.ok) {
                router.push("/cart");
                router.refresh();
                toast.success('Đăng nhập thành công');
            };
            if (callback?.error) {
                toast.error(callback.error)
            };
        })

    }
    if (currentUser) {
        return (
            <p className="text-center">Đang chuyển hướng</p>
        )
    }
    return (
        <>
            <Heading title="Đăng nhập L&D Store" />
            <Button outline label="Tiếp tục với Google" icon={AiOutlineGoogle} onClick={() => { signIn('google') }} />
            <hr className="bg-slate-300 w-full h-[1px]" />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Mật khẩu"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="password"
            />
            <Button label={isLoading ? "Loading" : "Đăng Nhập"} onClick={handleSubmit(onsubmit)} />
            <p className="text-sm">
                Bạn chưa có có tài khoản ? {" "}
                <Link href={"/register"} className="underline">
                    Đăng ký
                </Link>
            </p>
        </>
    );
}

export default LoginForm;