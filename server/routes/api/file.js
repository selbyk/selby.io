var AWS = require('aws-sdk');
AWS.config.region = 'us-west-2';
fs = require('fs');

module.exports = function(app, db) {
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
};
