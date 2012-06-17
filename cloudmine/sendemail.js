var sgusername = 'johnnyfuchs';
var sgpassword = 'taped99zeSt*';

var params = data.params;
var valid  = true;

if( !params.to   || !validishEmail(params.to))  { valid = false; }
if( !params.from || !validishEmail(params.from)){ valid = false; }

if(!valid){ exit("Email address is invalid"); }

sendgrid.send({
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
  },
  function(err, result){
    if(err){ exit(err);    } 
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
