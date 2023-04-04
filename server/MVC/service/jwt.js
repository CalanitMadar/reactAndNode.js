const jwt = require('jsonwebtoken');
const jwt_key = process.env.JWT_KEY;

//=====================================================
//create encrypted password
const createEncryptedPassword =  (password)=>
{
    let token = jwt.sign(password, jwt_key);
    return token;
}
//=====================================================
const tokenRelease =  (token)=>
{
    let password = jwt.verify(token, jwt_key);
    return password;
}



module.exports = {createEncryptedPassword, tokenRelease};
