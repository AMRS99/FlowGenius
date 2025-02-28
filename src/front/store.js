export const initialStore=()=>{
  return{
    // message: null,
    // todos: [
    //   {
    //     id: 1,
    //     title: "Make the bed",
    //     background: null,
    //   },
    //   {
    //     id: 2,
    //     title: "Do my homework",
    //     background: null,
    //   }
    // ]
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
      case 'clear_form':
        return{
          ...initialStore
        }
    default:
      return store;
  }    
}
