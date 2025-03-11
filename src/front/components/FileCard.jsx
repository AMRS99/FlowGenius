import React from "react";
import { useEffect, useRef } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { motion } from "framer-motion";
import { DocumentTextIcon, LinkSlashIcon } from "@heroicons/react/24/outline";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { menu } from "framer-motion/client";

const FileCard = ({file}) => {
    const menuRef = useRef(null)
    const {store, dispatch} = useGlobalReducer();

    const handleClickOutside = (e) => {
        console.log(menuRef.current)
        if(menuRef.current && !menuRef.current.contains(e.target)){
            dispatch ({ type: "toggle_menu"})
        }
    }

    const handleToggleMenu = () => {
        dispatch ({ type: "toggle_menu"})
    }

    const handleView = () => {
        window.open(file.url, "_blank");
    }

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href=file.url;
        link.download = file.name;
        document.body.appendChild(link)
        link.click();
        document.body.removeChild(link)
    }

    const handleFileDelete = (id) =>{
        dispatch({
            type:'remove_file',
            payload:{id}
        })
    }

    useEffect(()=>{
        document.addEventListener("mousedown",handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return(
        <>
            <div className="relative bg-white shadow-md !rounded-lg p-4 w-64">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <DocumentTextIcon className="h-6 w-6 text-blue-500"/>
                        <p className="text-gray-800 font-medium">{file.name}</p>
                        {console.log(file)}
                    </div>
                    <button className="text-gray-500 hover:text-gray-700" onClick={handleToggleMenu}>
                        <EllipsisVerticalIcon className="h-5 w-5"/>
                    </button>
                </div>
                {store.isMenuOpen && (
                    <motion.div 
                        ref={menuRef}
                        initial={{opacity: 0, y: -10}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -10}}
                        className="absolute right-2 mt-2 w-40 bg-white border shadow-md !rounded-lg overflow-hidden"
                    >
                        <a 
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={handleView}
                        >
                            view
                        </a>
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={handleDownload}>
                            Download
                        </button>
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={()=>handleFileDelete(file.id)}>
                            Delete
                        </button>
                    </motion.div>
                )}
            </div>
        </>
    )
}

const FileDisplay = ({file}) => {
    const {store, dispatch} = useGlobalReducer();
    return(
        <div className="grid grid-cols-3 gap-4 p-6">
            {store.archives.map((file, index) =>(
                <FileCard key={index} file={file} />
            ))}
        </div>
    )
}

export default FileDisplay;