
const subsBLL = require("../BLL/SubscriptionBLL");
const express = require("express");
const router = express.Router();


// get all users
router.get("/", async (req, res) => {
    try {
      const subs = await subsBLL.getAllSubs();
      res.status(200).json(subs);
    } catch (err) {
      res.status(500).json({ error: `Error fetching users:  ${err}` });
    }
  });
  

  router.post("/", async (req, res) => {
    try{
      let subObj = req.body
      const sub = await subsBLL.addSubscription(subObj)
      res.status(200).json(sub)
    } catch (err) {
      res.status(500).json({ error: `Error, can't add subscription: ${err}`})
    }
  
  })


  module.exports = router