import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";

const Login = () =>{

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    return(
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-600 to-red-400">
            <motion.form 
                className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
                initial={{opacity: 0, y:50}}
                animate={{opacity: 1, y:0}}
                transition={{duration: 1}}
            >
                <h2 className="text-2x1 font-bold text-center mb-6">Log In</h2>
                <p className="text-center">Welcom Back to <span className="text-yellow-600">Flow</span><span className="text-red-400">Genius</span></p>
                {error && <p className="text-center text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-md font-medium text-gray-700">Email</label>
                    <motion.input
                        whileFocus={{scale: 1.05}}
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        placeholder="Your Email"
                        className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-md font-medium text-gray-700">Password</label>
                    <motion.input
                        whileFocus={{scale: 1.05}}
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        placeholder="Your password"
                        className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>
                <motion.button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white py-2 !rounded-full hover:bg-blue-600"
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                >
                    Log In
                </motion.button>
            </motion.form>
        </div>
    )
}

export default Login;