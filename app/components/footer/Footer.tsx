import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { MdFacebook } from "react-icons/md"
import {
    AiFillTwitterCircle,
    AiFillInstagram,
    AiFillYoutube
} from "react-icons/ai"
const Footer = () => {
    const categoryList = [
        {
            name: "Giày Nam",
            url: "#"
        },
        {
            name: "Giày Nữ",
            url: "#"
        },
        {
            name: "Giày Trẻ Em",
            url: "#"
        }
    ];
    const customerServiceList = [
        {
            name: "Liên Hệ Với Chúng Tôi",
            url: "#"
        },
        {
            name: "Chính Sách Vận Chuyển",
            url: "#"
        },
        {
            name: "Trả Hàng & Đổi Hàng",
            url: "#"
        },
        {
            name: "FAQs",
            url: "#"
        }
    ]
    return (
        <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
            <Container>
                <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
                    <FooterList>
                        <h3 className="text-base font-bold mb-2"> Danh Mục Sản Phẩm </h3>
                        {categoryList.map((itemCategory) =>
                        (
                            <Link href={itemCategory.url}>
                                {itemCategory.name}
                            </Link>
                        )
                        )}
                    </FooterList>
                    <FooterList>
                        <h3 className="text-base font-bold mb-2">Chăm Sóc Khánh Hàng</h3>
                        {customerServiceList.map((itemService) =>
                        (
                            <Link href={itemService.url}>
                                {itemService.name}
                            </Link>
                        )
                        )}
                    </FooterList>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-base font-bold mb-2">Giới Thiệu</h3>
                        <p>
                            Đây là sản phẩm website được lên ý tưởng và thực hiện
                            sinh viên: Trần Văn Đức lớp LTBK-2021.
                        </p>
                        <p>&copy; {new Date().getFullYear()} L&D Shop. Đã đăng ký bản quyền.</p>
                    </div>
                    <FooterList>
                        <h3 className="text-base font-bold mb-2">Mạng Xã Hội</h3>
                        <div className="flex gap-2">
                            <Link href="#">
                                <MdFacebook size={24}></MdFacebook>
                            </Link>
                            <Link href="#">
                                <AiFillInstagram size={24}></AiFillInstagram>
                            </Link>
                            <Link href="#">
                                <AiFillTwitterCircle size={24}></AiFillTwitterCircle>
                            </Link>
                            <Link href="#">
                                <AiFillYoutube size={24}></AiFillYoutube>
                            </Link>
                        </div>
                    </FooterList>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;