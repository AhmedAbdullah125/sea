import logo from '../../../public/app/footerLogo.svg'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import tiktok from '../../../public/app/tiktol.svg'
export default function TiktokHeader() {
    return (
        <div className="tiktok-header py-4 bg-white">
            <div className="container mx-auto">
                <div className="tiktok-header-content flex items-center justify-between">
                    {/* Right Side (in RTL) -> TikTok */}
                    <div className="logo-tiktok">
                        <LazyLoadImage src={tiktok} alt="TikTok" className="h-12 w-auto object-contain" />
                    </div>

                    {/* Center -> Text */}
                    <div className="tiktok-header-title text-center">
                        <h1 className="font-bold text-lg md:text-xl">
                            شــركة ســي لإدارة الوجهــــات السيـــاحية
                        </h1>
                    </div>

                    {/* Left Side (in RTL) -> SEA */}
                    <div className="logo-sea">
                        <LazyLoadImage src={logo} alt="Sea Tourism" className="h-12 w-auto object-contain" />
                    </div>
                </div>
            </div>
        </div>
    )
}

