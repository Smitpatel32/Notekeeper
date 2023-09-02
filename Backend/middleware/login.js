var jwt = require('jsonwebtoken');
const JWT_STRING = "Satuupatuu";

// Gets user id from the authtoken
const fetchToken = (req,res,next) =>{
    const token = req.header("authToken");
    if(!token)
    {
        res.status(401).send({error :"Access denied!"});
    }
    try {
        const data = jwt.verify(token,JWT_STRING)
        req.user = data.user;
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send({error :"Access denied!"});
    }
}
module.exports = fetchToken;