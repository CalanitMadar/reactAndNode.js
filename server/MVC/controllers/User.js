const user = require("../service/UserTable");
const valid = require("../validation/validationForm");
const mail = require('../mail/mail')

//validation and create new client
const register = async (req, res) => {
    //validation of the data

    let a = valid.checkPassword(req.body.password1, req.body.password2);

    if(!valid.isValidEmail(req.body.email) || 
    !valid.onlyLetters(req.body.name) || 
    !valid.onlyNumbers(req.body.phone) ||
    !valid.onlyNumbers(req.body.select) ||
    valid.ifEmpty(req.body.email) || 
    valid.ifEmpty(req.body.name) || 
    valid.ifEmpty(req.body.phone) || a !== 'true')
    {
        res.send("data faild");
    }
    else{

        let data = await user.Register(req.body);

        if(data === "23000"){//if error is 23000, it means that email exist in database
            res.send("23000");
        }
        if(data === "success"){//
            res.send("success");
        }
    }
    
}
//===========================================================
// For login page
const login = async (req, res) => {

    if(!valid.isValidEmail(req.body.data.email) || //validation in server side
        valid.ifEmpty(req.body.data.email) || !valid.onlyNumbers(req.body.data.select)) 
        {
            res.send("data faild");
        }
    else
    {
        let response = await user.checkUserLogin(req.body.data);
        if(response === 1)
        {
            res.send("success");
        }
        if(response === 0)//Invalid password or email
        {
            res.send("faild");
        }
    }
}
//===================================================
const forgetPassword = async (req, res) => {
    let response =  await user.ifEmailExists(req.body.data);
    if(response === 1)
    {
        res.send('ok');
        //mail.sendEmail(req.body.data.email);
    }
    if(response === 0)//email not found
    {
        res.send("email not found");
    }
}
//===================================================
const sendEmail = async (req, res) => {
    let passcode;
    if(req.body.data.message === 'password')
    {
        passcode = Math.floor(Math.random() * 100000);
        passcode = passcode.toString();
        req.body.data.message = ' שלום רב, זוהי הסיסמא שלך יש להקיש אותה במערכת ' + passcode ;
    }
    let resp = await mail.sendMail(req.body.data);
    res.send(resp);
}

module.exports =  {
    register,
    login,
    forgetPassword,
    sendEmail
};