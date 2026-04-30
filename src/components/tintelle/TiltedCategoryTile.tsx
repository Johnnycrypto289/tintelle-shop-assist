import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, type SpringOptions } from "framer-motion";

interface TiltedCategoryTileProps {
  to: string;
  name: string;
  imageUrl: string | null;
  imageAlt: string;
}

const spring: SpringOptions = { damping: 28, stiffness: 90, mass: 1.4 };
const captionSpring: SpringOptions = { damping: 22, stiffness: 220, mass: 0.6 };
const ROTATE_AMPLITUDE = 10;
const SCALE_ON_HOVER = 1.06;

const useFinePointer = () => {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(mql.matches);
    update();
    mql.addEventListener?.("change", update);
    return () => mql.removeEventListener?.("change", update);
  }, []);
  return fine;
};

export const TiltedCategoryTile = ({ to, name, imageUrl, imageAlt }: TiltedCategoryTileProps) => {
  const finePointer = useFinePointer();
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useSpring(useMotionValue(0), spring);
  const rotateY = useSpring(useMotionValue(0), spring);
  const scale = useSpring(1, spring);
  const opacity = useSpring(0, captionSpring);
  const captionX = useSpring(0, captionSpring);
  const captionY = useSpring(0, captionSpring);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!finePointer || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    rotateX.set((offsetY / (rect.height / 2)) * -ROTATE_AMPLITUDE);
    rotateY.set((offsetX / (rect.width / 2)) * ROTATE_AMPLITUDE);
    captionX.set(e.clientX - rect.left + 16);
    captionY.set(e.clientY - rect.top + 16);
  };

  const handleEnter = () => {
    if (!finePointer) return;
    scale.set(SCALE_ON_HOVER);
    opacity.set(1);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    opacity.set(0);
  };

  return (
    <Link to={to} className="group flex flex-col items-center gap-3 md:gap-4 text-center">
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="relative [perspective:900px]"
      >
        <motion.div
          style={{
            rotateX: finePointer ? rotateX : 0,
            rotateY: finePointer ? rotateY : 0,
            scale: finePointer ? scale : 1,
            transformStyle: "preserve-3d",
          }}
          className="aspect-square w-24 sm:w-32 md:w-40 rounded-full overflow-hidden bg-cream transition-shadow duration-500 group-hover:shadow-[0_18px_40px_-18px_hsl(var(--mauve)/0.35)]"
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt}
              loading="lazy"
              className="w-full h-full object-cover"
              style={{ transform: "translateZ(30px)" }}
            />
          ) : (
            <div className="w-full h-full bg-petal" aria-hidden />
          )}
        </motion.div>

        {finePointer && (
          <motion.figcaption
            style={{ x: captionX, y: captionY, opacity }}
            className="pointer-events-none absolute top-0 left-0 z-20 hidden md:block whitespace-nowrap rounded-full border border-mauve/20 bg-cream/90 backdrop-blur-sm px-3 py-1 font-serif italic text-mauve text-sm"
          >
            Shop {name}
          </motion.figcaption>
        )}
      </div>
      <span className="font-serif text-mauve text-base md:text-lg">{name}</span>
    </Link>
  );
};
