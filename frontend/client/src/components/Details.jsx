import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Box,
  Paper,
  TableHead,
  Button,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Details = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3004/todos");
      if (response.status == 200) {
        setData(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };    
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchData();
  }, [data]);
  
  
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3004/todos/${id}`);
      if (response.status == 204) {
        fetchData();
      }
    } catch (err) {
      console.log(successfullh);
    }
  };
  return (
    <Box>
      {data.length > 0 ? (
        <TableContainer sx={{ width: 650 }} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.title}>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDelete(row._id)}
                      sx={{ color: "red" }}
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => handleEdit(row._id)}
                      sx={{ color: "red" }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <>No data found</>
      )}
    </Box>
  );
};

export default Details;
