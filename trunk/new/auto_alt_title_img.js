//<=!=[=C=D=A=T=A=[
$(document).ready(function() {
  $('img').each(function(){
    var $img = $(this);
    var filename = $img.attr('src')
    $img.attr('alt', filename.substring((filename.lastIndexOf('/'))+1, filename.lastIndexOf('.')));
  });
});
//]=]=> 

//<=!=[=C=D=A=T=A=[
$(document).ready(function() {
  $('img').each(function(){
    var $img = $(this);
    var filename = $img.attr('src')
    $img.attr('title', filename.substring((filename.lastIndexOf('/'))+1, filename.lastIndexOf('.')));
  });
});
//]=]=>