var Cloud = Koi.define({
  base_path   : null,
  app_path    : null,
  auth_key    : null,
  app_id      : null,

  init: function(){
    var self = this;

    this.base_path = "https://api.cloudmine.me/v1/app";
    this.app_id    = "3f9ee746eacf43498e7355a71f0e3360",
    this.auth_key  = "4ecbe42938d44afda746585b1aeb009d"
    this.app_path  = this.base_path +'/'+ this.app_id,

    $.ajaxSetup({
        dataType: "json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-CloudMine-ApiKey", self.auth_key);
            xhr.setRequestHeader("Content-Type", "application/json");
        }
    });
  },

  /**
   * Untested "set" method
   *  - used for data storage
   **/
  set: function(key, value){
    var self = this;
    var send_data = {};
    send_data[key] = value;
    $.ajax({
        type: "put",
        url: self.app_path + '/text',
        data: JSON.stringify( send_data ),
        success: function(data){
          console.log( data );
        },
        error: alert
    });
  },

  /**
   * Send an email from Cloudmine
   * @param {object} options object:
   *  "to"      - recipeient email address
   *  "from"    - sender email address
   *  "body"    - the body text
   *  "subject" - the subject text of the email
   *  "body"    - email body
   **/
  sendEmail: function(opts, callback){
    var opts     = opts || {};
    opts.to      = opts.to      || "johnny@daily.do";
    opts.from    = opts.from    || "johnny@daily.do";
    opts.subject = opts.subject || "configuration error";
    opts.body    = opts.body    || "check application for options problems";
    opts.attName = opts.attName || false;
    opts.attBody = opts.attBody || false;
    callback     = callback || function(){};

    var get_data = {
      snippet: "sendemail",
      data: opts
    };

    this.get( get_data, callback );
  },

  /**
   * needs a path, an optional snippet name, and data
   * Repsonse object contains:
   *   { result : [bool or result data?],  // only for snippets
   *     success: [object]empty object succes ojbject data, 
   *     errors : [object]empty object or error data ex. { "code": 404, "message": "Not found"}
   *     count  : [int]  // only if a count is requested
   *   }
   **/
  get: function(opts, callback){
    var opts = opts || {};
    opts.snippet = opts.snippet || false;
    opts.data    = opts.data    || false;
    opts.keys    = opts.keys    || false;   // string, comma separated list of keys
    opts.count   = opts.count   || false;
    callback = callback || function(){};

    var path = this.app_path + '/text?result_only=true';

    if( opts.snippet ){ path += "&f=" + opts.snippet;  }
    if( opts.count )  { path += "&count=true";       }
    if( opts.keys )   { path += "&keys=" + opts.keys; }
    util.print('&params=' + JSON.stringify( opts.data ));
    $.ajax({
      url: path,
      type: 'get',
      data: '&params=' + JSON.stringify( opts.data ),
      success: function(o){
        if(o.result){ callback(true); }
        else{         callback(false); }
      },
      error: function(o){
        console.log("Email Failed");
        callback(false);
      }
    });
  }
});
