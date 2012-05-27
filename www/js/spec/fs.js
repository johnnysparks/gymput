describe('JsonFile', function() {
  var success       = false;
  var jfile;
  var log_file      = "logs/2012/05/events.json";
  var log_data      = { type: "event", time: 123478912, user: "mongo hash", action: "started app", details: {}};
  var prospect_file = "prospects/2012/08/05/8h209j3g1jiawf00001.json";
  var prospect_data = { name: "joe", phone: "1234", email: "jklh@afdoh", address: "hjl1234" };
  var callback      = function(e) { success = true; };
  var _RISKY_MODE   = true;

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
      expect( jfile.fs );
    });
  });

  it('creates a new log', function(){
    runs( function(){
      jfile.writeLog( log_file, log_data, callback );
    });

    waitsFor(function(){ return success }, "jfile.writeLog failed", 500);

    runs(function(){
      expect( success );
    });
    
  });

  it('reads a log file', function() {
    runs( function(){
      jfile.readLog( log_file, callback);
    });

    waitsFor(function(){ return success }, "jsfile.readLog failed", 500);

    runs( function() {
      expect(success);
    });

  });

  it('creates a prospect entry', function() {
    runs( function(){
      jfile.writeProspect( prospect_file, callback);
    });
    waitsFor(function(){ return success }, "jsfile.writeProspect failed", 500);

    runs( function() {
      expect(success);
    });

  });

  it('reads a prospect entry', function() {
    runs( function(){
      jfile.readProspect(testpath, callback);
    });
    waitsFor(function(){ return success }, "jsfile.readProspect failed", 500);

    runs( function() {
      expect(success);
    });

  });

  it('removes a log file', function() {
    runs( function(){
      jfile.deleteLog(log_file, callback);
    });
    waitsFor(function(){ return success }, "jsfile.deleteLog failed", 500);

    runs( function() {
      expect(success);
    });
  });

  it('removes a prospect file', function() {
    runs( function(){
      jfile.deleteLog(log_file, callback);
    });
    waitsFor(function(){ return success }, "jsfile.deleteProspect failed", 500);

    runs( function() {
      expect(success);
    });
  });

});
