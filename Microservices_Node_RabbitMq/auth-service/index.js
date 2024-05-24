
const { MongoClient, ServerApiVersion } = require('mongodb');
const express=require ("express");
const app=express();
const PORT = process.env.PORT_ONE || 7070;
const User=require("./User");
const jwt=require("jsonwebtoken");
const mongoose = require('mongoose');
app.use(express.json());


const uri = "mongodb+srv://israelgochoa:CzwctzGkmbFtYWk2@clusterlearningmongodb.hwsccps.mongodb.net/?retryWrites=true&w=majority&appName=ClusterLearningMongoDB";
mongoose.connect(uri,
	{ useNewUrlParser: true, useUnifiedTopology: true,}
		);
//Register a new User
app.post("/auth/register",async(req,res)=>{
	const {email,password,name}=req.body;
	const userExist=await User.findOne({email});
	if(userExist){
		return res.json({message:"User already exist"});

	}else{
		const newUser= new User({
			email,
			password,
			name,
		});
		newUser.save();
		return res.json(newUser);
	}
});
app.post("/auth/login",async(req,res)=>{
	const {email,password}=req.body;
	const userExist=await User.findOne({email});
	if(!userExist){
		return res.json({message:"User doesn't exist"});
	}else{
		if(password!==userExist.password){
			return res.json({message:"password incorrect"});
		}
		const payload={
			email,
			name:userExist.name
		};
		jwt.sign(payload,
			"secret",
			(err,token)=>{if(err){console.log(err);}else{return res.json(token);}}
			);
	}
});
app.post("/auth/find", async(req, res) => {
  const { id } = req.body;
  
  try {
    const findUser = await User.findById(id).exec();
    return res.json(findUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error al buscar el usuario" });
  }
});

app.listen(PORT,()=>{
	console.log(`Auth-Service at ${PORT}`)
});