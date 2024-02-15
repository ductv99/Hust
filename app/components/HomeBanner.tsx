
import Image from "next/image";

const HomeBanner = () => {
    return (
        <div className="relative bg-gradient-to-r from-sky-400 to-sky-600 mb-8">
            <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
                <div className="mb-0 md:mb-0 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Sale Sốc!</h1>
                    <p className="text-lg md:text-xl text-white mb-2">Mừng Xuân Giáp Thìn</p>
                    <p className="text-2xl md:text-5xl text-yellow-400 font-bold">Giảm Giá Đến 50%</p>
                </div>
                <div className="w-1/3 relative aspect-video">
                    <img src="banner.jpg"
                        className="object-contain rounded-md"
                    />
                    <Image fill src="/banner.jpg" alt="" className="w-full h-full object-contain" />
                </div>
            </div>
        </div>
    );
}
export default HomeBanner;