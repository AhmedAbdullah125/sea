
import { useEffect, useState } from "react";

const phrases = ["دلل نفسك مع سي واستمتع بالخصومات.", "سي تهتم فيك وتقدملك خصومات.", "مع سي تفرق."];

export default function RotatingTitle() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // fade out

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % phrases.length);
        setFade(true); // fade in
      }, 1000);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <h2
      className={`section-title transition-all duration-500 ${
        fade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
      }`}
    >
      {phrases[index]}
    </h2>
  );
}
