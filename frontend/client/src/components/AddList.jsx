import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const AddList = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
  });
  const {id}=useParams()
  const navigate=useNavigate()
  console.log(data)
  const handleAdd = async () => {
    try {
      const item = { title: data.title, description: data.description };
  
      // Correct usage of axios.post
      let response = await axios.post("http://localhost:3004/todos", item, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // Use strict equality for status code check
      if (response.status === 201) {
        console.log(response.status)
        
        alert("Updated Successfully");
      }
    } catch (err) {
      console.error("An error occurred:", err); // Log error details
    }
  };
  const handleUpdate = async () => {
    try {
      const item = { title: data.title, description: data.description };
  
      // Correct usage of axios.post
      let response = await axios.put(`http://localhost:3004/todos/${id}`, item, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // Use strict equality for status code check
      if (response.status === 201) {
        console.log(response.status)
        navigate("/")
      }
    } catch (err) {
      console.error("An error occurred:", err); // Log error details
    }
  };

  const fetchDataById=async()=>{
    try{
    const newData=await axios.get(`http://localhost:3004/todos/${id}`)
    if(newData.status==200){
        setData({
            title:newData.data.title,
            description:newData.data.description
        })
    }
    }
    catch(err){
        console.log(err)
    }
  }
  
  useEffect(()=>{
    if(id){
        fetchDataById()
    }}
   ,[id])
   const handleSubmit=()=>{
    if(id){
        return handleUpdate()
    }
    else{
        return handleAdd()
    }
   }
  return (
    <Box sx={{ px: "30px", py: "60px" }}>
      <Typography sx={{ color: "black", fontSize: "18px", my: "20px" }}>
        Add Item
      </Typography>

      <Box display="flex" justifyContent={"space-between"}>
        <TextField
          name="title"
          sx={{ width: "40%" }}
          value={data.title}
          onChange={(e) => {
            setData((prev) => ({
              ...prev,
              title: e.target.value,
            }));
          }}
          placeholder="Enter Title"
          required={true}
        />
        <TextField
          name="description"
          value={data.description}
          onChange={(e) => {
            setData((prev) => ({
              ...prev,
              description: e.target.value,
            }));
          }}
          placeholder="Enter Description"
          sx={{ width: "40%" }}
          required={true}
        />
      </Box>
      <Button onClick={handleSubmit}>{id ? "Edit" :"Submit"}</Button>
    </Box>
  );
};

export default AddList;
