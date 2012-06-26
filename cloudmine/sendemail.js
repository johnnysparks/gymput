
/**
 * Making changes to this script:
 *  This script is standalone on cloudmine's server
 *  To make updates, first commit changes here,
 *   then copy and paste to cloudmine for testing.
 *
 * MAKE SURE THAT THIS SCRIPT IS A CLONE OF CLOUDMINE'S AT ALL TIMES!!!
 **/

// Sendgrid login info
var sgusername = 'johnnyfuchs';
var sgpassword = 'taped99zeSt*';

// url data and basic validation
var params = data.params;
var valid  = true;
if( !params.to   || !validishEmail(params.to))  { valid = false; }
if( !params.from || !validishEmail(params.from)){ valid = false; }
if( !valid ){ exit(false); }

// data to be passed to sendgrid servers
var send_data = {
    host      : "smtp.sendgrid.net",
    port      : "587",
    domain    : "daily.do",
    to        : params.to,
    from      : params.from,
    subject   : params.subject,
    body      : params.body,
    username  : sgusername,
    password  : sgpassword,
    authentication : "login"
}

// optional file attachement
if(params.attName && params.attBody ){
  send_data.files = [{
    filename : params.attName,
    contentType: 'text/plain',
    content  : params.attBody
  }];
}

// Fire off the sendgrid email
sendgrid.send( send_data ,
  function(err, result){
    if(err){ exit(false);    } 
    else   { exit(result); }
});

/**
 * The most basic of email validators,
 * sendgrid will fail if it "looks" valid but isn't anyway
 **/
function validishEmail(str) {
    var lastAtPos = str.lastIndexOf('@');
    var lastDotPos = str.lastIndexOf('.');
    return (lastAtPos < lastDotPos && lastAtPos > 0 && str.indexOf('@@') == -1 && lastDotPos > 2 && (str.length - lastDotPos) > 2);
}

