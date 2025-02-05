import React from 'react'

export default function TodoElement( {todo, toggleTodo} ) {

    function handleTodoClick(){
        toggleTodo(todo.id)
    }

  return (
    <div>
        <label>
            <input type="checkbox" onChange={handleTodoClick}/>
            {todo.name}
        </label>

    </div>
  )
}
