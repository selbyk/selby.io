import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default EmberUploader.FileField.extend({
  url: '',
  filesDidChange: (function() {
    var _this = this;
    var uploadUrl = this.get('url');
    var files = this.get('files');

    var uploader = EmberUploader.S3Uploader.create({
      url: uploadUrl
    });

    uploader.on('didUpload', function(response) {
      // S3 will return XML with url
      var uploadedUrl = $(response).find('Location')[0].textContent;
      uploadedUrl = decodeURIComponent(uploadedUrl); // => http://yourbucket.s3.amazonaws.com/file.png

      var post = {
        "path": $(response).find('Key')[0].textContent,
        "url": uploadedUrl,
        "etag": $(response).find('ETag')[0].textContent
      };

      Ember.$.ajax('http://localhost:4200/api/files', {
        type: 'PUT',
        dataType: 'json',
        data: post,
        context: this,
        success: function(data) {
          console.log("file should be set");
        },
        error: function() {
          alert('Failed to save artist');
        }
      });

      console.log(response);
    });

    uploader.on('progress', function(e) {
      // Handle progress changes
      // Use `e.percent` to get percentage
      _this.get('controller').set('updateProgress', Math.round( e.percent ));
      console.log(e.percent);
    });

    if (!Ember.isEmpty(files)) {
      uploader.upload(files[0]); // Uploader will send a sign request then upload to S3
    }
  }).observes('files')
});
