import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { useGetReviewsData } from "./useGetReviewsData";
import { Star } from "lucide-react";
import { GoArrowUpLeft } from "react-icons/go";

export default function CustomerReviewsSection() {
    const { data, isLoading } = useGetReviewsData();
    const reviews = data?.data ?? [];

    // Split into two rows
    const mid = Math.ceil(reviews.length / 2);
    const firstRow = reviews.slice(0, mid);
    const secondRow = reviews.slice(mid);

    if (isLoading) return null;

    return (
        <section dir="rtl" className="relative w-full overflow-hidden py-16">
            {/* Section header */}
            <div className="text-center mb-10">
                <p className="text-main-blue mb-9">آراء العملاء ؟</p>
                <h2 className="text-3xl md:text-4xl font-bold text-main-blue tracking-tight">
                    ماذا يقول عملاؤنا عنا !
                </h2>
            </div>

            <div className="relative flex w-full flex-col items-center justify-center">
                {/* Row 1 */}
                <Marquee pauseOnHover className="[--duration:22s] [--gap:2.5rem]">
                    {firstRow.map((r) => (
                        <ReviewCard key={r.id} review={r} />
                    ))}
                </Marquee>

                {/* Row 2 (reverse) */}
                <Marquee reverse pauseOnHover className="[--duration:22s] [--gap:2.5rem] mt-6">
                    {secondRow.map((r) => (
                        <ReviewCard key={r.id} review={r} />
                    ))}
                </Marquee>

                {/* Fades on edges */}
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-white to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-white to-transparent" />
            </div>
        </section>
    );
}

/* ---------- Card ---------- */

function ReviewCard({ review }) {
    const {
        image,
        name,
        description,
        rate = 5,
        type,
        link,
    } = review;

    const role = type || "مسافر";

    return (
        <figure
            className={cn(
                "relative w-[420px] max-w-[72vw] h-full overflow-hidden rounded-[28px]",
                "bg-[#F5F5F5] hover:shadow-[0_6px_30px_rgba(2,6,23,0.06)]",
                "px-4 py-4"
            )}
        >
            {/* Decorative quotes*/}
            {/* <QuoteMark position="right" />
            <QuoteMark position="left" />  */}

            {/* Body */}
            <blockquote className="mx-auto text-justify leading-8 md:leading-9 text-base md:text-lg line-clamp-[4]">
                <div className="flex items-center mb-4 justify-between gap-2 ">
                    <span className="absolute top-6 right-6 text-main-blue text-7xl opacity-80 select-none">"</span><br />
                    {
                        link &&
                        <div className={`size-10  bg-main-blue  !text-white  text-xs font-semibold flex items-center justify-center rounded-full  hover:bg-main-purple transition-all duration-300`}>
                            <GoArrowUpLeft className="cursor-pointer" size={20} />
                        </div>
                    }
                </div>
                {description}
            </blockquote>
            {
                link &&
                <span className="text-main-blue cursor-pointer mt-2">قراءة المزيد</span>
            }

            {/* Footer: rating + user */}
            <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img
                        src={image}
                        alt={name}
                        className="h-10 w-10 rounded-full object-cover border border-slate-200"
                    />
                    <div className="text-right">
                        <div className="font-semibold text-slate-900">{name}</div>
                        <div className="text-xs text-slate-500">{role}</div>
                    </div>
                </div>
                <Rating rate={rate} />
            </div>

            {/* Click to open original review (optional) */}
            {link && (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0"
                    aria-label="فتح المراجعة في صفحة جديدة"
                />
            )}
        </figure>
    );
}

function Rating({ rate = 5 }) {
    const rounded = Math.round(rate);
    return (
        <div className="flex items-center gap-2 text-slate-700">
            <span className="text-sm font-bold">{Number(rate).toFixed(1)}</span>
            <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        className={cn("h-4 w-4", i < rounded ? "text-amber-400" : "text-slate-300")}
                        fill="currentColor"
                    />
                ))}
            </div>
        </div>
    );
}

function QuoteMark({ position }) {
    const base =
        "absolute top-6 text-[#1E88E5] opacity-80 select-none";
    return position === "right" ? (
        <div className="flex items-center gap-2">
            <svg
                viewBox="0 0 24 24"
                className={cn(base, "right-6 h-7 w-7 rotate-0")}
                fill="currentColor"
                aria-hidden
            >
                <path d="M7.5 5C4.46 5 2 7.46 2 10.5S4.46 16 7.5 16c.79 0 1.54-.17 2.21-.49C9.1 19.12 6.72 21 3.5 21c-.28 0-.5.22-.5.5S3.22 22 3.5 22c4.14 0 7.5-3.36 7.5-7.5V10c0-2.76-2.24-5-5-5z" />
            </svg>
            <svg
                viewBox="0 0 24 24"
                className={cn(base, "right-6 h-7 w-7 rotate-0")}
                fill="currentColor"
                aria-hidden
            >
                <path d="M7.5 5C4.46 5 2 7.46 2 10.5S4.46 16 7.5 16c.79 0 1.54-.17 2.21-.49C9.1 19.12 6.72 21 3.5 21c-.28 0-.5.22-.5.5S3.22 22 3.5 22c4.14 0 7.5-3.36 7.5-7.5V10c0-2.76-2.24-5-5-5z" />
            </svg>
        </div>
    ) : (
        <div className="flex items-center gap-2">
            <svg
                viewBox="0 0 24 24"
                className={cn(base, "left-6 h-7 w-7 rotate-180")}
                fill="currentColor"
                aria-hidden
            >
                <path d="M7.5 5C4.46 5 2 7.46 2 10.5S4.46 16 7.5 16c.79 0 1.54-.17 2.21-.49C9.1 19.12 6.72 21 3.5 21c-.28 0-.5.22-.5.5S3.22 22 3.5 22c4.14 0 7.5-3.36 7.5-7.5V10c0-2.76-2.24-5-5-5z" />
            </svg>
            <svg
                viewBox="0 0 24 24"
                className={cn(base, "left-6 h-7 w-7 rotate-180")}
                fill="currentColor"
                aria-hidden
            >
                <path d="M7.5 5C4.46 5 2 7.46 2 10.5S4.46 16 7.5 16c.79 0 1.54-.17 2.21-.49C9.1 19.12 6.72 21 3.5 21c-.28 0-.5.22-.5.5S3.22 22 3.5 22c4.14 0 7.5-3.36 7.5-7.5V10c0-2.76-2.24-5-5-5z" />
            </svg>
        </div>
    );
}
