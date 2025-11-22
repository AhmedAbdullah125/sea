import React from "react";

const HotelsPagination = ({ data, setPage }) => {
  const current = data?.current_page || 1;
  const last = data?.last_page || 1;

  // Helper: generate visible pages around current page
  const getVisiblePages = () => {
    if (last <= 5) return [...Array(last)].map((_, i) => i + 1);

    if (current <= 3) return [1, 2, 3, 4, "...", last];
    if (current >= last - 2) return [1, "...", last - 3, last - 2, last - 1, last];

    return [1, "...", current - 1, current, current + 1, "...", last];
  };

  const visible = getVisiblePages();

  return (
    <div className="flex items-center gap-2 justify-center py-14">
      {/* Prev Button */}
      <button
        disabled={current === 1}
        onClick={() => {
          if (current > 1) setPage(current - 1);
          window.scrollTo(0, 0);
        }}
        className={`w-10 h-10 flex items-center justify-center rounded-full 
        bg-gray-100 hover:bg-gray-200 disabled:opacity-40`}
      >
        ‹
      </button>

      {/* Page Numbers */}
      {visible.map((page, index) =>
        page === "…" ? (
          <span key={index} className="px-2">...</span>
        ) : (
          <button
            key={index}
            onClick={() => {
              setPage(page);
              window.scrollTo(0, 0);
            }}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition
              ${page === current
                ? "bg-main-purple text-white shadow"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}
          >
            {page}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        disabled={current === last}
        onClick={() => {
          if (current < last) setPage(current + 1);
          window.scrollTo(0, 0);
        }}
        className={`w-10 h-10 flex items-center justify-center rounded-full 
        bg-gray-100 hover:bg-gray-200 disabled:opacity-40`}
      >
        ›
      </button>
    </div>
  );
};

export default HotelsPagination;
