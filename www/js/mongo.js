/**
* Mongo Class
*  Provides and interface to mongo hq.
*/

var Mongo = Koi.define({
/**
* init - sets up 
*  @param {object}    options:    option object containing all available settings
*    @param {String}  api_key:    the connection token for mongohq
*    @param {String}  db:         database name
*    @param {String}  collection: collection name
*/
  init: function(options) {
    options       = options || {};
    this.api_key  = options.api_key;
    this.db       = options.db;
    this.coll     = options.collection;
    this.coll_url = "https://api.mongohq.com/databases/" +
                    this.db + "/collections/" +
                    this.coll + "/";
    this.doc_url  = this.coll_url + "documents/";
    this.url_api  = "?_apikey=" + this.api_key

    $.ajaxSetup({ dataType: "json", error: console.log });
  },

/**
* insert - adds a document to the collections
*  @param {object}    data: the entry to be inserted to the database
*  @param {function}  callback: success handler function
*/
  insert: function(data, callback) {
    $.ajax({
      type: "post",
      data: {"document" : data, 'safe': true },
      url: this.doc_url + this.url_api,
      success: callback
    });
  },

/**
* update - retrieves one document from the collection based on an id
*  @param {string}    obj_id: string representation of mongo_id
*  @param {function}  callback: success handler function
*/
  update: function(obj_id, updated, callback) {
    $.ajax({
      type: "put",
      data: {"document" : { "$set": updated }, 'safe': true },
      url: this.doc_url + obj_id + this.url_api,
      success: callback
    });


  },

/**
* get - retrieves one document from the collection based on an id
*  @param {string}    obj_id: string representation of mongo_id
*  @param {function}  callback: success handler function
*/
  get: function(obj_id, callback) {
    $.ajax({
      type: "get",
      url: this.doc_url + obj_id + this.url_api,
      success: callback
    });
  },

/**
* get - retrieves one document from the collection based on an id
*  @param {function}  callback: success handler function
*/
  getAll: function(callback) {
    var get_opts = {
      type: "get",
      data: {"_apikey": this.api_key, "limit":100}, //, "sort": {"created": -1}},
      url: this.doc_url,
      success: callback
    };
    console.log(get_opts);
    $.ajax( get_opts );
  },

/**
* deleteAll - deletes collection
*  @param {function}  callback: success handler function
*/
  deleteAll: function(callback) {
    if( !_RISKY_MODE ) return false;
    $.ajax({
      type: "delete",
      url: this.coll_url + this.url_api,
      success: callback
    });
  }
});
