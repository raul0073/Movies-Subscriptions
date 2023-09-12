const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const userRouter = require('./Routes/UsersRoute')
const moviesRouter = require('./Routes/MoviesRoute')
const subsRouter = require('./Routes/SubscriptionRoute')
const membersRouter = require('./Routes/MembersRoute')

require("./Configs/db")
const app = express();

app.use(express.json())
app.use(cors())

app.use("/users", userRouter)
app.use("/movies", moviesRouter)
app.use("/subs", subsRouter)
app.use("/members", membersRouter)



app.listen(3800, () => {
    try{
        console.log(`app is up on port 3800`)
    } catch (err){
        console.log(`Error ${err}`);
    }
});
