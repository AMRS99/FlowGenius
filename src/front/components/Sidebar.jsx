import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toogleSidebar = () => setIsOpen(!isOpen);
    return(
        <>
            <button onClick={toogleSidebar} className="p-2">
                <Bars3Icon className="h-8 w-8 text-gray-800"/> 
            </button>
            <AnimatePresence>
            {isOpen && (
                <motion.div className="fixed inset-0 bg-black bg-opacity-50" onClick={toogleSidebar}>
                    <motion.div 
                        className="fixed left-0 top-0 w-64 h-full bg-white shadow-lg p-4"
                        initial={{x: "-100%"}}
                        animate={{x:0}}
                        exit={{x: "-100%"}}
                        transition={{type: "tween", duration: 0.3}}
                        onClick={(e)=>e.stopPropagation()}
                    >
                        <button onClick={toogleSidebar} className="p-2">
                            <XMarkIcon className="h-8 w-8 text-gray-800"/>
                        </button>

                        <h2 className="text-xl font-bold mb-4">Sidebar</h2>
                    </motion.div>
                </motion.div>
            )}
            </AnimatePresence>
        </>
    )
}

export default Sidebar;