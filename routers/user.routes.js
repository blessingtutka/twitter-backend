import { Router } from "express";
import { user, userInfo, UserTweetsList, tweetCreate, tweetDelete, React } from "../controllers/user.controllers.js";
import auth from "../auth/auth.js";

let userRoutes = Router()

userRoutes.get('/user', user)
userRoutes.get('/user/:username', userInfo)
userRoutes.get('/tweets/:username', UserTweetsList)
userRoutes.post('/tweet', auth, tweetCreate)
userRoutes.post('/react', React)
userRoutes.delete('/delete/:id', auth, tweetDelete)



export default userRoutes