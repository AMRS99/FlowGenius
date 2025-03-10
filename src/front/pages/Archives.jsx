import React from "react";
import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Archives = () => {
    const[archives, setArchives] = useState([]);
    const {store, dispatch} = useGlobalReducer();
    useEffect(() =>{
        const fetchFiles = async () =>{
            const response = await fetch('https://crispy-succotash-5g4r7j4vqg7p2r67-3001.app.github.dev/api/api/files')
            const data = await response.json();
            const fetchedFiles = data.files.map((file) =>({
                id: file,
                name: file,
                date: new Date().toLocaleDateString(),
            }));
            fetchedFiles.array.forEach((file) => {
                dispatch({
                    type:'add_file',
                    payload:file
                })
            });
        }
        fetchFiles();
    }, [])

    const handleFileChange = (e) => {
        dispatch({
            type:'set_selected_file',
            payload: e.target.files[0]
        })
    }

    const handleFileUpload = () => {
        const file = store.selectedFile;
        if(!file){
            alert("Select a file to upload")
            return;
        }
        dispatch({
            type:'add_file',
            payload:{name: file.name}
        });
        dispatch({type:'set_selected-file', payload: null})
    }

    const handleFileDelete = (id) =>{
        dispatch({
            type:'remove_file',
            payload:{id}
        })
    }

    return(
        <>
            <div className="p-6">
                <h2 className="text-2x1 font-bold mb-4">Archives</h2>
                <div className="mb-4">
                    <input type="file" onChange={handleFileChange} className="p-2 border !rounded" />
                    <button onClick={handleFileUpload} className="bg-blue-500 text-white px-4 py-2 !rounded ml-2 hover:bg-blue-600">
                        Upload Archive
                    </button>
                </div>
                <ul className="bg-white shadow-lg !rounded-lg p-4">
                    {store.archives.map((archive) =>(
                        <li key={archive.id} className="border-b py-2 last:border-none">
                            <span className="font-semibold">{archive.name}</span>
                            <button onClick={() => handleFileDelete(archive.id)} className="text-red-500 ml-2 hover:underline">
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Archives;