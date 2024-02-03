import { useState ,useEffect} from 'react'
import {TodoProvider} from './contexts'
import './App.css'
import { TodoForm, TodoItem } from './components'

function App() {
   const [todos, setTodos] = useState([])
   //defining addTodo function
   //adding a new todo list but also holding the previous value by using the concept of prev
   const addTodo =(todo)=>{
        setTodos((prev)=>[{id: Date.now(), ...todo}, ...prev]) // revise it 
   }

   const updateTodo =(id,todo)=>{
     setTodos((prev)=>prev.map((prevTodo)=>(prevTodo.id===id?todo: prevTodo))) //revise it very good code
   }
//crete a new array with prev todo but not for that id ,this is done by filter method 
   const deleteTodo = (id)=>{
     setTodos((prev)=>prev.filter((todo)=>todo.id!==id))//REVISE THIS ,important
   }

   const toggleComplete = (id) =>{
    setTodos((prev)=>prev.map((prevTodo)=>prevTodo.id===id
    ?{...prevTodo, completed: !prevTodo.completed}:prevTodo))
   }


   //Now the local storage story, (basically it is the storage of browser)
   //useEffect for displaying already mentined detailed

   useEffect(()=>{
    //here getting the local storage ,(only two step in local storage setting set and get )
    const todos = JSON.parse(localStorage.getItem("todos"))

    if(todos && todos.length>0){
      setTodos(todos)
    }
   }, [])
   //one more useEffect to set new
   useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
   }, [todos])

  return (
    <TodoProvider value={{todos, addTodo, updateTodo,
    deleteTodo,  toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */}
                        <TodoForm/> 
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo)=>(
                          <div key={todo.id} className='w-full'>
                              <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
