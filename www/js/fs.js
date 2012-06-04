/**
* JsonFile Class
*  Interface for reading and writing json objects to file
*  Note: only supports first level directories
*     log  folders will be named log_YY_MM
*     data folders will be named prospects_YY_MM
*/
var JsonFile = Koi.define({
  last_error: null,
  fs        : false,
  last_list : false,

  init: function(options){
    options = options || {};
    self = this;
    self.fs = false;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, self.fsReady, self.fsError);
  },

  fsReady: function( fileSystem ){
    //var self = this;
    self.fs = fileSystem;
  },

  fsError: function( e ){
    alert("error");
    //var self = this;
    var errors = { 
      "NOT_FOUND_ERR"                : FileError.NOT_FOUND_ERR,
      "SECURITY_ERR"                 : FileError.SECURITY_ERR,
      "ABORT_ERR"                    : FileError.ABORT_ERR,
      "NOT_READABLE_ERR"             : FileError.NOT_READABLE_ERR,
      "ENCODING_ERR"                 : FileError.ENCODING_ERR,
      "NO_MODIFICATION_ALLOWED_ERR"  : FileError.NO_MODIFICATION_ALLOWED_ERR,
      "INVALID_STATE_ERR"            : FileError.INVALID_STATE_ERR,
      "SYNTAX_ERR"                   : FileError.SYNTAX_ERR,
      "INVALID_MODIFICATION_ERR"     : FileError.INVALID_MODIFICATION_ERR,
      "QUOTA_EXCEEDED_ERR"           : FileError.QUOTA_EXCEEDED_ERR,
      "TYPE_MISMATCH_ERR"            : FileError.TYPE_MISMATCH_ERR,
      "PATH_EXISTS_ERR"              : FileError.PATH_EXISTS_ERR
    }
    var message = "unknown error";
    for( code in e ){
      for( key in errors ){
        if( errors[key] == e[code] ) { message = key; }
      }
    }
    $('body').append( '<p style="color:red;">sf_error: ' + message + '</p>') ;
  },

  ensurePath: function(dir, callback) {
    //var self = this;
    var path = dir.split('/');
    var get_dir = function( fsDir ){
      if( path.length == 1 ){
        callback( fsDir );
      } else {
        var name = path.shift();
        fsDir.getDirectory(name, {create:true}, get_dir , self.fsError);
      }
    }
    get_dir( self.fs.root );
  },

  write: function(path, data, callback ){
    //var self = this;
    self.openFile( path, function( fileEntry ){
      fileEntry.createWriter( function( fileWriter ){                        // write the file contents
        fileWriter.onwrite = callback;                                       // final callback
        fileWriter.write( JSON.stringify(data) );
      }, self.fsError);
    });
  },

  read: function( path, callback ){
    //var self = this;
    self.openFile( path, function( fileEntry ){
      var fileReader = new FileReader();
      fileReader.onloadend = function( e ){
        if( e.target.result === "" ){
          callback( [] );
        } else {
          callback( JSON.parse( e.target.result ) );                                       // final callback
        }
      }
      fileReader.readAsText( fileEntry );
    });
  },

  openFile: function( path, callback ){
    //var self = this;
    var fileName = path.split('/').pop();
    self.ensurePath( path, function( fsDir ){                                  // ensure the path
      fsDir.getFile( fileName, {create:true}, function( fileEntry ){           // create a file writer for that directory
        callback( fileEntry );
      }, self.fsError);
    });
  },

  append: function( path, addData, callback ){
    //var self = this;
    self.read( path, function( readData ){
      if( readData instanceof Array ){
        readData.push( addData );
      } else {
        readData = [ addData ];
      }
      self.write( path, readData, callback );
    });
  },

  wipeDisk: function( callback ){
    if( !_RISKY_MODE ) return false;
    //var self = this;
    var reader = self.fs.root.createReader();
    reader.readEntries( function( entries ){
      var wipe = function( entries ){
        if( entries.length == 0 ){ callback(); return true; }
        entry = entries.pop();
        entry.removeRecursively( function(){
          wipe( entries );
        }, self.fsError);
      }
      wipe( entries );
    }, self.fsError); 
  }
});
