import React from "react";
import axios from "axios";


// get all users
export const getAllUsers = async () => {
  try {
    let res = await axios.get("http://127.0.0.1:3800/users");
    const data = await res.data;
    return data;
  } catch (err) {
    throw new Error(`Can't get users from service: ${err}`);
  }
};


// get user by id
export const getUser = async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:3800/users/${id}`);
    const user = response.data;
    return user;
  } catch (err) {
    throw new Error(`Can't get user via service: ${err}`);
  }
};


// login user with pass and email
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post("http://127.0.0.1:3800/users/login", {
      email,
      password,
    });
    const user = response.data;
    return user;
  } catch (err) {
    throw new Error(`Login failed: ${err}`);
  }
};

// function will send email to user
export const forgotPassword = async (email) => {
  try {
    const resp = await axios.post(
      "http://127.0.0.1:3800/users/resetPassword",
      email
    );
    return resp;
  } catch (err) {
    throw new Error(`Could not send email to user`);
  }
};
