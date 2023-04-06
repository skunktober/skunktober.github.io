$(document).ready(function () {
  function bringToFront($dropdown) {
    var maxZIndex = 1;
    $(".custom-dropdown-widget").each(function () {
      var zIndex = parseInt($(this).css("z-index"));
      maxZIndex = Math.max(maxZIndex, zIndex);
    });
    $dropdown.css("z-index", maxZIndex + 1);
  }

  $(".pfp-custom-dropdown .custom-dropdown").on("click", function () {
    bringToFront($(this).closest(".custom-dropdown-widget"));
    $(".pfp-custom-dropdown .custom-dropdown-options").toggle();
  });

  $(".pfp-switcher .custom-dropdown-option").on("click", function () {
    var selectedValue = $(this).data("value");
    var selectedText = $(this).text();
    $(".pfp-switcher .custom-dropdown-selected").text(selectedText);
    $(".pfp-switcher .custom-dropdown-selected").data("value", selectedValue);
  });

  $(document).on("click", function (event) {
    if (!$(event.target).closest(".pfp-switcher .custom-dropdown").length) {
      $(".pfp-switcher .custom-dropdown-options").hide();
    }
  });
});
