/**
 * This script kicks off the rest of the application
 * Some globals will be defined here, as well as the global application binds
 **/

var jfile, mongo, cloud;
var isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/gi)?true:false;

if(isMobile){
  $(document).bind('deviceready', init );
} else {
  $(document).bind('ready', init );
}




function init(){

  // setup touch/click binds "gtouch" for "gymput touch event"
  // maps 
  if(isMobile){
    $("label, a, img.nav, select, input[type='text']").bind('touchstart',function(e){
      e.stopPropagation();
      $(this).trigger('touchend');
      $(this).trigger('gtouch');
    });
    $(document).bind('touchmove', function(e){ e.preventDefault(); });             // prevents the page from sliding when the user drags the background
  } else {
    $("label, a, img.nav, select, input[type='text']").bind('click',function(e){
      e.stopPropagation();
      $(this).trigger('gtouch');
    });
  }

//  jfile = new JsonFile();
  mongo = new Mongo({ api_key: "dmfbybnos7h10x2rrrrx", db: "gymput", collection: "prospects" });
  //cloud = new Cloud();
  //cloud.set('name', 'johnny fuchs');

  $("body").swipe({swipe: function(event, direction) {
    if(direction === 'left') {
      nav.nextPage();
    } else if(direction === 'right') {
      nav.prevPage();
    }
  }});
  
  // initialize progress bar
  $("#progress").progressbar({ value: 0 });

  // initialize progress bar
  $('label').bind('gtouch', function(e) {
    $('#' + $(this).attr('for')).trigger('gtouch');
  });

  $('.nav.prev').bind('gtouch', function(e) { nav.prevPage(); });
  $('.nav.next').bind('gtouch', function(e) { nav.nextPage(); });

  $("#personal-age").scroller({theme: "ios", display:"inline", preset:"date", headerText:"{value}"});
  $("#personal-age").scroller("show");

  $('input[name="referral-source"]').change(function() {
      $('#referral-details p').text($(this).attr('data'));
      $('#referral-details').show();
  });

  $('input[name="married"]').change(function() {
    if($('input[name="married"]:checked').val() == 'couple') {
      $('div.partner').show();
    } else {
      $('div.partner').hide();
    }
  });

  $('#date').val( parseInt( new Date().getTime() / 1000 ) );
}

