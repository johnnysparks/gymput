/**
* JsonFile Class
*  Interface for reading and writing json objects to file
*/
var JsonFile = Koi.define({
  last_error: null,
  fs        : false,
/**
* init - sets up 
*  @param {object}    options:    option object containing all available settings
*    @param {String}  api_key:    the connection token for mongohq
*    @param {String}  db:         database name
*    @param {String}  collection: collection name
*/
  init: function(options){
    options = options || {};
    this.path = options.path;
    self = this;
    self.fs = false;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, self.fsReady, self.fsError);
  },

  fsReady: function( fileSystem ){
    self.fs = fileSystem;
    console.log( self.fs );
    console.log( self.fs.root );
  },

  fsError: function( e ){
    self.last_error = e;
    console.log( e );
  },

  overwrite: function(path, data) {
    self.ensureFilePath(path, callback);
  },

  append: function(path, data) {

  },

  ensureFilePath: function(path, callback) {
    // look through directories, make them if they don't exist
    var dirs     = path.split('/');
    var filename = dirs[ dirs.length - 1];
    dirs.pop(); // remove filename
    callback();
  },
  load: function(){},

  ls: function(path) {},

});
