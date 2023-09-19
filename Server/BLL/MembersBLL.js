const Member = require("../Models/MembersModel");
const Subs = require("../Models/SubscriptionModel");
const mongoose = require("mongoose");
const moviesBLL = require("../BLL/MovieBLL");

// function will get all members, each member with subscription info
const getAllMembersWithSubsInfo = async () => {
  try {
    // get all members
    const members = await Member.find({});

    // if cant find one
    if (!members) {
      throw new Error("Can't find members");
    }

    // get sub data and push to new obj with members data
    const gatherData = members.map(async (member) => {
      try {
        const subs = await Subs.find({
          memberId: new mongoose.Types.ObjectId(member._id),
        });

        return { member, subscriptions: subs };
      } catch (subsErr) {
        throw new Error("Error fetching subs:", subsErr);
      }
    });

    // wait for all data
    const memberWithSubscriptionInfo = (await Promise.all(gatherData)).filter(
      (data) => data !== null
    );

    // return new obj
    return memberWithSubscriptionInfo;
  } catch (err) {
    console.error("Error fetching members with subscription:", err);
  }
};

const getMemberWithSubscriptionInfo = async (id) => {
  try {
    // get member
    const member = await Member.findById(id);
    //if none found
    if (!member) {
      return `Cannot get member: ${err}`;
    }
    //get subs
    const subs = await Subs.find({ memberId: id });
    // if none found
    if (!subs) {
      return `no subscription found: ${err}`;
    }
    // if all good, return obj

    const memberWithSubs = {
      member: member,
      subscriptions: subs,
    };

    return memberWithSubs;
  } catch (err) {
    throw new Error(`cant get data: ${err}`);
  }
};

// function will delete member and his corresponding subscriptions
const deleteMemberAndSubs = async (id) => {
  try {
    // get member and delte
    await Member.findByIdAndDelete(id);
    // delete all his subs
    await Subs.deleteMany({ memberId: id });
    const updatedMembersList = await getAllMembersWithSubsInfo();
    const updatedMoviesList = await moviesBLL.getAllMoviesWithSubscribers();
    return {
      msg: "Member deleted successfully",
      members: updatedMembersList,
      movies: updatedMoviesList,
    };
  } catch (err) {
    throw new Error(`Can't delete member: ${err}`);
  }
};

// function to check if an email already exists in the database
const isEmailExists = async (email) => {
  const existingMember = await Member.findOne({ email });
  return !!existingMember;
};

// function to add a new member
const addMember = async (memberData) => {
  try {
    // Check if the email already exists in the database
    const emailExists = await isEmailExists(memberData.email);
    let flag = await getCountryFlagByCode(memberData.country);
    if (emailExists) {
      return "Email already exists in the database";
    }

    // if all good, save the new member
    const newMember = new Member(memberData);
    // newMember.flag = flag[0].flag

    await newMember.save();
    const savedMember = await Member.findById(newMember._id);

    const memberWithSubs = {
      member: savedMember,
      subscriptions: [],
    };
    return memberWithSubs;
  } catch (err) {
    throw new Error(`Cannot add member: ${err.message}`);
  }
};

// ws for flags ** ui use **
const getCountryFlagByCode = async (cca2) => {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/alpha?codes=${cca2}`
    );
    const data = response.data;
    return data;
  } catch (error) {
    return "Error fetching country from service:", error;
  }
};

module.exports = {
  getAllMembersWithSubsInfo,
  getMemberWithSubscriptionInfo,
  deleteMemberAndSubs,
  addMember,
};
