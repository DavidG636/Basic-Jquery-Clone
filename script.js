$(function () {
  $(".jqueryCloneHeading").css("color", "red");
  $("li").click(function() {
    $(this).css("color", "white");
  });

  $("ul").append($('<li>$("").append()</li>'));
});
