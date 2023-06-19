var PopulategooglesearchData = {
    Init: function() {
        $("#googlesearchgo").click(function() {
            var engineUrl = 'https://www.google.co.uk/';
            var searchText = encodeURIComponent($("#googlesearchbox").val());
            if (searchText.length > 0) {
                searchText = engineUrl + "search?q=" + searchText;
                window.open(searchText, "GoogleSearch");
                $("#googlesearchbox").val("");
            }
        });

        $("#googlesearchbox").keyup(function(event){
            if (event.keyCode == 13){
                $("#googlesearchgo").click();
            }
        });
    }
}
  
$(document).ready(function() {
    PopulategooglesearchData.Init();
});