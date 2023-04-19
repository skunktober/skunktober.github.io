var PopulategooglesearchData = {

    WCFServiceUrl: "",

    Init: function() {

        $("#googlesearchgo").click(function() {
            var searchText = encodeURIComponent($("#googlesearchbox").val());
            if (searchText.length > 0) {
                searchText = "https://www.google.co.uk/search?q=" + searchText;
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