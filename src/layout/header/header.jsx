"use client";
import React, { useState, useEffect, useCallback } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Typography, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";

const HeaderComponent = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    router.push("/auth/login");
  };

  const getUserData = useCallback(() => {
    const user = JSON.parse(localStorage.getItem("userData"));

    if (user) {
      setUser(user);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      getUserData();
    }
  }, [getUserData]);

  return (
    <Box
      display="flex"
      justifyContent="end"
      alignItems="center"
      bgcolor="#0a0a0a"
      p={2}
    >
      <Typography variant="body2" pr={3} sx={{ color: "white" }}>
        {user && user?.email}
      </Typography>
      <IconButton size="small" onClick={handleLogout}>
        <LogoutIcon fontSize="inherit" sx={{ color: "white" }} />
      </IconButton>
    </Box>
  );
};

export default HeaderComponent;
