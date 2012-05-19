function nextPage() {
  curr_page = $('fieldset:visible');
  next_page = curr_page.next('fieldset');
  if(next_page.length) {
    curr_page.hide();
    next_page.show();
    updateProgress();
  }
}
function prevPage() {
  curr_page = $('fieldset:visible');
  prev_page = curr_page.prev('fieldset');
  if(prev_page.length) {
    curr_page.hide();
    prev_page.show();
    updateProgress();
  }
}
function updateProgress() {
  $('#progress').progressbar({value: 100 * $('fieldset:visible').index('fieldset') / ($('fieldset').length-1)});
}

function init() {
  $("body").swipe({swipe: function(event, direction) {
    if(direction === 'left') {
      nextPage();
    } else if(direction === 'right') {
      prevPage();
    }
  }});
  $("#progress").progressbar({ value: 0 });
  $(".nav.next").click(nextPage);
  $(".nav.prev").click(prevPage);
  $('label').bind('touchstart', function(e) {
    $('#' + $(this).attr('for')).trigger('click');
  });
  $('.nav').bind('touchstart', function(e) {
    $(this).trigger('click');
  });

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
}
