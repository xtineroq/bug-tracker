import axios from "axios";

export default {
  // Get all bugs
  getBugs: () => {
    return axios.get("/bugs");
  },
  // Get book with the given id
  getBug: (_id) => {
    return axios.get("/bugs/" + _id);
  },
  // Delete bug with the given id
  deleteBug: (_id) => {
    return axios.delete("/bugs/" + _id);
  },
  // Save bug to db
  saveBug: (bugData) => {
    return axios.post("/bugs", bugData);
  }
};