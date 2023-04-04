export const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
}


export const onlyLetters = (str) => {
    return /^[A-Za-z ]*$/.test(str);
}


export const onlyNumbers = (str) => {
    return /^[0-9]*$/.test(str);
}

export const ifEmpty = (str) => {//return true if str is empty
    return str === '';
}

export const checkPassword = (pass1, pass2)=>{
    if(pass1 !== pass2) {return "Passwords must be equal";}
    if(pass1 === "" || pass2 === "") {return "Fill the password please!";}
    if(pass1.length < 8 || pass2.length < 8) {return "Password length must be atleast 8 characters!";}
    if(pass1.length > 15 || pass2.length > 15) {return "Password length must not exceed 15 characters";}
    return "true";
}