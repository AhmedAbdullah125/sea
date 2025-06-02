// components/Breadcrumbs.js
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Breadcrumbs({ items }) {
  return (
    <nav className="flex text-xs font-bold" aria-label="Breadcrumb">
      <ol className="flex items-center">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center  text-main-blue ">
              {index !== 0 && (
                <ChevronLeft className="w-4 h-4 mx-1 " />
              )}
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className={`hover:underline  ${index===0?"text-black":""}`}
                >
                  {item.label}
                </Link>
              ) : (
                  <span >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
