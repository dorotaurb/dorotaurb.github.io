$(document).ready(function() {
$('#proj-1').mouseover(function() {
  $('#img-title1').css("visibility","visible");
});
$('#proj-1').mouseout(function() {
  $('#img-title1').css("visibility","hidden");
});

$('#proj-2').mouseover(function() {
  $('#img-title2').css("visibility","visible");
});
$('#proj-2').mouseout(function() {
  $('#img-title2').css("visibility","hidden");
});

$('#proj-3').mouseover(function() {
  $('#img-title3').css("visibility","visible");
});
$('#proj-3').mouseout(function() {
  $('#img-title3').css("visibility","hidden");
});

$('#proj-4').mouseover(function() {
  $('#img-title4').css("visibility","visible");
});
$('#proj-4').mouseout(function() {
  $('#img-title4').css("visibility","hidden");
});

$('#proj-5').mouseover(function() {
  $('#img-title5').css("visibility","visible");
});
$('#proj-5').mouseout(function() {
  $('#img-title5').css("visibility","hidden");
});
  
});

$(document).ready(function() {
        $(window).scroll( function(){
            $('.jumbotron').each( function(i){
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if( bottom_of_window > bottom_of_object ){
                $(this).animate({'opacity':'1'},300);
            }
        }); 
    });
});
