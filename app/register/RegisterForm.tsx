"use client"

import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";

interface RegisterFormProps {
    currentUser: SafeUser | null
}

const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
    const [isLoading, setIsloading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })
    const router = useRouter()
    useEffect(() => {
        if (currentUser) {
            router.push('/')
            router.refresh
        }
    }, [])
    const onsubmit: SubmitHandler<FieldValues> = (data) => {
        setIsloading(true)
        axios.post("/api/register", data).then(() => {
            toast.success('Đăng ký thành công ^^')
            signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false
            }).then((callback) => {
                if (callback?.ok) {
                    router.push("/cart");
                    router.refresh();
                    toast.success('Đăng nhập thành công');
                };
                if (callback?.error) {
                    toast.error(callback.error)
                };
            });
        }).catch(() => toast.error("error")).finally(() => {
            setIsloading(false)
        })
    }
    if (currentUser) {
        return (
            <p className="text-center">Đang chuyển hướng</p>
        )
    }
    return (
        <>
            <Heading title="Đăng ký L&D Store" />
            <Button outline label="Đăng ký với Google" icon={AiOutlineGoogle} onClick={() => { signIn('google') }} />
            <hr className="bg-slate-300 w-full h-[1px]" />
            <Input
                id="name"
                label="Tên người dùng"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
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
            <Button label={isLoading ? "Loading" : "Đăng ký"} onClick={handleSubmit(onsubmit)} />
            <p className="text-sm">
                Bạn đã có tài khoản ? {" "}
                <Link href={"/login"} className="underline">
                    Đăng nhập
                </Link>
            </p>
        </>
    );
}

export default RegisterForm;