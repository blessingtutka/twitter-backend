
import data from "../data.js"

export  function tweetsList(req, res) {
    try{
        const tweets = [...data.user.tweets, ...data.tweets]
        if(tweets[0]) res.status(200).json(tweets)
        else res.status(404).json({message:"Not Tweet Found"})

    }
    catch(error){
        res.status(500).json({"error": error.message})
    }

}


