import axios from "axios";

// get all users
export const getAllMovies = async () => {
  try {
    let res = await axios.get("http://127.0.0.1:3800/movies");
    const data = await res.data;
    return data;
  } catch (err) {
    throw new Error(`Can't get users from service: ${err}`);
  }
};

// update a movie by id
export const updateMovie = async (id, movObj) => {
  try {
    let res = await axios.put(`http://127.0.0.1:3800/movies/${id}`, movObj);
    const data = await res.data;
    return data;
  } catch (err) {
    throw new Error("Cant update movie from service");
  }
};

// add movie to db
export const addMovie = async (movObj) => {
  try {
    let res = await axios.post(`http://127.0.0.1:3800/movies/`, movObj);
    const data = await res.data;
    return data;
  } catch (err) {
    throw new Error("Cant add movie from service");
  }
};

export const deleteMovie = async (id) => {
  try{
  let res = await axios.delete(`http://127.0.0.1:3800/movies/${id}`)
  const data = await res.data
  
  return data
  }
  catch (err) {
    throw new Error("Cant delete movie from service");
  }
}

