const bcrypt = require('bcrypt');

const encryptPassword = async (password) => {
  try {
    var hashPwd = await bcrypt.hash(password, salt);
    const salt = await bcrypt.genSalt(10)
    
  } catch (error) {
    console.log(error);
  }
  return hashPwd;
};


const comparePassword = async (password , hashedPassword) => {
   var isCorrect = await bcrypt.compare(password, hashedPassword)
   return  isCorrect 
}



module.exports = { encryptPassword , comparePassword };
