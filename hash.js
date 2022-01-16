const bcrypt = require('bcrypt');
const {MD5} = require('crypto-js');
const jwt = require('jsonwebtoken');


// bcrypt.genSalt(10,(err,salt)=>{
// 	if(err) return next(err);
// 	// console.log(salt)
// bcrypt.hash("password123",salt,(err,hash)=>{
// 	if (err) return next(err);
// 	console.log(hash)
// })

// })

// const secretPass = 'mySecretP';
// const secretSalt = 'djjdijidjidji';

// const user = {
// 	id:1,
// 	token:MD5('gsgsgdujij').toString() + secretSalt
// }

// const receivedToken = 'cffa8692db688baa245b3bc2c2f79afadjjdijidjidji';

// if(receivedToken===user.token){
// 	console.log('Move forward')
// }

// console.log(user)

const id = 1000;
const secret = "supersecret";
const receivedToken="eyJhbGciOiJIUzI1NiJ9.MTAwMA.L9PmEqLlZjettygguzj25agunJu6NkvVtG9RFRBnK2Y";
const decodeToken = jwt.verify(receivedToken,secret)



const token =jwt.sign(id,secret);
console.log(decodeToken)
