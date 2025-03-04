export const initialStore=()=>{
  return{
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || {}) : null,
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: ''
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
        }
      case 'clear_form':
        return{
          ...initialStore
        }
    default:
      return store;
  }    
}
