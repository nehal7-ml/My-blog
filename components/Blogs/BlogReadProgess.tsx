'use client'
import scrolled from "@/lib/hooks/use-scroll";
import { motion, useScroll } from "framer-motion";
import { RefObject } from "react";

function ProgressBar({ container }: { container?: RefObject<HTMLElement> }) {
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end"], layoutEffect:false });
  const scrollY = scrolled(50);

  return (<motion.div
    className={`fixed top-16 xl:top-24 left-0 h-2 w-screen bg-gradient-purple origin-left z-[100]`}
    style={{ scaleX: scrollYProgress }}
  />);
}

export default ProgressBar;