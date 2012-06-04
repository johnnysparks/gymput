describe('JsonFile', function() {
  var success   = false;
  var jfile;
  var log_file  = "prospects/2012/08/05/8h209j3g1jiawf00001.json";
  var log_data  = { name: "joe", phone: "1234", email: "jklh@afdoh", address: "hjl1234" };
  var callback  = function(e) { success = true; };
  _RISKY_MODE   = true;

  beforeEach(function(){
    runs(function(){
      jfile = new JsonFile();
    });
    waitsFor(function(){ return jfile.fs }, "Error initializing file system.", 500);
  });

  afterEach(function(){
    success = false;
  });

  it('loads the filesystem', function() {
    runs( function(){
      expect( success );
    });
  });

  it('creates a new log', function(){
    runs( function(){
      jfile.write( log_file, log_data, callback );
    });

    waitsFor(function(){ return success }, "jfile.write failed", 500);

    runs(function(){
      expect( success );
    });
    
  });

  it('reads a log file', function() {
    runs( function(){
      jfile.read( log_file, callback );
    });

    waitsFor(function(){ return success }, "jsfile.read failed", 500);

    runs( function() {
      expect(success);
    });

  });

  it('adds to a log file', function() {
    runs( function(){
      jfile.append( log_file, log_data, callback );
    });

    waitsFor(function(){ return success }, "jsfile.append failed", 500);

    runs( function() {
      expect(success);
    });
  });

  it('removes disk files', function() {
    runs( function(){
      jfile.wipeDisk( callback );
    });
    waitsFor(function(){ return success }, "jsfile.wipe failed", 500);

    runs( function() {
      expect(success);
    });
  });

});
