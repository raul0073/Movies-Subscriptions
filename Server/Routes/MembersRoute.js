const memberBLL = require("../BLL/MembersBLL");
const express = require("express");
const router = express.Router();

// add member
router.post("/", async (req, res) => {
  try {
    const member = await memberBLL.addMember(req.body);
    res.status(200).json(member);
  } catch (err) {
    res.status(500).json({ error: `Error adding new member:  ${err}` });
  }
});

// get all members
router.get("/", async (req, res) => {
  try {
    const members = await memberBLL.getAllMembersWithSubsInfo();
    res.status(200).json(members);
  } catch (err) {
    res
      .status(500)
      .json({ error: `Error fetching members with info:  ${err}` });
  }
});

// get member by id
router.get("/:id", async (req, res) => {
  try {
    const member = await memberBLL.getMemberWithSubscriptionInfo(req.params.id);
    res.status(200).json(member);
  } catch (err) {
    res
      .status(500)
      .json({ error: `Error fetching member with subs info:  ${err}` });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await memberBLL.deleteMemberAndSubs(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: `Error deleting member with subs:  ${err}` });
  }
});

module.exports = router;
