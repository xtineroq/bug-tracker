import axios from "axios";

export default {
  // Gets all bugs
  getBugs: () => {
    return axios.get("/bugs");
  },
  // Gets the book based on user search
  getBug: (id) => {
    return axios.get("/bugs/" + id);
  },
  // Deletes the bug with the given id
  deleteBug: (id) => {
    return axios.delete("/bugs/" + id);
  },
  // Save bug to db
  saveBug: (bugData) => {
    return axios.post("/bugs", bugData);
  }
};