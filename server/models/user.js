const Mongoose = require("Mongoose");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const salt_I =10;

const userSchema = Mongoose.Schema({
	email:{
		type:String,
		required:true,
		trim:true,
		unique:1
	},
	password:{
		type:String,
		required:true,
		minlength:6,

	},
	token:{
		type:String
	}
})

userSchema.pre('save',function(next){
	var user = this;

	if(user.isModified('password')){

		bcrypt.genSalt(salt_I,(err,salt)=>{
		if(err) return next(err);
		bcrypt.hash(user.password,salt,(err,hash)=>{
			if(err) return next(err);
			user.password = hash;
			next()
		})
	})

	}else{
		next()
	}

	
})

userSchema.methods.comparePasswords =function(canPass,cb){

	bcrypt.compare(canPass,this.password,function(err,isMatch){
		if(err) return cb(err);
		cb(null,isMatch )
	})
}

userSchema.methods.createToken = function(cb){
	var user = this;
	var token = jwt.sign(user._id.toHexString(),'superSecret');

	user.token = token;
	user.save((err,user)=>{
		if(err) return cb(err);
		cb(null,user)
	})
}

userSchema.statics.findByToken = function(token,cb){ 
	const user = this;

	jwt.verify(token,'superSecret',function(err,decode){
		user.findOne({'_id':decode,'token':token},function(err,user){
			if(err) return cb(err);
			cb(null,user)
		})
	})
}



const User = Mongoose.model('User', userSchema);


module.exports = { User }