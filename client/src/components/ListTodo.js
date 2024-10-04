import React, {useEffect,useState} from 'react'
import EditTodo from './EditTodo';

const ListTodo = () => {

    const [todos, setToDos] = useState([]);

    const deleteTodos = async(id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "delete"
            });
            getTodos()
        } catch (error) {
            console.error(error.message);
        }
    }

    const getTodos = async() =>{
        try {

            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();
            setToDos(jsonData.data)

        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getTodos()
    }, []);

  return (
    <div>        
        <table class="table mt-5">
            <thead>
            <tr>
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {
                todos.map(todo => (
                    <tr key={todo?.todo_id}>
                        <td>{todo?.description}</td>
                        <td>
                            <EditTodo todo={todo} getTodos={getTodos}/>
                        </td>
                        <td>
                            <button 
                            className='btn btn-danger' 
                            onClick={() => deleteTodos(todo?.todo_id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>

    </div>
    
  )
}

export default ListTodo