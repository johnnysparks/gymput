Cloud = Koi.define({
  base_path : "https://api.cloudmine.me/v1/app",
  app_key   : "aeac05276e57434f983c366212e43ca1",
  auth_key  : "7e2a266cdf5449aa81058ff41d9ad891",

  init: function(){
    var _this = this;
    this.app_path = this.base_path +'/'+ this.app_key,
    $.ajaxSetup({
        dataType: "json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-CloudMine-ApiKey", _this.auth_key);
            xhr.setRequestHeader("Content-Type", "application/json");
        }
    });
  },

  set: function(key, value){
    var _this = this;
    var send_data = {};
    send_data[key] = value;
    $.ajax({
        type: "put",
        url: _this.app_path + '/text',
        data: JSON.stringify( send_data ),
        success: function(data){
          console.log( data );
        },
        error: alert
    });
  }
});
