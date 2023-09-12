const movieBLL = require("../BLL/MovieBLL");
const express = require("express");
const router = express.Router();

// get all movies
router.get("/", async (req, res) => {
  try {
    const moviesWithSubs = await movieBLL.getAllMoviesWithSubscribers();
    res.status(200).json(moviesWithSubs);
  } catch (err) {
    res
      .status(500)
      .json({ error: `Error fetching members with subs details:  ${err}` });
  }
});


// get movie stats
router.get("/:id", async (req, res) => {
  try {
    const movieSubsThisMonth = await movieBLL.getAllTimeSubscribersCountForMovie(req.params.id);
    res.status(200).json(movieSubsThisMonth);
  } catch (err) {
    res
      .status(500)
      .json({ error: `Error fetching members with subs details:  ${err}` });
  }
});

// add movie
router.post("/", async (req, res) => {
  try {
    let newMov = req.body;
    console.log(newMov);
    const data = await movieBLL.addMovie(newMov);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: `Error adding new movie:  ${err}` });
  }
});

// edit movie
router.put("/:id", async (req, res) => {
  try {
    let id = req.params.id
    console.log(id);
    let updatedMov = req.body
    console.log(updatedMov);
    const data = await movieBLL.updatedMovie(id,updatedMov);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: `Error updating movie:  ${err}` });
  }
});

// delete movie
router.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id
    const data = await movieBLL.deleteMovieById(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: `Error can't delete movie:  ${err}` });
  }
});



module.exports = router;
