const db = require( "./ConnectionDatabase");
require('dotenv').config();//to .env file

const jwt = require('./jwt');

//new client register
 const Register = async (data)=>{
    return new Promise((resolve,reject) =>
    {
        const name = data.name;
        const email = data.email;
        const phone = data.phone;
        const select = data.select;
        const password = data.password1;

        let tokenPassword = jwt.createEncryptedPassword(password);//Make the password an encrypted password


        let typeClient = "manager_customer";
        if(select === 1)
        {
            typeClient = "single_customer"
        }
   
        db.database.query("INSERT INTO " + typeClient + " (name, email, phone, password) VALUES(?,?,?,?)",
         [name, email, phone, tokenPassword],
         function(err, data){
            if(err)
            {
                if (err.sqlState === "23000")
                {
                    resolve (err.sqlState);//return 23000
                }
                
            }
            else
            {
                resolve('success');
            }
         }
         );
    })  
}
//=====================================
const checkUserLogin = async (data)=>
{
    return new Promise((resolve,reject) =>
    {
        let email = data.email;
        let password = data.password;
        let select = data.select;

        let tokenPassword = jwt.createEncryptedPassword(password);//Make the password an encrypted password


        let typeClient = "manager_customer";
        if(select === 1)
        {
            typeClient = "single_customer"
        }
        db.database.query("SELECT EXISTS (SELECT * FROM " + typeClient + " WHERE email = ? AND password = ?)",
        [email, tokenPassword],
        function(err, result, fields){
            if(err)
            {
                reject(err);                
            }
            else
            {
                let responsive = Object.values(result[0])[0];
                resolve(responsive);
            }
         }
         )
        
        
        })
}

//=====================================
const ifEmailExists = async (data)=>
{
    return new Promise((resolve,reject) =>
    {
        let select = data.select;
        let email = data.email;

        let typeClient = "manager_customer";
        if(select === 1)
        {
            typeClient = "single_customer"
        }

        db.database.query("SELECT EXISTS (SELECT * FROM " + typeClient + " WHERE email = ?)",
            [email],
            function(err, result, fields){
                if(err)
                {
                    reject(err);                
                }
                else
                {

                    let responsive = Object.values(result[0])[0];
                    resolve(responsive);
                }
            })
    })
}
module.exports = {Register, checkUserLogin, ifEmailExists};