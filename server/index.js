const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")

//middleware//
app.use(cors())
app.use(express.json())


//Routes//
//create a todo
app.post("/todos", async(req,res)=>{
    try {
        const {description} = req.body
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",[description])

        res.status(200).json({
            message: "Todo task successfully stored",
            success: true,
            error: false,
            data: newTodo.rows[0]
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error:true,
            success:false
        })
    }
})

//get all todo
app.get("/todos", async(req,res)=>{
    try {
        const allTodo = await pool.query("SELECT * FROM todo")

        res.status(200).json({
            message: "All Todo list",
            success: true,
            error: false,
            data: allTodo.rows
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error:true,
            success:false
        })
    }
})

//get a todo
app.get("/todos/:id", async(req,res)=>{
    try {
        const {id} = req.params
        const specificTodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id])

        res.status(200).json({
            message: "All Todo list",
            success: true,
            error: false,
            data: specificTodo.rows[0]
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error:true,
            success:false
        })
    }
})


//update a todo
app.put("/todos/:id", async(req,res)=>{
    try {
        const {id} = req.params
        const {description} = req.body

        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id =$2 RETURNING *",[description,id])

        res.status(200).json({
            message: "Todo successfully updated",
            success: true,
            error: false,
            data: updateTodo.rows[0]
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error:true,
            success:false
        })
    }
})

//delete a todo
app.delete("/todos/:id", async(req,res)=>{
    try {
        const {id} = req.params
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id=$1 RETURNING *",[id])

        res.status(200).json({
            message: "Todo successfully deleted",
            success: true,
            error: false,
            data: deleteTodo.rows[0]
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error:true,
            success:false
        })
    }
})


//Port running//
app.listen(5000, ()=>{
    console.log("Server is running on port 5000")
})