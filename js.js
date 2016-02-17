$(document).ready(function() {
$('.col-sm-7').hover(
  function() {
    $(this).find('.img-title').fadeOut(250);
  }, function() {
    $(this).find('.img-title').fadeIn(250);
  });
