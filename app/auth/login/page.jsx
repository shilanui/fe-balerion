"use client";
import { useState } from "react";
import {
  Box,
  Button,
  InputLabel,
  Typography,
  FormControl,
} from "@mui/material";
import TextFieldComponent from "@/components/TextFieldComponent/TextFieldComponent";
import { useRouter } from "next/navigation";
import { authLoginAdmin, authLoginUser } from "@/api/auth/auth";

const LoginPage = () => {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [maskPassword, setMaskPassword] = useState("");

  const handleLogin = async () => {
    const payload = {
      user: userId,
      password,
    };

    const res =
      userId === "admin"
        ? await authLoginAdmin(payload)
        : await authLoginUser(payload);

    if (res?.response?.token) {
      localStorage.setItem("token", res?.response?.token);
      router.push("/");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#0a0a0a"
    >
      <Box display="flex" flexDirection="column">
        <Typography
          sx={{
            color: "white",
            my: "0.5rem",
          }}
          variant="h6"
        >
          เข้าสู่ระบบ
        </Typography>
        <FormControl variant="standard">
          <InputLabel
            shrink
            sx={{
              color: "white",
            }}
          >
            บัญชีพนักงาน
          </InputLabel>
          <TextFieldComponent
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </FormControl>
        <FormControl
          variant="standard"
          sx={{
            marginY: "1rem",
          }}
        >
          <InputLabel
            shrink
            sx={{
              color: "white",
            }}
          >
            รหัสผ่าน
          </InputLabel>
          <TextFieldComponent
            id="password"
            value={maskPassword}
            onChange={(e) => {
              const actual = e.target.value;
              const newValue =
                actual.length > maskPassword?.length
                  ? actual[actual.length - 1]
                  : "";

              const updatedPassword =
                actual.length >= password?.length
                  ? password + newValue
                  : password.slice(0, actual.length);

              setPassword(updatedPassword);
              setMaskPassword("-".repeat(updatedPassword.length));
            }}
          />
        </FormControl>
        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{
            color: "black",
            background: "white",
            borderRadius: "8px",
          }}
        >
          ค้นหา
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
