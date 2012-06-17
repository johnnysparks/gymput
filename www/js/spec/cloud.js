describe('Cloud', function() {
  var success   = false;
  var cloud;
  var callback  = function(e) { success = true; };

  beforeEach(function(){
    cloud = new Cloud();
  });

  afterEach(function(){
    success = false;
  });

  it('loads cloudmine', function() {
    runs( function(){
      expect( cloud );
    });
  });

  it('sends an email', function(){
    runs( function(){
      cloud.sendEmail({
        to : "joe@daily.do",
        from : "johnny@daily.do",
        subject : "unit test subject",
        body: "unit test body",
      }, callback);
    });

    waitsFor(function(){ return success }, "email failed to send", 3000);

    runs(function(){
      expect( success );
    });
  });

  it('uploads a log file', function(){
    runs( function(){
      log_file  = "prospects/2012/08/05/8h209j3g1jiawf00001.json";
      log_data  = { name: "joe", phone: "1234", email: "jklh@afdoh", address: "hjl1234" };
      jfile = new JsonFile();
    });

    waitsFor(function(){ return jfile.js }, "can't init file system", 500);

    runs(function(){
      jfile.write( log_file, log_data, callback );
    });

    waitsFor(function(){ return success }, "jfile.write failed", 500);

    runs(function(){
      jfile.read( log_file, callback );
    });
    
    waitsFor(function(){ return success }, "jsfile.read failed", 500);

    runs(function(){
      cloud.upload();
    });

    waitsFor(function(){ return success }, "Cloud upload failed.", 500);

    runs(function(){
      expect( success );
    });
  });

});
