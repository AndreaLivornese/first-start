import React from 'react'
import TodoElement from './TodoElement'

export default function Todo({todos, toggleTodo}) {
  return (
    todos.map(todo => {
       return <TodoElement key={todo.id} toggleTodo={toggleTodo} todo={todo}></TodoElement>
    })
  )
}
