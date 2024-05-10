import data from "../data.js"


let getDay = () =>{
    const now = new Date();
    const month = now.toLocaleString('en-US', { month: 'short' });
    const day = now.getDate().toString().padStart(2, '0');

    return `${month} ${day}`;
}

let userMixin = (data) => {
    let userData = {
        name: data.user.name,
        username: data.user.username,
        bio: data.user.bio,
        profile: data.user.profile
    }
    return userData
}

export  function userInfo(req, res) {
    const username = req.params.username
    try{
        
        let tweets = [...data.user.tweets,...data.tweets]
        let tweet = tweets.find(t => t.user.username == username)
        if(tweet){

            res.status(200).json(userMixin(tweet))
        }
        else if(data.user.username == username){

            res.status(200).json(userMixin(data))
        }

        else res.status(403).json({message:"Unauthorized"})

    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

export  function user(req, res) {
    
    try{
        
        let user = data
        if(user.user){

            res.status(200).json(userMixin(user))
        }

        else res.status(403).json({message:"Unauthorized"})

    }

    catch(error){
        res.status(500).json({error:error.message})
    }
}

export  function UserTweetsList(req, res) {
    const username = req.params.username
    try{
        let tweets = [...data.user.tweets,...data.tweets]
        let userTweets = tweets.filter(t => t.user.username == username)
        if(userTweets[0]) res.status(200).json(userTweets)
        else res.status(404).json({message:"Not Tweet Found"})

    }
    catch(error){
        res.status(500).json({"error": error.message})
    }

}

export  function tweetCreate(req, res) {
    // let username = req.username
    try{
        const { id, name, username, bio, profile, tweets } = data.user;

        if (!req.body.text || req.body.text.length > 180) {
            return res.status(400).json({ error:"Bad Request",message: "Tweet text is required and must be under 180 characters" });
        }
      
        let tweet = {
            user: {
                id:id,
                name: name,
                username: username,
                bio: bio,
                profile: profile,
            },
            created_at: getDay(),
            text: req.body.text,
            image: req.body.image || null,
            data: {
                reply: 0,
                retweet: 0,
                react: {amount:0, state:false}
            }
        }
        let userTweets = [tweet,...tweets]
        data.user.tweets = userTweets
        res.status(201).json({message:"Tweet Create successfully", data:tweet})
    }
    catch(error){
        res.status(500).json({"error": error.message})
    }
}

export  function tweetDelete(req, res) {
    const id = req.params.id
    let username = req.user
    try{
        if(username == data.user.username){
            let userTweets = [...data.user.tweets]
            let tweet = userTweets.find((a) => a.id==id)//Return an array
            const index = userTweets.indexOf(tweet)
            // data.splice(index,1)
            if(tweet) {
                delete tweet[index]
                res.status(201).json({message:`Tweets ${id} Deleted successfully`})
            }

            else res.status(404).json({message:"Tweets Not Found"})
        }
        else res.status(403).json({message:"Unauthorized"})

    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}



export  function React(req, res) {
    try{
        
        const { id , user , liked } = req.body
        
        if ( !id || !user || liked==undefined ) {
            return res.status(400).json({ error:"Bad Request" });
        }
        else {
            const tweet = ( data.user.username == user ? data.user.tweets : data.tweets).find(
                (tweet) => tweet.id === id
              );

            if(tweet) {
                let likes = tweet.data.react.amount
                let state = false
                if(req.body.liked == true){
                    likes = Math.max(0, likes - 1)
                    state = false
                }
                else{
                    likes += 1
                    state = true
                }
    
                tweet.data.react.amount = likes
                tweet.data.react.state = state
                const tweetIndex =  data.user.username == user ? data.user.tweets.indexOf(tweet) : data.tweets.indexOf(tweet)
                data.user.username == user ? data.user.tweets[tweetIndex] == tweet : data.tweets[tweetIndex] == tweet
                res.status(200).json(tweet)
            }
            else res.status(404).json({message:"Not Tweet Found"})
        }

    }
    catch(error){
        res.status(500).json({"error": error.message})
    }

}

