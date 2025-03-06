import React from "react";
import { AnimatePresence, motion, spring } from "framer-motion";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { path } from "framer-motion/client";
import { Link } from "react-router-dom";

const sidebarVariants ={
    open:{
        x:0,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 15
        }
    },
    closed:{
        x: "-100%",
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 15
        }
    }
}

const itemVariants ={
    hidden:{
        y: -50,
        opacity: 0
    },
    visible: (i) => ({
        y:0,
        opacity: 1,
        transition: {
            delay: i*0.1,
            type: "spring",
            stiffness: 100
        }
    })
};

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toogleSidebar = () => setIsOpen(!isOpen);

    const menuItems =[
        {name: "Dashboard", path: "/dashboard"},
        {name: "Tasks", path: "/dashboard/tasks"},
        {name: "Chat", path:"/dashboard/chat"},
        {name: "Archives", path:"/dashboard/archives"},
        {name: "Calendar", path:"/dashboard/calendar"}
    ]
    return(
        <>
            <button onClick={toogleSidebar} className="p-2">
                <Bars3Icon className="h-8 w-8 text-gray-800"/> 
            </button>
            <AnimatePresence>
            {isOpen && (
                <motion.div className="fixed inset-0 bg-black bg-opacity-50" onClick={toogleSidebar}>
                    <motion.div 
                        className="fixed left-0 top-0 w-64 h-full shadow-md p-4 bg-gray-800 text-white"
                        initial="closed"
                        animate={isOpen ? "open" : "closed"}
                        variants={sidebarVariants}
                        exit={{x: "-100%"}}
                        // transition={{type: "tween", duration: 0.3}}
                        // onClick={(e)=>e.stopPropagation()}
                    >
                        <button onClick={toogleSidebar} className="p-2">
                            <XMarkIcon className="h-8 w-8 text-gray-800"/>
                        </button>

                        <h2 className="text-xl font-bold mb-4">Sidebar</h2>
                        <div className="mt-4">
                            {menuItems.map((item,index)=>(
                                <motion.div
                                    key={item.name}
                                    custom={index}
                                    initial="hidden"
                                    animate={isOpen ? "visible" : "hidden"}
                                    variants={itemVariants}
                                >
                                    <Link to={item.path} className="block py-2 px-4">
                                        <button className="w-full text-center p-2 bg-yellow-500 text-white !rounded hover:bg-yellow-400 focus:outline-none">
                                            {item.name}
                                        </button>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
            </AnimatePresence>
        </>
    )
}

export default Sidebar;