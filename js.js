$(document).ready(function() {
$('#proj-1,#proj-2,#proj-3,#proj-4,#proj-5').hover(
  function() {
    $(this).find('.img-title').fadeOut(250);
  }, function() {
    $(this).find('.img-title').fadeIn(250);
  });
