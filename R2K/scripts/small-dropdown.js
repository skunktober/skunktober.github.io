$(document).ready(function () {
  function bringToFront($dropdown) {
    var maxZIndex = 1;
    $(".custom-dropdown-widget").each(function () {
      var zIndex = parseInt($(this).css("z-index"));
      maxZIndex = Math.max(maxZIndex, zIndex);
    });
    $dropdown.css("z-index", maxZIndex + 1);
  }

  $(".theme-custom-dropdown .custom-dropdown").on("click", function () {
    bringToFront($(this).closest(".custom-dropdown-widget"));
    $(".theme-custom-dropdown .custom-dropdown-options").toggle();
  });

  $(".theme-switcher .custom-dropdown-option").on("click", function () {
    var selectedValue = $(this).data("value");
    var selectedText = $(this).text();
    $(".theme-switcher .custom-dropdown-selected").text(selectedText);
    $(".theme-switcher .custom-dropdown-selected").data("value", selectedValue);
  });

  $(document).on("click", function (event) {
    if (!$(event.target).closest(".theme-switcher .custom-dropdown").length) {
      $(".theme-switcher .custom-dropdown-options").hide();
    }
  });
});
