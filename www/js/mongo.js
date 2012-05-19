var Mongo = Koi.define({
  init: function(options) {
    options   = options || {};
    this.id   = options.api_id;
    this.db   = options.db;
    this.coll = options.collection;
  },
  insert: function(data) {},
  update: function(obj_id, json) {},
  get:    function(obj_id) {},
  find:   function(query, fields) {}
});
