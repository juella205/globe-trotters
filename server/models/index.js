const User = require('./User');
const City = require('./City');
const Activity = require('./Activity');

const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/globetrotters-guide';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected successfully to the database');
    saveUser();
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });
  const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
  });
  const User = mongoose.model('User', userSchema);

  function saverUser() {
    const newUser = new User ({
        username:'',
        email: '',
        password: ''
    });
    newUser.save()
    .then((savedUser) => {
      console.log('User saved successfully:', savedUser);
      mongoose.connection.close();
    })
    .catch((error) => {
      console.error('Failed to save the user:', error);
      mongoose.connection.close();
    });
  }























module.exports = { User, City, Activity };