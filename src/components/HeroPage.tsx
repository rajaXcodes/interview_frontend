"use client";
import { motion } from "motion/react";
import { LampContainer } from "./ui/lamp";
// import { TypewriterEffect } from "./ui/typewriterEffect";
import Button from "./ui/button";

export function Lamp() {
  return (
    <div className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-2 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Test Your Algo <br /> the right way
        </motion.h1>
        {/* <TypewriterEffect
          words={[
            { text: "Test", className: "text-slate-300" },
            { text: "Your", className: "text-slate-300" },
            { text: "Algo", className: "text-blue-500" },
          ]}
          className="mt-4"
        /> */}
        <Button />
      </LampContainer>
    </div>
  );
}

export default Lamp;
