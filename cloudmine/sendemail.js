var sgusername = 'johnnyfuchs';
var sgpassword = 'f555hn51';

sendgrid.send({
    host : "smtp.sendgrid.net",
    port : "587",
    domain : "daily.do",
    to : "johnnyfuchs@gmail.com",
    from : "johnny@daily.do",
    subject : "This is a subject",
    body: "Hello, this is a test body",
    authentication : "login",
    username : sgusername,
    password : sgpassword
  },
  function(err, result){
    if(err){
       exit(err);
    } else {
       exit(result);
    }
});
