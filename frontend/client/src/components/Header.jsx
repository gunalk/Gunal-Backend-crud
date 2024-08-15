import { Box, Typography } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ background: "black", width: "100%" ,height:"60px"}}
    >
      <Typography sx={{ color: "white", fontSize: "20px" }}>
        Welcome to Todo List
      </Typography>
    </Box>
  );
};

export default Header;
