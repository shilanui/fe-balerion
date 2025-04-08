"use client";
import { Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddIconComponent = ({ ...props }) => {
  return (
    <Box
      sx={{
        bgcolor: "#d1d5db",
        borderRadius: 2,
        height: "100%",
        width: "100%",
        minHeight: "180px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "gray.600",
        cursor: "pointer",
        transition: "all 0.3s",
        "&:hover": {
          bgcolor: "#9ca3af",
        },
      }}
      onClick={() => setIsAddNew(true)}
      {...props}
    >
      <IconButton size="large">
        <AddIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
};

export default AddIconComponent;
