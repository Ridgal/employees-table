import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getEmployees = createAsyncThunk(
  "employees/getEmployees",
  async () => {
    const response = await axios
      .get("/data/employees.json")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("error", error);
      });
    return response;
  }
);
