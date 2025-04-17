import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getToken = () => {
    return Cookies.get("authToken");
  };

  const setToken = (token) => {
    const expireTime = new Date();
    expireTime.setMinutes(expireTime.getMinutes() + 15);
    Cookies.set("authToken", token, { expires: expireTime, path: "/" });
  };

  const removeToken = () => {
    Cookies.remove("authToken");
  };

  const getUserCookie = () => {
    const userData = {
      id: Cookies.get("userId"),
      firstName: Cookies.get("userFirstName"),
    };
    return userData;
  };

  const setUserCookie = (firstName, id) => {
    const expireTime = new Date();
    expireTime.setMinutes(expireTime.getMinutes() + 15);
    Cookies.set("userFirstName", firstName, { expires: expireTime, path: "/" });
    Cookies.set("userId", id, { expires: expireTime, path: "/" });
  };

  const removeUserCookie = () => {
    Cookies.remove("userFirstName");
    Cookies.remove("userId");
  };

  const checkAuth = async () => {
    try {
      const token = getToken();
      const userData = getUserCookie();
      if (!token || !userData) throw new Error("Not authenticated");

      setUser(userData);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (registrationData) => {
    console.log(JSON.stringify(registrationData));
    try {
      const response = await fetch("http://localhost:5156/Auth/Register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        const resData = await response.json();

        const loginData = {
          email: registrationData.email,
          password: registrationData.password,
        };
        await login(loginData);
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
      throw error;
    }
  };

  const login = async (credentials) => {
    const response = await fetch("http://localhost:5156/Auth/Login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      credentials: "include",
    });

    if (response.ok) {
      const resData = await response.json();
      const token = resData.token;
      const firstName = resData.firstName;
      const id = resData.id;
      setToken(token);
      setUserCookie(firstName, id);
      checkAuth();
      return;
    } else {
      throw new Error("Login failed");
    }
  };

  const logout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });
    removeToken();
    removeUserCookie();
    setUser(null);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return React.createElement(AuthContext.Provider, { value }, children);
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
