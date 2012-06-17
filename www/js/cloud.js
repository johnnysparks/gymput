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
    this.app_path  = this.base_path +'/'+ this.app_key,

    $.ajaxSetup({
        dataType: "json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-CloudMine-ApiKey", self.auth_key);
            xhr.setRequestHeader("Content-Type", "application/json");
        }
    });
  },

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
  }

  /**
   * Upload a file to cloudmine
   * @param {object} options object:
   *  "to"      - recipeient email address
   *  "from"    - sender email address
   *  "body"    - the body text
   *  "subject" - the subject text of the email
   *  "body"    - email body
   **/
  sendEmail: function(opts){
    var opts = opts || {};
    opts.to      = opts.to      || "johnny@daily.do";
    opts.from    = opts.from    || "johnny@daily.do";
    opts.subject = opts.subject || "configuration error";
    opts.body    = opts.body    || "check application for options problems";

    opts.snippet = "sendemail";
    opts.callback = opts.callback || function(){};

    this.get( opts );

  },

  /**
   * needs a path, an optional snippet name, and data
   **/
  get: function(opts){
    var opts = opts || {};
    opts.snippet = opts.snippet || false;
    opts.data    = opts.data    || false;
    opts.key     = opts.key     || false;
    
    var path = this.app_path + '/text'
    if( opts.snippet ){
      path += "?f="+opts.snippet;
    }
    alert( path );
    console.log( opts );
});
