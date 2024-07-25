import axios from "axios";
import React, { useEffect, useReducer } from "react";

const handleSubmit = (todo) => {
  console.log(JSON.stringify(todo))
  axios.post("http://localhost:5000/add" , todo)
  .then((res => console.log(res)))
  .catch((err) => {
    console.log(err)
  })
  .finally(console.log("request done"))
}
function reduce(state , {type , payload}) {
  switch (type) {
    case "add-todo":
      if (payload.name == "date") {

      }
      return {
        ...state, 
        newTodo : {
          ...state.newTodo,
          [payload.name] : payload.value
        }
      }
      case "get-data":
        return {
          ...state,
          todos: payload,
      }
      case "insertOne" :
        handleSubmit(state.newTodo)
        
        return {
          state
        }
      default :
      return {
        state
      }

}} 

const initialzie = {
  newTodo : {
    name : "",
    categorie : "",
    date : new Date(),
  },
  todos : [],

}



function App() {
  const [state , dispatch] = useReducer(reduce , initialzie)
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData =()=> {
    try {
      axios.get("http://localhost:5000/todos").then((res) => {
        dispatch({type : "get-data" , payload : res.data})
      })
      
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="todos-wrapper">
      <h1>todos</h1>
      {console.log(state.newTodo)}
      <input type="text" name="name" placeholder="name" onChange={(e) => dispatch({type : "add-todo" , payload : e.target})} />
      <input type="text" name="categorie" placeholder="categorie" onChange={(e)=> dispatch({type: "add-todo" , payload : e.target})} />
      <input type="datetime-local" name="date" onChange={(e)=> dispatch({type: "add-todo" , payload : e.target})}/>
      <button onClick={()=>dispatch({type: "insertOne"})}>Add One</button>

    </div>
  );
}

export default App;
