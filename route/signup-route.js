import signupController from '../controller/signup-controller.js'; // Update the relative path


export default (app) => {
    app.post('/create/user', signupController);
};
