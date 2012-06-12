Cloud = Koi.define({
  base_path : "https://api.cloudmine.me/v1/app",
  app_key   : "3f9ee746eacf43498e7355a71f0e3360",
  auth_key  : "4ecbe42938d44afda746585b1aeb009d",

  init: function(){
    var self = this;
    this.app_path = this.base_path +'/'+ this.app_key,
    $.ajaxSetup({
        dataType: "json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-CloudMine-ApiKey", self.auth_key);
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
