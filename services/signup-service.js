import User from '../modal/signup-modal.js';

export const createObj = (payload) => {
    return new User({
        fullName: payload.fullName, 
        email: payload.email,
        phoneNo: payload.phoneNo,
        password: payload.password
    });
};

export const saveData = (obj) => {
    return obj.save();
};
