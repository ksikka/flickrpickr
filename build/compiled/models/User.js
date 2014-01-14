var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var UserSchema = new Schema({

    name: String,

    email: String,

    username: String,

    hashed_password: String,

    salt: String,

});



UserSchema.methods.authenticate = function (plainText) {
  /**
   * Authenticate by checking the hashed password and provided password
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api private
   */
    return this.encryptPassword(plainText) === this.hashed_password;
  };


UserSchema.methods.makeSalt = function () {
  /**
   * Create password salt
   *
   * @return {String}
   * @api private
   */

    /* Then to regenerate password, use:
        this.salt = this.makeSalt()
        this.hashed_password = this.encryptPassword(password)
    */
    return Math.round((new Date().valueOf() * Math.random())) + '';
  };


UserSchema.methods.encryptPassword = function (password) {
  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api private
   */
    var crypto = require('crypto');
    if (!password) return '';
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
  };


UserSchema.methods.resetToken = function (token, cb) {
  /**
   * Reset auth token
   *
   * @param {String} token
   * @param {Function} cb
   * @api private
   */
    var self = this;
    var crypto = require('crypto');
    crypto.randomBytes(48, function(ex, buf) {
      self[token] = buf.toString('hex');
      if (cb) cb();
    });
  };




UserSchema.statics.signup = function (username, password, password2, callback) {
        if (password !== password2) {
            callback('Passwords don\'t match. Please try again.');
        }
        var user = new this({username: username});
        user.salt = user.makeSalt();
        user.hashed_password = user.encryptPassword(password);
        user.save(function(err, data) {
            if (err) {
                callback(err);
            } else {
                callback(null, {url:'?success=true'});
            }
        });
    };




(function (schema) {
  schema.path('name').validate(function (name) {
    return name.trim().length > 0;
  }, 'Please provide a valid name');
})(UserSchema);


(function (schema) {
  schema.path('email').validate(function (email) {
    return email.trim().length > 0;
  }, 'Please provide a valid email');
})(UserSchema);


(function (schema) {
  schema.path('hashed_password').validate(function (hashed_password) {
    return hashed_password.length > 0;
  }, 'Please provide a password');
})(UserSchema);


exports.User = mongoose.model('User', UserSchema);
