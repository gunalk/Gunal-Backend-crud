import React from "react";
import Box from "@mui/material/Box";
import Header from "./components/Header";
import AddList from "./components/AddList";
import Details from "./components/Details";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import ShowComponent from "./components/ShowComponent";

const App = () => {
  return (
    <Box>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShowComponent/>}/>
        <Route path="/edit/:id" element={<AddList/>}/>
      </Routes>
      </BrowserRouter>
     
    </Box>
  );
};

export default App;
