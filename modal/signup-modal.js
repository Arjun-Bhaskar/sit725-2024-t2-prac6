
import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phoneNo: {
        type: String, 
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export default mongoose.model('User', userSchema);
