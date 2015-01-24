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

var S3_BUCKET_NAME = 'files-and-stuff'
var S3_SECRET_KEY = process.env.AWS_SECRET_KEY
var S3_ACCESS_KEY = process.env.AWS_ACCESS_KEY

module.exports = function(app, db) {
  // This URL will expire in one minute (60 seconds)
  app.post('/sign', function (req, res) {
    var params = {
        "name": "5854315625_2275398b48_o.jpg",
        "size": 1269959,
        "type": "image/jpeg"
    };

    var objectName = params.name,
        amzHeaders = "x-amz-acl:public-read",
        mimeType = params.type,
        expires = Time.now.to_i + 100; // PUT request to S3 must start within 100 seconds

    var stringToSign = "PUT\n\n" +
        mimeType + "\n" +
        expires + "\n" +
        amzHeaders + "\n" +
        "S3_BUCKET_NAME" + objectName;

    console.log("The URL is", url);
  });
};

// Rails Setup
//
// def sign
//   @expires = 10.hours.from_now
//   render json: {
//     acl: 'public-read',
//     awsaccesskeyid: ENV['AWS_ACCESS_KEY_ID'],
//     bucket: 'sandbox',
//     expires: @expires,
//     key: "uploads/#{params[:name]}",
//     policy: policy,
//     signature: signature,
//     success_action_status: '201',
//     'Content-Type' => params[:type],
//     'Cache-Control' => 'max-age=630720000, public'
//   }, status: :ok
// end
// Signature is base64-encoded JSON that creates a digest for S3 secret tokens based on the policy.
//
// def signature
//   Base64.strict_encode64(
//     OpenSSL::HMAC.digest(
//       OpenSSL::Digest::Digest.new('sha1'),
//       ENV['AWS_SECRET_ACCESS_KEY'],
//       policy({ secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'] })
//     )
//   )
// end
// Policy is base64-encoded JSON that is used by S3 to validate that the file is the same as the one attached.
//
// def policy(options = {})
//   Base64.strict_encode64(
//     {
//       expiration: @expires,
//       conditions: [
//         { bucket: 'sandbox' },
//         { acl: 'public-read' },
//         { expires: @expires },
//         { success_action_status: '201' },
//         [ 'starts-with', '$key', '' ],
//         [ 'starts-with', '$Content-Type', '' ],
//         [ 'starts-with', '$Cache-Control', '' ],
//         [ 'content-length-range', 0, 524288000 ]
//       ]
//     }.to_json
//   )
// end
