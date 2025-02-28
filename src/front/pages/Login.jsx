import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { motion } from "framer-motion";

const Login = () =>{
    const {store, dispatch} = useGlobalReducer();

    const handleChange = (e) => {
        const { name, value } = e.target;

        dispatch({ type: 'set_field', field: name, value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (store.email == '') {
            dispatch({ type: 'set_error', error: 'You need to fill in the email field' });
            return
        }
        if (store.password == '') {
            dispatch({ type: 'set_error', error: 'You need to fill in the password field' });
            return
        }
        try {
            const response = await fetch('https://crispy-succotash-5g4r7j4vqg7p2r67-3001.app.github.dev/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: store.email,
                    password: store.password
                })
            });
            if (response.ok) {
                const data = await response.json();
                dispatch({ type: 'login_success', payload: data })
                localStorage.setItem('token', data.access_token)
                dispatch({ type: 'clear_form' })
            }
            else {
                const errorData = await response.json();
                dispatch({ type: 'set_error', error: errorData.msg || 'Invalid credentials' })
            }
        }
        catch (error) {
            dispatch({ type: 'set_error', error: 'There was an error sending the request' })
        }

    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-600 to-red-400">
            <motion.form 
                className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
                onSubmit={handleSubmit}
                initial={{opacity: 0, y:50}}
                animate={{opacity: 1, y:0}}
                transition={{duration: 1}}
            >
                <h2 className="text-2x1 font-bold text-center mb-6">Log In</h2>
                <p className="text-center">Welcome Back to <span className="text-yellow-600">Flow</span><span className="text-red-400">Genius</span></p>
                {store.error && <p className="text-center text-red-500 mb-4">{store.error}</p>}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-md font-medium text-gray-700">Email</label>
                    <motion.input
                        whileFocus={{scale: 1.05}}
                        type="email"
                        id="email"
                        name="email"
                        value={store.email}
                        onChange={handleChange}
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
                        value={store.password}
                        onChange={handleChange}
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