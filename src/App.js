import React, { useState, useRef, useEffect } from "react";
import Todo from "./Todo";
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KET="todoApp.todo";

function App() {
  const [todos, setTodos] = useState([]);

  const todoNameRef = useRef();

  // riprende dalla memoria locale l'array todos ed avviene solo una volta
  useEffect(()=>{
    const storedTodos= JSON.parse(localStorage.getItem(LOCAL_STORAGE_KET));
    if(storedTodos)setTodos(storedTodos);
  },[])//l'array vuoto serve per fare in modo che l'effetto venga eseguito solo una volta

  // questo effetto memorizza in locale il todo appena inserito nell'array todos ed avviene ogni volta che l'array viene modificato
  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KET, JSON.stringify(todos))
  }, [todos])


  function toggleTodo(id){
    const newTodos = [...todos];//si fa una copia dell'array dei todo
    const todo = newTodos.find(todo => todo.id === id);//ricerca del todo tramite l'id
    todo.completed = !todo.completed;//si inverte il valore
    setTodos(newTodos);//si aggiunge il cambiamento
  }

  function handleAddTodo(e){
    const name = todoNameRef.current.value;
    if(name === '')return;

    setTodos(prevTodo =>{
      return [...prevTodo, {id:uuidv4(), name:name, completed:false}]
    });

    todoNameRef.current.value=null;
  }

  function handleClearTodo(){
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos);
  }

  return (
    // è un frammento e permette di far visualizzare un elemeto JSX seguito da tag HTML
    <>
      <Todo toggleTodo={toggleTodo} todos={todos}/>
      <input ref={todoNameRef} type="text"/>
      <button  onClick={handleAddTodo}>Add todo</button>
      <button onClick={handleClearTodo} >clear Completed todos</button>
      <div>{todos.filter(todo => !todo.completed).length} left to do</div>
    </>
    
      
  );
}

export default App;
