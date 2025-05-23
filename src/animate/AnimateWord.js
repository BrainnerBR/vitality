import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const words = ["cambios", "logros", "resultados", "transformaciones", "impactos", "metas", "progresos", "conquistas", "victorias"];

const AnimatedWord = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <h2 className="text-4xl font-medium text-white py-2 text-left">
      Pequeños hábitos, grandes&nbsp;
      <span className="inline-block relative w-[160px] align-top ">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="absolute top-0 left-0 text-red-500 "
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </h2>
  );
};

export default AnimatedWord;
