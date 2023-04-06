var PopulatewikisearchData = {

    WCFServiceUrl: "",

    Init: function() {

        $("#wikisearchgo").click(function() {
            var searchText = escape($("#wikisearchbox").val());
            if (searchText.length > 0) {
                window.open("http://www.wikipedia.org/search-redirect.php?language=en&search=" + searchText, "WikiSearch");
                $("#wikisearchbox").val("");
            }
        });
    }
};