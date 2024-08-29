import mongoose from 'mongoose';

export const connectDB = () => {
    mongoose.connect("mongodb+srv://gagandeep315:Arjun6298@cluster0.k3kkzem.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
        useNewUrlParser: true
    }).then(() => {
        console.log("connection done");
    }).catch((err) => {
        console.log("error", err);
    });
};
