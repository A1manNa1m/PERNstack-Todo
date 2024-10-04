import React,{Fragment,useState} from 'react'

const InputTodo = () => {
    const [description, setDescription] = useState("")

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const body = {description};
            const response = await fetch("http://localhost:5000/todos",{
                method:"post",
                headers: {
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify(body)
            })
            window.location ="/"

        } catch (error) {
            console.error(error.message)
        }
        
    }

  return (
    <Fragment>
        <div className='text-center mt-5'>
            <h1>Pern To Do</h1>
            <form className='d-flex mt-5' onSubmit={onSubmitForm}>
                <input type='text' 
                value={description}
                className='form-control'
                onChange={e => setDescription(e.target.value)}
                />
                <button className='btn btn-success'>Add</button>
            </form>
        </div>
    </Fragment>
  )
}

export default InputTodo