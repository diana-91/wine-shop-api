const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const FIRST_ADMIN = 'admin@wineshop.com';
const ROLE_ADMIN = 'ADMIN';
const ROLE_GUEST = 'GUEST';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    required: [true, 'Email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'User needs a password']
  },
  name: {
    type: String
  },
  lastname: {
    type: String
  },
  telephone: {
    type: Number
  },
  address: {
    type: String
  },
  location: {
    type: String
  },
  role: {
    type: String,
    enum: [ROLE_GUEST, ROLE_ADMIN],
    default: ROLE_GUEST
  }
},
{
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      return ret;
    }
  }
});

userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  if (user.isAdmin()) {
       user.role = 'ADMIN';
   }

  bcrypt.genSalt(SALT_WORK_FACTOR)
    .then(salt => {
      bcrypt.hash(user.password, salt)
        .then(hash => {
          user.password = hash;
          return next();
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
}

userSchema.methods.isAdmin = function() {
    return this.username === FIRST_ADMIN || this.role === ROLE_ADMIN;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
