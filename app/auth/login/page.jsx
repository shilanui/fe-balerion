"use client";
import { useState } from "react";
import {
  Box,
  Button,
  InputLabel,
  Typography,
  FormControl,
} from "@mui/material";
import TextFieldComponent from "@/components/TextField/TextFieldComponent";
import { useRouter } from "next/navigation";
import { authLoginAdmin, authLoginUser } from "@/api/auth/auth";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [maskPassword, setMaskPassword] = useState("");
  const [alertText, setAlertText] = useState(null);

  const handleLogin = async () => {
    try {
      const payload = {
        user: userId,
        password,
      };

      if ((userId === "admin" || userId === "user") && password === "1234") {
        const res =
          userId === "admin"
            ? await authLoginAdmin(payload)
            : await authLoginUser(payload);

        if (res?.response?.token) {
          const decoded = jwtDecode(res?.response?.token);
          localStorage.setItem("token", res?.response?.token);
          localStorage.setItem("userData", JSON.stringify(decoded));

          setAlertText(null);
          router.push("/");
        }
      } else {
        setAlertText("User or Password wrong!");
      }
    } catch (err) {
      console.error("Login err =", err);
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
            backgroundColor: "white",
            borderRadius: "8px",
          }}
        >
          ค้นหา
        </Button>
        {alertText && <Typography color="error">{alertText}</Typography>}
      </Box>
    </Box>
  );
};

export default LoginPage;
