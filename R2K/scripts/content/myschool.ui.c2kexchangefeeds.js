function DisplayC2kExchangeFeedInfo(data) {
    var profileConnectionType = "INTERNAL";
    var rootC2kExchangeUrl = "";

    if ($('#profileConnectionType')[0] != null) {
        profileConnectionType = $.trim($('#profileConnectionType')[0].innerHTML).toUpperCase();
        rootC2kExchangeUrl = $.trim($('#rootC2kExchangeUrl')[0].innerHTML);
    }
    

    if (profileConnectionType != "INTERNAL") {
        rootC2kExchangeUrl = rootC2kExchangeUrl.replace("http", "https");
    }

    var itemsArray = data.d.Data;
    if (itemsArray.length != 0) {
        // Found items on server.  Parse and create html on the widget.
        for (var i = 0; i < itemsArray.length; i++) {

            var ItemSource = itemsArray[i].ItemSource;
            var ItemTitle = itemsArray[i].ItemTitle;
            var ItemSummary = itemsArray[i].ItemSummary;
            var ItemLink = itemsArray[i].ItemLink;
            var CreatedDate = new Date(itemsArray[i].CreatedDate.match(/\d+/)[0] * 1).toDateString();

            switch (ItemSource) {
                case "c2kannouncements":
                    $('#c2kannouncements').append("<div style='padding-bottom: 5px;'><h3 style='font-weight: bold; color: #000000;'>" + ItemTitle + "</h3><div>" + CreatedDate + "</div><div>" + ItemSummary + "</div><div><a href='" + rootC2kExchangeUrl + ItemLink + "' target='_blank' style='color: #000000;'>Read more...</a></div></div>");
                    break;
                case "c2kdoccentre":
                    $('#c2kdoccentre').append("<div style='padding-bottom: 5px;'><h3 style='font-weight: bold; color: #000000;'>" + ItemTitle + "</h3><div>" + CreatedDate + "</div><div>" + ItemSummary + "</div><div><a href='" + rootC2kExchangeUrl + ItemLink + "' target='_blank' style='color: #000000;'>Read more...</a></div></div>");
                    break;
                case "c2kalerts":
                    $('#c2kalerts').append("<div style='padding-bottom: 5px;'><h3 style='font-weight: bold; color: #000000;'>" + ItemTitle + "</h3><div>" + CreatedDate + "</div><div>" + ItemSummary + "</div><div><a href='" + rootC2kExchangeUrl + ItemLink + "' target='_blank'>Read more...</a></div></div>");
                    //$('#c2kalerts').append("<div style='padding-bottom: 5px;'><h3 style='font-weight: bold; color: #000000;'>" + ItemTitle + "</h3><div>" + CreatedDate + "</div><div><a href='" + rootC2kExchangeUrl + ItemLink + "' target='_blank' style='color: #000000;'>Read more...</a></div></div>");
                    break;
                case "c2kemails":
                    //$('#c2kemails').append("<div style='padding-bottom: 5px;'><h3 style='font-weight: bold; color: #000000;'>" + ItemTitle + "</h3><div>" + CreatedDate + "</div><div>" + ItemSummary + "</div><div><a href='" + rootC2kExchangeUrl + ItemLink + "' target='_blank'>Read more...</a></div></div>");
                    $('#c2kemails').append("<div style='padding-bottom: 5px;'><h3 style='font-weight: bold; color: #000000;'>" + ItemTitle + "</h3><div>" + CreatedDate + "</div><div><a href='" + rootC2kExchangeUrl + ItemLink + "' target='_blank' style='color: #000000;'>Read more...</a></div></div>");
                    break;
                case "c2knoticeboard":
                    $('#c2knoticeboard').append("<div style='padding-bottom: 5px;'><h3 style='font-weight: bold; color: #000000;'>" + ItemTitle + "</h3><div>" + CreatedDate + "</div><div><a href='" + rootC2kExchangeUrl + ItemLink + "' target='_blank' style='color: #000000;'>Read more...</a></div></div>");
                    break;
            }
        }
    }
    if (jQuery().masonry) {
        if ($('#column1').length > 0) {
            $('#column1').masonry('reload');
        }
    }
}

var Populatec2kexchangefeedsData = {

    // Actions to perform to reload the widget
    ReloadMasonry: function () {
        if (jQuery().masonry) {
            if ($('#column1').length > 0) {
                $('#column1').masonry('reload');
            }
        }
    },

    WCFServiceUrl: "",

    Init: function () {
        /*
        if (jQuery().masonry) {
            if ($('#column1').length > 0) {
                $('#column1').masonry('reload');
            }
        }
        */

        $('#c2kaccordion').accordion({
            autoheight: false,
            animated: false
        });

        //Load C2k Exchange RSS Feed Data
        this.RetrieveItems();

        this.ReloadMasonry();
    },


    RetrieveItems: function () {
        var parentObject = this;
        jQuery.support.cors = true;
        $.ajax({
            async: true,
            type: "POST",
            url: this.WCFServiceUrl + 'Client/User/Widget/ContentClient.svc/RetrieveC2kExchangeRSSItems',
            contentType: "application/json; charset=utf-8",
            data: '{ }',
            failure: function () {
                FancyFailedMessage();
                console.log(path, arguments);
                return false;
            },
            error: function (xhr, ajaxOptions, thrownError) {
                FancyFailedMessage();
                return 0;
            },
            success: function (data) {
                //var profileConnectionType = document.getElementById("profileConnectionType").innerHTML.trim().toUpperCase();
                //var rootC2kExchangeUrl = document.getElementById("rootC2kExchangeUrl").innerHTML.trim();

                //var profileConnectionType = $.trim(document.getElementById("profileConnectionType").innerHTML).toUpperCase();
                //var rootC2kExchangeUrl = $.trim(document.getElementById("rootC2kExchangeUrl").innerHTML);

                $(document).ready(function () {
                    DisplayC2kExchangeFeedInfo(data);

                    /*ANC1000648v2-C2k Exchange Feeds -- Start*/
                    $(function () {
                        $('#slides').slidesjs({
                            //width: 940,
                            //height: 528,
                            play: {
                                active: true,
                                auto: true,
                                interval: 5000,
                                swap: true,
                                effect: "fade"
                            },
                            navigation: false
                        });
                    });
                    $('#slides').on("mouseenter", function () {
                        $(".slidesjs-stop").click();
                    });

                    $('#slides').on("mouseleave", function () {
                        $(".slidesjs-play").click();
                    });
                    //$("li a").on("mouseover", function () {
                    //    $('li a[name = n0]').attr('title', 'Announcements');
                    //    $('li a[name = n1]').attr('title', 'Document Centre');
                    //    $('li a[name = n2]').attr('title', 'Alerts');
                    //    $('li a[name = n3]').attr('title', 'Emails');
                    //});
                    //$("li a").on("mouseenter", function () {
                    //    $('li a[name = n0]').attr('title', 'Announcements');
                    //    $('li a[name = n1]').attr('title', 'Document Centre');
                    //    $('li a[name = n2]').attr('title', 'Alerts');
                    //    $('li a[name = n3]').attr('title', 'Emails');
                    //});
                    /*ANC1000648v2-C2k Exchange Feeds -- End*/
                });
            }
        });
    }
}
