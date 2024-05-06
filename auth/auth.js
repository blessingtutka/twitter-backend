import data from  '../data.js'

function auth(req, res, next){
    let user = undefined
    if(data.user.login) user = data.user.username
    else res.status(403).json({error: "Unauthorized"})
    req.user = user
    next()
    
}

export default auth