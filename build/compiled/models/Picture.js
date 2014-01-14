var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var PictureSchema = new Schema({

    datePicked: Date,

    name: String,

    url: String,

});



PictureSchema.methods.updateUrl = function (newUrl, cb) {
      this.url = newUrl;
      this.save(function(e, d){cb(e,d);});
    };




PictureSchema.statics.randomNFromFlickr = function (searchQ, limit, cb) {
      var flickr = require('flickr');
      var fcli = new flickr.Flickr('cbe3f7f6cbf9d13ad243a1e1afec902d', '5c3f9a33e088ef60');
      fcli.executeAPIRequest('flickr.photos.search', {text: searchQ, per_page: limit, extras: ['url_q']},
                               false, function(e, d){cb(e, d);});
    };


PictureSchema.statics.createPicture = function (data, callback) {
    // Calls the mongoose create method of this model. Add validation logic here.
    return this.create(data, callback);
};


PictureSchema.statics.findPicture = function (conditions, callback) {
    // Calls the mongoose find method of this model. Add validation logic here.
    return this.find(conditions, callback);
};




exports.Picture = mongoose.model('Picture', PictureSchema);
