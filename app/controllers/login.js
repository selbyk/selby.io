import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

export default Ember.Controller.extend(LoginControllerMixin, {
  authenticator: 'simple-auth-authenticator:oauth2-password-grant',
  password: function(){
    var hash = CryptoJS.SHA3(this.get('passwordInput'), { outputLength: 256 });
    //alert(hash.toString(CryptoJS.enc.Base64));
    return hash.toString(CryptoJS.enc.Base64);
  }.property('passwordInput'),
});
