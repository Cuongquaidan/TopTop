import React from "react";
import { BiTv } from "react-icons/bi";
import { TbDeviceTvFilled } from "react-icons/tb";
import { motion } from "framer-motion";
function SolidLiveCustomIcon() {
    return (
        <div className="relative flex items-end justify-center w-8 h-8 gap-0.5 p-2  ">
            <motion.div
                className="w-1 bg-primary"
                animate={{
                    height: [2, 10],
                    transition: {
                        duration: 0.6,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "mirror",
                    },
                }}
            ></motion.div>
            <motion.div
                animate={{
                    height: [2, 10],
                    transition: {
                        duration: 0.6,
                        delay: 0.2,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "mirror",
                    },
                }}
                className="w-1 bg-primary"
            ></motion.div>
            <motion.div
                animate={{
                    height: [2, 10],
                    transition: {
                        duration: 0.6,
                        delay: 0.4,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "mirror",
                    },
                }}
                className="w-1 bg-primary"
            ></motion.div>
            <BiTv className="absolute inset-0 text-primary" size={32}></BiTv>
        </div>
    );
}

export default SolidLiveCustomIcon;
