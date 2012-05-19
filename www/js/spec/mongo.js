describe('Mongo', function() {
  it('saves a document to the collection', function() {
    var entry = {
      name: "joe",
      phone: "12341234",
      email: "jklasdfoih@afshudoh",
      address: "hjl1234hljjhl h asfkjh123"
    }
    var response = false;

    var callback = function( o ){ response = o; }
    var mongo = new Mongo({ api_key: "dmfbybnos7h10x2rrrrx", db: "gymput", collection: "prospects" });
    mongo.insert(entry, callback);
    waitsFor(function(){
      return response;
    }, "Response never arrived", 3000);

    runs( function(){
      expect(response.ok).toEqual(1)
    });
  });
});
