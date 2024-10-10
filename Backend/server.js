const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors =require('cors')
app.use(cors())
mongoose
  .connect("mongodb://localhost:27017/mern")
  .then(() => console.log("database Connected"))
  .catch((err) => console.log(err));

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }, 
});

//dssdsd
const todoModel = mongoose.model("Todo", todoSchema);
let todos = [];
app.use(express.json());
app.post("/todos", async (req, res) => {
  try {
    console.log(req.body)
    const { title, description } = req.body;
    const newTodo = new todoModel({ title: title, description: description });

    await newTodo.save();
    console.log(todos);
    res.status(201).json({message:"updated Succesfully"});
  } catch (error) {
    console.log(error.message);
    res.status(500);
  }
});

//get all items

app.get("/todos", async (req, res) => {
  try {
    const data = await todoModel.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});
app.get("/todos/:id",async(req,res)=>{
  try{
    const id =req.params.id
    const data=await todoModel.findById(id)
    console.log(data)
    if(data){
     return res.status(200).json(data)
    }
    else{
      return res.status(404).json({message:"Not found"})
    }
  
  }
  catch(err){
    res.status(500).json({message:err})
  }
})
// update todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { title, description } = req.body;
    const id = req.params.id;
    const updatedTodo = await todoModel.findByIdAndUpdate(id,
        {
            title,description
        },
        {new:true}

    )

    if (!updatedTodo){
        return res.status(400).json({message:"todo nlot found"})
    }
    else {
        res.status(201).json(updatedTodo)
    }
  } catch (err) {}
});
app.delete("/todos/:id",async(req,res)=>{
    try{
        const id =req.params.id
        await todoModel.findByIdAndDelete(id);
        res.status(204).end()
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Internal Server"})
    }
})
const port = 3004;

app.listen(port, () => {
  console.log("server is listening ");
});
