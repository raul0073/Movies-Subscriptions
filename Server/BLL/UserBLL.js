require("dotenv").config();
const secretKey = process.env.SECRET_KEY;
const mailPass = process.env.MAIL_KEY;
const mailAddress = process.env.MY_MAIL_ADDRESS;
const User = require("../Models/UsersModel");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

// get all users
const getAllUsers = async () => {
  try {
    const users = await User.find({});

    return users;
  } catch (err) {
    console.error("Error while getting user:", err);
    throw new Error(`Can't get user:  ${err}`);
  }
};

// get user
const getUserById = async (id) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (err) {
    console.error("Error while getting user:", err);
    throw new Error("Can't get user: " + err);
  }
};

// function to log user in with email and password
const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    // handle err
    if (!user) {
      throw new Error("User not found");
    }

    // check for pass
    // still check for regular as all user dont have hashed
    // compare hashed with pass
    if (user.password !== password) {
      const isPasswordValid = await user.verifyPassword(password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }
    }

    // assign token
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "30d",
    });

    // set db status
    user.isOnline = true;
    user.save();

    return { name: user.fullname, token: token, isManager: user.isManager };
  } catch (err) {
    throw new Error(`Login failed ${err}`);
  }
};

const forgotPassword = async (email) => {
  try {
    const user = await User.findOne({ email });

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: mailAddress,
        pass: mailPass,
      },
    });

    const mailOptions = {
      from: mailAddress,
      to: email,
      subject: "Password retrievel",
      text: `Hey there! we found your password you silly ${user.password}`,
    };

    transport.sendMail(mailOptions, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        return "The email was sent successfully";
      }
    });
  } catch (err) {
    console.log(`Cant send email to user: ${err}`);
  }
};

module.exports = { getAllUsers, loginUser, getUserById, forgotPassword };
