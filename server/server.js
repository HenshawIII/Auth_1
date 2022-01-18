const express = require("express");
const bP = require("body-parser");
const Mongoose = require("Mongoose");
// const bcrypt = require('bcrypt')
const cookieP = require("cookie-parser")

Mongoose.Promise= global.Promise;
const url = "mongodb+srv://ifeoluwa:NDNs3hUkif@vLMw@cluster0.dhohd.mongodb.net/Auth?retryWrites=true&w=majority" || "mongodb://localhost:27017/auth";

Mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
const app = express();

const {auth} = require('./middleware/auth')
const {User} = require('./models/user.js')
app.use(bP.json());
app.use(cookieP())


 
app.post("/api/user",(req,res)=>{
	const user = new User({
		email:req.body.email,
		password:req.body.password
	})
 user.save((err,doc)=>{
	if (err) {console.log(err)
		return res.send(err);
		}
	 // {res.sendStatus(200).json(doc).end();}
	res.send(doc)
	
})

})

app.post('/api/user/login',(req,res)=>{
User.findOne({'email':req.body.email},(err,doc)=>{
	if(!doc)return res.json({message:"User not found"});
	// res.sendStatus(200).json(doc)
	doc.comparePasswords(req.body.password,(err,isMatch)=>{
		if(err) throw(err);
		if(!isMatch) return res.json({message:"Wrong Password"});
		// res.send(isMatch);
		doc.createToken((err,user)=>{
			if(err) return res.send(err);
			return res.cookie('Token',user.token).send('ok')
		})
	})
})
})

app.get('/user/profile',auth,(req,res)=>{
	// let token = req.cookies.Token;
	// // console.log(token);

	// User.findByToken(token,(err,user)=>{
	// 	// console.log(user)
	// 	if(err) throw err;
	// 	if(!user) return res.send("Unauthorized user");
	// 	console.log(user);
	// 	res.send("You have access ")

	// })

	// res.send('done');
	console.log('done')

})

const port = process.env.PORT || 3380

app.listen(port,()=>{
	console.log(`Started on port:${port}`)
})