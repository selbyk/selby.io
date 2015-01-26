// Parameters
//
// /sign?name=5854315625_2275398b48_o.jpg&size=1269959&type=image%2Fjpeg
//
// or
//
// POST /sign
// {
//   "name": "5854315625_2275398b48_o.jpg",
//   "size": 1269959,
//   "type": "image/jpeg"
// }
// Response
//
// {
//   "acl": "public-read",
//   "awsaccesskeyid": "AKIAJ7...",
//   "bucket": "sandbox",
//   "Cache-Control": "max-age=630720000, public",
//   "Content-Type": "image/jpeg",
//   "expires": "2014-03-10T20:05:20.054Z",
//   "key": "uploads/5854315625_2275398b48_o.jpg",
//   "policy": "eyJleHBpcmF0aW9uIjoiMj...",
//   "signature": "r4wPjMzQ3JT6t42rwn6...",
//   "success_action_status": "201"
// }
// These values tell the client-side where to post to, in order to make a successful request to S3.
// More info: https://github.com/benefitcloud/ember-uploader/wiki/S3-Server-Setup
// http://codeartists.com/post/36892733572/how-to-directly-upload-files-to-amazon-s3-from

var crypto = require('crypto');
var shasum = crypto.createHash('sha1');
var base64 = function(str){
  var buf = new Buffer(str).toString('base64');
  return buf;
};

// var s = fs.ReadStream(filename);
// s.on('data', function(d) {
//   shasum.update(d);
// });
//
// s.on('end', function() {
//   var d = shasum.digest('hex');
//   console.log(d + '  ' + filename);
// });
var S3_BUCKET_NAME = 'files-and-stuff'
var S3_SECRET_KEY = process.env.AWS_SECRET_ACCESS_KEY+""
var S3_ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID+""

module.exports = function(app, db) {
  // This URL will expire in one minute (60 seconds)
  app.get('/api/file/sign', function (req, res) {
    var params = {
        "name": req.query.name,
        "size": req.query.size,
        "type": req.query.type
    };

    // PUT request to S3 must start within 120 seconds
    var expires = new Date();
    expires.setMinutes(expires.getMinutes() + 2); // 2 minute later

    var objectName = params.name,
        amzHeaders = "x-amz-acl:public-read",
        mimeType = params.type;

    var bucketKey = "uploads/" + params.name; // directory/file path

    var policy= {
      expiration: expires,
      conditions: [
        { bucket: S3_BUCKET_NAME },
        { acl: 'public-read' },
        { expires: expires },
        { success_action_status: '201' },
        [ 'starts-with', '$key', '' ],
        [ 'starts-with', '$Content-Type', '' ],
        [ 'starts-with', '$Cache-Control', '' ],
        [ 'content-length-range', 0, 524288000 ]
      ]
    };

    var policy64 = base64(JSON.stringify(policy));

    var hash, hmac;
    hmac = crypto.createHmac('sha1', S3_SECRET_KEY);
    // change to 'binary' if you want a binary digest
    hmac.setEncoding('base64');
    // write in the text that you want the hmac digest for
    hmac.write(policy64);
    // you can't read from the stream until you call end()
    hmac.end(function(){
      // read out hmac digest
      hash = hmac.read();
      //console.log("The URL is", url);
      db.file.create({
        size: params.size,
        path: bucketKey,
        type: params.type,
        name: params.size,
        private: false
      }).then(function() {
        console.log('file ' + params.type + ' signed expires ' + expires);
        res.send({
          "acl": "public-read",
          "awsaccesskeyid": S3_ACCESS_KEY,
          "bucket": S3_BUCKET_NAME,
          "region": "us-west-2",
          "Cache-Control": "max-age=259200, public",
          //"AWSAccessKeyId": S3_ACCESS_KEY,
          "Content-Type": params.type,
          "expires": expires.toISOString(),
          "key": bucketKey,
          "policy": policy64,
          "signature": hash,
          "success_action_status": "201"
        });
      });
    });
  });

  app.post('/api/file/upload', function (req, res) {
    console.log('upload!');
    if (req.busboy) {
      console.log('busboy!');
      req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        console.log('file');
        console.log(fieldname, file, filename, encoding, mimetype);

        var newPath = "/uploads/";
        var fullPath = __dirname + newPath  + filename;
        fstream = fs.createWriteStream(fullPath);
          file.pipe(fstream);
          fstream.on('close', function(){
              var stats = fs.statSync(fullPath)
              var fileSizeInBytes = stats["size"];
              db.file.create({
                size: fileSizeInBytes,
                path: newPath,
                type: mimetype,
                encoding: encoding,
                name: filename,
                description: fieldname,
                private: false
              }).then(function() {
                console.log('file ' + filename + ' uploaded');
              });

              //files.push(filename);
          });
      });
      req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
        // ...
        console.log('field');
      });
      req.pipe(req.busboy);
      console.log('done');
      res.send('ok!');
    }
    //req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
      // ...
    //});
    /*fs.readFile(req.files.displayImage.path, function (err, data) {
      // ...
      var newPath = __dirname + "/uploads/" + req.files.;
      fs.writeFile(newPath, data, function (err) {
        res.redirect("back");
      });
    });*/
  });

  app.put('/api/files', function (req, res) {
    //var path = req.params.path;

    var params = {
        "path": req.body.path,
        "etag": req.body.size,
        "url": req.body.type
    };

    // search for attributes
    db.file.find({ where: {path: params.path} }).then(function(file) {
      // project will be the first entry of the Projects table with the title 'aProject' || null
      file.updateAttributes({
        etag: params.etag,
        url: params.url
      }).success(function() {});
    })
    res.send('ok!');
    //req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
      // ...
    //});
    /*fs.readFile(req.files.displayImage.path, function (err, data) {
      // ...
      var newPath = __dirname + "/uploads/" + req.files.;
      fs.writeFile(newPath, data, function (err) {
        res.redirect("back");
      });
    });*/
  });
};
