import React from "react";
import { Navbar } from "../components/Navbar";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { motion } from "framer-motion";
import ScrollToTop from "../components/ScrollToTop";
import Sidebar from "../components/Sidebar";

const list = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  }
  
  const item = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -100 },
  }
const Dashboard = () =>{
    const {store, dispatch} = useGlobalReducer();
    return(
        <>
            <ScrollToTop>
                <Navbar/>
                <Sidebar/>
                welcome to your Dashboard
            </ScrollToTop>
        </>
    )
}

export default Dashboard;