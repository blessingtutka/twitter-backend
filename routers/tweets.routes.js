import { Router } from "express";

import { tweetsList } from "../controllers/tweets.controllers.js";

let tweetRoutes = Router()

tweetRoutes.get('/', tweetsList)

export default tweetRoutes