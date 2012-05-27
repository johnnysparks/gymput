/*
describe('Mongo', function() {
  var response      = false;
  var entry         = { name: "joe", phone: "1234", email: "jklh@afdoh", address: "hjl1234" };
  var mongo         = new Mongo({ api_key: "dmfbybnos7h10x2rrrrx", db: "gymput", collection: "prospects-test" });
  var callback      = function( res ){ response = res; }
  var update_object = { name: "johnny", phone: "123-456-1212" };
  var savedId;
  _RISKY_MODE = true;

  beforeEach(function(){
    response = false;
    savedId  = false;
  });
  afterEach(function(){
    response = false;
    mongo.deleteAll(callback);
    waitsFor(function(){ return response; }, "Update response never arrived", 3000);
  });

  it('saves a document to the collection', function() {

    mongo.insert(entry, callback);

    waitsFor(function(){ return response; }, "Response never arrived", 3000);
    runs( function(){
      expect(response.ok).toEqual(1)
    });

  });

  it('retrives a document from a collection by its mongo id', function() {

    runs( function(){
      mongo.insert(entry, callback);
    });
    waitsFor(function(){ return response; }, "Response never arrived", 3000);

    runs( function(){
      savedId = response._id;
      response = false;
      mongo.get(savedId, callback);
    });
    waitsFor(function(){ return response; }, "Insertion response never arrived", 3000);

    runs( function(){
      expect(response._id.$oid).toEqual(savedId);
    });

  });

  it('updates a document with a merged in object by its mongo id', function() {

    runs( function(){
      mongo.insert(entry, callback);
    });
    waitsFor(function(){ return response; }, "Insertion response never arrived", 3000);

    runs( function(){
      savedId = response._id;
      response = false;
      mongo.update(savedId, update_object, callback);
    });
    waitsFor(function(){ return response; }, "Update response never arrived", 3000);

    runs( function(){
      expect(response.ok).toEqual(1)
    });
  });

  it('deletes all documents in a collection', function() {

    runs( function(){ 
      response = false;
      mongo.insert(entry, callback);
    });
    waitsFor(function(){ return response; }, "Insertion response never arrived", 3000);

    runs( function(){ 
      response = false;
      mongo.insert(entry, callback);
    });
    waitsFor(function(){ return response; }, "Insertion response never arrived", 3000);

    runs( function(){ 
      response = false;
      mongo.insert(entry, callback);
    });
    waitsFor(function(){ return response; }, "Insertion response never arrived", 3000);

    runs( function(){
      response = false;
      mongo.deleteAll(callback);
    });

    waitsFor(function(){ return response; }, "Update response never arrived", 3000);

    runs( function(){
      expect(response.ok).toEqual(1)
    });
  });
});
*/
