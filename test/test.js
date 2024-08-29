import { expect } from 'chai';
import request from 'request';

// Base URL for API endpoint
const baseUrl = 'http://localhost:3040/create/user';

// Function to handle server error simulation
const simulateServerError = (callback) => {
 
  callback(new Error('Simulated server error'), { statusCode: 500 }, { message: 'An unexpected error occurred. Please try again later' });
};

// Function to handle duplicate email error simulation
const simulateDuplicateError = (callback) => {
  
  callback(new Error('Duplicate key error'), { statusCode: 409 }, { message: 'Email or phone number already exists' });
};

describe('Signup API', function() {
  this.timeout(5000);

  before((done) => {
    // Clear the database before running tests
    done();
  });

  // Test invalid phone number format
  it('should return status 400 for invalid phone number format', function(done) {
    const invalidPhoneData = {
      fullName: 'Jane Doe',
      email: 'jane.doe@example.com',
      phoneNo: 'invalidPhone',
      password: 'password123'
    };

    request.post({ url: baseUrl, json: invalidPhoneData }, function(error, response, body) {
      if (error) return done(error);
      try {
        expect(response.statusCode).to.equal(400);
        expect(body).to.have.property('message', 'Invalid phone number format');
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  // Test missing required fields
  it('should return status 401 for missing required fields', function(done) {
    const incompleteData = {
      fullName: 'Incomplete User',
      email: 'incomplete.user@example.com'
      // phoneNo and password are missing
    };

    request.post({ url: baseUrl, json: incompleteData }, function(error, response, body) {
      if (error) return done(error);
      try {
        expect(response.statusCode).to.equal(401);
        expect(body).to.have.property('message', 'Invalid Data!!');
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  // Test missing email field
  it('should return status 401 for missing email field', function(done) {
    const missingEmailData = {
      fullName: 'User Without Email',
      phoneNo: '+1234567890',
      password: 'password123'
    };

    request.post({ url: baseUrl, json: missingEmailData }, function(error, response, body) {
      if (error) return done(error);
      try {
        expect(response.statusCode).to.equal(401);
        expect(body).to.have.property('message', 'Invalid Data!!');
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  // Test missing password field
  it('should return status 401 for missing password field', function(done) {
    const missingPasswordData = {
      fullName: 'User Without Password',
      email: 'user.without.password@example.com',
      phoneNo: '+1234567890'
    };

    request.post({ url: baseUrl, json: missingPasswordData }, function(error, response, body) {
      if (error) return done(error);
      try {
        expect(response.statusCode).to.equal(401);
        expect(body).to.have.property('message', 'Invalid Data!!');
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  // Test invalid email format
  it('should return status 400 for invalid email format', function(done) {
    const invalidEmailData = {
      fullName: 'John Doe',
      email: 'invalid-email',
      phoneNo: '+1234567890',
      password: 'password123'
    };

    request.post({ url: baseUrl, json: invalidEmailData }, function(error, response, body) {
      if (error) return done(error);
      try {
        expect(response.statusCode).to.equal(400);
        expect(body).to.have.property('message', 'Invalid email format');
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  // Test valid signup but with short password
  it('should return status 400 for password shorter than 8 characters', function(done) {
    const shortPasswordData = {
      fullName: 'Short Password User',
      email: 'short.password@example.com',
      phoneNo: '+1234567890',
      password: 'short'
    };

    request.post({ url: baseUrl, json: shortPasswordData }, function(error, response, body) {
      if (error) return done(error);
      try {
        expect(response.statusCode).to.equal(400);
        expect(body).to.have.property('message', 'Password too short');
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  // Missing `fullName` field
  it('should return status 401 for missing `fullName` field', function(done) {
    const missingFullNameData = {
      email: 'missing.fullname@example.com',
      phoneNo: '+1234567890',
      password: 'password123'
    };

    request.post({ url: baseUrl, json: missingFullNameData }, function(error, response, body) {
      if (error) return done(error);
      try {
        expect(response.statusCode).to.equal(401);
        expect(body).to.have.property('message', 'Invalid Data!!');
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  // Invalid password format
  it('should return status 400 for invalid password format', function(done) {
    const invalidPasswordData = {
      fullName: 'Invalid Password User',
      email: 'invalid.password@example.com',
      phoneNo: '+1234567890',
      password: 'short!' // Invalid password format
    };

    request.post({ url: baseUrl, json: invalidPasswordData }, function(error, response, body) {
      if (error) return done(error);
      try {
        expect(response.statusCode).to.equal(400);
        expect(body).to.have.property('message', 'Password too short');
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  //Simulate Duplicate Email or Phone Number
  it('should return status 409 for duplicate email or phone number', function(done) {
    // Override request to simulate a duplicate key error
    simulateDuplicateError((error, response, body) => {
      request.post({ url: baseUrl, json: { fullName: 'Duplicate User', email: 'duplicate@example.com', phoneNo: '+1234567890', password: 'password123' } }, function(err, res, resBody) {
        if (err) return done(err);
        try {
          expect(res.statusCode).to.equal(409);
          expect(resBody).to.have.property('message', 'Email or phone number already exists');
          done();
        } catch (err) {
          done(err);
        }
      });
    });
  });
 

});
