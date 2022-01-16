const {User} = require('./../models/user');


let auth = (req,res,next) =>{
	let token = req.cookies.Token;
	// console.log(token);

	User.findByToken(token,(err,user)=>{
		// console.log(user)
		if(err) throw err;
		if(!user) return res.send("Unauthorized user");
		console.log(user);
		res.send("You have access ")
		// req.token = token;

		next()

	})

}


module.exports = {auth}