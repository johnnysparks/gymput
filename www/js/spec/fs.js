describe('JsonFile', function() {
  var success = false;
  var jfile;
  callback = function() { success = true; };
  _RISKY_MODE = true;

  beforeEach(function(){
    jfile = new JsonFile();
    waitsFor(function(){ return jfile.fs }, "Error initializing file system", 1000);
  });

  afterEach(function(){ });

  it('loads the filesystem', function() {
    runs( function(){
      expect(jfile.fs);
    });
  });

  it('creates directories needed for file access', function() {
    runs( function(){
      jfile.ensureFilePath('foo/bar/baz.txt', callback);
    });
    waitsFor(function(){ return success }, "Creating directories failed", 1000);

    runs( function(){
      success = false;
      jfile.fs.root.getDirectory('foo/bar', {create:false}, callback);
    });
    waitsFor(function(){ return success }, "Verifying directories failed", 1000);

    runs( function() {
      expect(success);
    });

  });
});
