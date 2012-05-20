describe('Mongo', function() {
  var response = false;
  var entry    = { name: "joe", phone: "1234", email: "jklh@afdoh", address: "hjl1234" };
  var mongo    = new Mongo({ api_key: "dmfbybnos7h10x2rrrrx", db: "gymput", collection: "prospects" });
  var callback = function( o ){ response = o; }

  beforeEach(function(){
    response = false;
  });

  it('saves a document to the collection', function() {

    mongo.insert(entry, callback);

    waitsFor(function(){ return response; }, "Response never arrived", 3000);
    runs( function(){
      expect(response.ok).toEqual(1)
    });

  });

  it('retrives a document from a collection by it\'s mongo id', function() {

    mongo.get("4fb074c5fb3ac70001000028", callback);

    waitsFor(function(){ return response; }, "Response never arrived", 3000);
    runs( function(){
      expect(response._id.$oid).toEqual("4fb074c5fb3ac70001000028");
    });
  });

  it('updates a document with a merged in object by it\'s mongo id', function() {
    var update_object = { name: "johnny" };
    mongo.update("4fb074c5fb3ac70001000028", update_object, callback);

    waitsFor(function(){ return response; }, "Response never arrived", 3000);

    runs( function(){
      expect(response.name).toEqual("johnny");
    });
  });
});
