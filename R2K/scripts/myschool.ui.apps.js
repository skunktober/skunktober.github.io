(function ($) {
    // namespaced favourites variable.
    var myschoolLaunchApp = {

        ItemList: null,
        DeleteItemList: null,

        WCFServerUrl: "",

        VirutalDir: "",

        Init: function () {

            var parentObject = this;

            //Launch App Tabs
            $(".tab_content").hide();
            $(".tabs-nav li:first").addClass("active").show();
            $(".tab_content:first").show();

            //On Click Event
            $(".tabs-nav li").click(function () {
                $(".tabs-nav li").removeClass("active"); //Remove any "active" class
                $(this).addClass("active");
                $(".tab_content").hide();
                var activeTab = $(this).find("a").attr("href");
                $('#search-widgets,.widgets-section').show();
                $(activeTab).show();
                return false;
            });

            //Launch App slides
            $('.slides').slides({
                play: 0,
                pause: 2500,
                hoverPause: false,
                bigTarget: false
            });

            $('a[rel="external"]').click(function () {
                var destination = $(this).attr('href');
                var oib = $(this).attr('data-oib');

                $('#destination').val(destination);
                $('#oib').val(oib);

                if (parent.$.fancybox) {
                    //parent.$.fancybox.close();no longer used.
                    if (oib == 'True') {
                        parentObject.SetCookie("loc", destination);
                        window.open(parentObject.VirutalDir + "external.aspx");
                    } else {
                        window.open(destination);
                    }
                }
                else {
                    parentObject.SetCookie("loc", destination);
                    window.open(parentObject.VirutalDir + "external.aspx");
                }
                return false;
            });

            //Tabs
            $(".tab_content").hide();
            $(".tabs-nav li:first").addClass("active").show();
            $(".tab_content:first").show();
            $('.choose-widget-wrapper').fadeIn('fast').slideDown('fast');
        },
        //End init
        CheckServiceUrlSet: function () {
            return ValidateUrl(this.WCFServerUrl);
        },
        //End checkServiceUrlSet

        SetCookie: function (name, value) {
            // Set the cookie.
            document.cookie = name + "=" + value;

        }
    }

    myschoolLaunchApp.WCFServerUrl = serviceurl;
    myschoolLaunchApp.VirutalDir = virutaldir;
    myschoolLaunchApp.Init();

})(jQuery);