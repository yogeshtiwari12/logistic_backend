import mongoose  from 'mongoose';
const ratemodel  = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    comment:{
        type: String,
        required: true
    },
    
    terms:{
        type: Boolean,
        required: true
    }
    
})

export const Req = mongoose.model('Req',ratemodel)
export default Req