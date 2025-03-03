import React, { useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";
import LogoImg from "../images/LogoImg.jpg";

const initialLoginValues = { email: "", password: "" };
const initialSignupValues = { name: "", email: "", password: "", confirmPassword: "" };

const Login = () => {
  const [account, setAccountType] = useState("login");
  const [loginData, setLoginData] = useState(initialLoginValues);
  const [signupData, setSignupData] = useState(initialSignupValues);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  const toggleAccount = () => setAccountType(account === "login" ? "signup" : "login");

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    type === "login"
      ? setLoginData((prev) => ({ ...prev, [name]: value }))
      : setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const validateSignup = () => {
    const { name, email, password, confirmPassword } = signupData;
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const validateLogin = () => {
    const { email, password } = loginData;
    if (!email || !password) {
      setError("All fields are required");
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validateSignup()) return;
    setLoading(true);
    try {
      const response = await API.userSignup(signupData);
      if (response.isSuccess) {
        setError("");
        setSignupData(initialSignupValues);
        setAccountType("login");
      } else {
        setError(response.error || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("Signup request failed. Try again later.");
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    if (!validateLogin()) return;
    setLoading(true);
    try {
      const response = await API.userLogin(loginData);
      if (response.isSuccess) {
        sessionStorage.setItem("accessToken", `bearer ${response.data.accessToken}`);
        sessionStorage.setItem("refreshToken", `bearer ${response.data.refreshToken}`);
        setAccount({ username: response.data.username, name: response.data.name });
        navigate("/home");
      } else {
        setError(response.error || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("Login request failed. Try again later.");
    }
    setLoading(false);
  };

  return (
    <Background>
      <InnerBox>
        <Box>
          <Img src={LogoImg} alt="Logo" />
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="h5">{account === "login" ? "Login" : "Signup"}</Typography>
          {error && <Typography color="error">{error}</Typography>}

          {account === "login" ? (
            <>
              <TextField label="Email" name="email" value={loginData.email} onChange={(e) => handleChange(e, "login")} fullWidth />
              <TextField label="Password" name="password" type="password" value={loginData.password} onChange={(e) => handleChange(e, "login")} fullWidth />
              <LoginButton onClick={handleLogin} disabled={loading}>{loading ? "Logging In..." : "Log In"}</LoginButton>
            </>
          ) : (
            <>
              <TextField label="Name" name="name" value={signupData.name} onChange={(e) => handleChange(e, "signup")} fullWidth />
              <TextField label="Email" name="email" value={signupData.email} onChange={(e) => handleChange(e, "signup")} fullWidth />
              <TextField label="Password" name="password" type="password" value={signupData.password} onChange={(e) => handleChange(e, "signup")} fullWidth />
              <TextField label="Confirm Password" name="confirmPassword" type="password" value={signupData.confirmPassword} onChange={(e) => handleChange(e, "signup")} fullWidth />
              <SignupButton onClick={handleSignup} disabled={loading}>{loading ? "Signing Up..." : "Sign Up"}</SignupButton>
            </>
          )}

          <Typography color="black">OR</Typography>
          <Button onClick={toggleAccount}>{account === "login" ? "Sign Up" : "Already have an account?"}</Button>
        </Box>
      </InnerBox>
    </Background>
  );
};

// Styled Components
const Background = styled(Box)({
  height: "100vh",
  width: "100vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#2c3e50",
});

const InnerBox = styled(Box)({
  width: 400,
  padding: 32,
  borderRadius: 10,
  backgroundColor: "#fff",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
});

const Img = styled("img")({ width: 80, marginBottom: 16 });

const LoginButton = styled(Button)({ background: "#007bff", color: "white", padding: "10px 20px" });

const SignupButton = styled(Button)({ background: "#28a745", color: "white", padding: "10px 20px" });

export default Login;
