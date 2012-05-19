var Mongo = Koi.define({
  init: function(options) {
    options      = options || {};
    this.api_key = options.api_key;
    this.db      = options.db;
    this.coll    = options.collection;
  },
  insert: function(data, callback) {
    $.ajax({
      dataType: "json",
      type: "post",
      data: {"document" : data, 'safe': true },
      url: "https://api.mongohq.com/databases/" +
        this.db + "/collections/" +
        this.coll + "/documents?_apikey=" + this.api_key,
      success: callback,
      error: function(response){ console.log( response ); }
    });
  },
  update: function(obj_id, json) {},
  get:    function(obj_id) {},
  find:   function(query, fields) {}
});
