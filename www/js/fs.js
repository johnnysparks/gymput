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
    self.fs = fileSystem;
  },

  fsError: function( e ){
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

  list: function(callback){
    var reader = self.fs.root.createReader();
    var read_callback = function( entries ){
      for( i in entries ){ 
        if( _RISKY_MODE ){ print( entries[i].name );}
        self.last_list.push( entries[i].name );
      }
      callback( entries );
    }

    self.last_list = [];
    reader.readEntries(read_callback, self.fsError);
  },

  ensurePath: function(dir, callback) {
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

  writeLog: function(path, data, callback){
    var fileName = path.split('/').pop();
    self.ensurePath( path, function( fsDir ){                                  // ensure the path
      fsDir.getFile( fileName, {create:true}, function( fileEntry ){           // create a file writer for that directory
        fileEntry.createWriter( function( fileWriter ){                        // write the file contents
          fileWriter.onwrite = callback;                                       // final callback
          fileWriter.write( JSON.stringify(data) );
        }, self.fsError);
      }, self.fsError);
    });
  }

});

function print( string ){
  if( typeof string == "string"){
    $('body').append( '<p>' + string + '</p>') ;
  } else {
    p = "";
    for( i in string ){
      p += String(string[s]);
    }
    $('body').append( '<p>' + p + '</p>') ;
  }
}
