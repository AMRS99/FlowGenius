import { useActionState } from "react";

export const initialStore=()=>{
  return{
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || {}) : null,
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: '',
    tasks:{
      pending: 0,
      inProgress: 0,
      completed: 0
    },
    notifications: [],
    calendarEvents: [],
    recentActivity: [],
    statistics: {},
    archives: [],
    selectedFile: null
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_field':
      return {
        ...store,
        [action.field]: action.value
      };      
    case 'set_error':
      return {
        ...store,
        error: action.error
      };
      case 'login':
        localStorage.setItem("user", JSON.stringify(action.payload))
        return {
          ...store, user: action.payload
        };
      case 'set_overview':
        return{
          ...store,
          tasks: action.payload.tasks,
          notifications: action.payload.notifications,
          calendarEvents: action.payload.calendarEvents,
          recentActivity: action.payload.recentActivity,
          statistics: action.payload.statistics
        };
      case 'add_file':
        return{
          ...store,
          archives:[
            ...store.archives,
            {id: store.archives.length + 1, name: action.payload.name, date: new Date().toLocaleDateString()},
          ]
        }
      case 'remove_file':
        return{
          ...store,
          archives: store.archives.filter((archive)=>archive.id !== action.payload.id)
        }   
      case 'set_selected_file':
        return{
          ...store,
          selectedFile: action.payload,
        }   
      case 'clear_form':
        return{
          ...initialStore
        }
    default:
      return store;
  }    
}
