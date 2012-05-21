describe('JsonFile', function() {
  _RISKY_MODE = true;

  beforeEach(function(){ });
  afterEach(function(){ });

  it('loads the filesystem', function() {
    var fs = new JsonFile();
    
    waitsFor(function(){ return fs.fs }, "Error initializing file system", 1000);

    runs( function(){
      expect(fs.fs);
    });
  });
});
