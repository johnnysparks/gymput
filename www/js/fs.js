/**
* JsonFile Class
*  Interface for reading and writing json objects to file
*/
var JsonFile = Koi.define({
  last_error: null,
  fs        : false,

  init: function(options){
    options = options || {};
    this.path = options.path;
    self = this;
    self.fs = false;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, self.fsReady, self.fsError);
  },

  fsReady: function( fileSystem ){
    self.fs = fileSystem;
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
    var dirs = path.split('/');
    dirs.pop(); // remove filename
    var d = self.fs.root.getDirectory(dirs.join('/'), {create:true}, callback, console.log);
  },
  load: function(){},

  ls: function(path) {},

});
