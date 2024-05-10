import { Router } from "express";
import { user, userInfo, UserTweetsList, tweetCreate, tweetDelete } from "../controllers/user.controllers.js";
import auth from "../auth/auth.js";

let userRoutes = Router()

userRoutes.get('/user', user)
userRoutes.get('/user/:username', userInfo)
userRoutes.get('/tweets/:username', UserTweetsList)
userRoutes.post('/tweet', auth, tweetCreate)
userRoutes.delete('/delete/:id', auth, tweetDelete)



export default userRoutes