import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export const Navbar = () => {
	const {store, dispatch} = useGlobalReducer();
	const navigate = useNavigate();
	useEffect(() =>{
		const storedUser = JSON.parse(localStorage.getItem("user") || null)
		if(!storedUser)
			navigate("/login")
		else if(!store.user){
			dispatch({type:"login", payload: storedUser})
		}
	},[store.user, dispatch])
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/dashboard">
					<span className="navbar-brand mb-0 h1">Welcome, {store.user ? store.user.name: "Loading..."}</span>
					{console.log(store.user)}
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};