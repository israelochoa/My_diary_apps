const mongoose=require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
  name: String,
  email: String,
  password: String,
  created_at: {
    type: Date,
    default:Date.now(),
    
  },
});


module.exports=User=mongoose.model('user', userSchema);