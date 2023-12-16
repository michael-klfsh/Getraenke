const User = function(user) {
  this.vorname = user.title;
  this.nachname = user.nachname;
  this.isFaho = user.isFaho;
  this.zimmerNr = user.zimmerNr;
  this.splitwise = user.splitwise;
  this.email = user.email;
};
  
module.exports = User;