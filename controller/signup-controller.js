import * as signUpService from '../services/signup-service.js'; 

const isValidPhoneNumber = (phoneNo) => {

    const phoneRegex = /^\+?(\d[\d\s-()]{8,15}\d)$/;
    return phoneRegex.test(phoneNo);
};

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isValidPassword = (password) => {
    return password.length >= 8;
};

export default async (req, res) => {
    const { fullName, email, phoneNo, password } = req.body;


    if (!fullName || !email || !phoneNo || !password) {
        return res.status(401).json({ message: "Invalid Data!!" });
    }

    if (!isValidPhoneNumber(phoneNo)) {
        return res.status(400).json({ message: "Invalid phone number format" });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    if (!isValidPassword(password)) {
        return res.status(400).json({ message: "Password too short" });
    }

    try {
        
        const obj = signUpService.createObj({ fullName, email, phoneNo, password });

        
        const user = await signUpService.saveData(obj);

        
        res.status(200).json({
            message: "Data added successfully",
            fullName: user.fullName,
            email: user.email,
            phoneNo: user.phoneNo,
        });
    } catch (err) {
        if (err.code === 11000) { 
            return res.status(409).json({ message: "Email or phone number already exists" });
        }
        
        
        console.error('Error details:', err);
        return res.status(500).json({ message: "An unexpected error occurred. Please try again later" });
    }
};
