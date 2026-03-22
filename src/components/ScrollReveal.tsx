import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
}

const ScrollReveal = ({ children, className = "", delay = 0, direction = "up" }: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const variants = {
    up: { hidden: { opacity: 0, y: 20, filter: "blur(4px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } },
    left: { hidden: { opacity: 0, x: -20, filter: "blur(4px)" }, visible: { opacity: 1, x: 0, filter: "blur(0px)" } },
    right: { hidden: { opacity: 0, x: 20, filter: "blur(4px)" }, visible: { opacity: 1, x: 0, filter: "blur(0px)" } },
    scale: { hidden: { opacity: 0, scale: 0.95, filter: "blur(4px)" }, visible: { opacity: 1, scale: 1, filter: "blur(0px)" } },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
