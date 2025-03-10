import React from "react";
import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Notifications from "../components/Notifications";
import RecentActivity from "../components/RecentActivity";
import TaskSummary from "../components/TaskSummary";
import Statistics from "../components/Statistics";
import CalendarWidget from "../components/CalendarWidget";

const Overview = () => {
    const {store, dispatch} = useGlobalReducer();

    return(
        <>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <TaskSummary/>
                <Notifications/>
                <CalendarWidget className="md:col-span-2"/>
                <RecentActivity/>
                <Statistics className="lg:col-span-2"/>
            </div>
        </>
    )
}

export default Overview;