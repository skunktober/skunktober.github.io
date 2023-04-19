(function ($) {

    // namespaced customisation variable.
    var myschoolindex = {
        CurrentTabID: function() {
            return $('#nav .selected').attr("data-tabid");
        },

        VirutalDir: "",

        CurrentTabIsSystem: function() {
            return !($('#nav .selected').hasClass("custom-tab"));
        },
        GetCurrentWidgetIDS: function() {
            var liIds = $('#column1 li').map(function(i, n) {
                return $(n).attr('data-widgetid');
            }).get().join(',');
            return liIds;
        },
        //End RemoveWidget
        EditWidgetPosition: function(widgetIDList) {

            // If the wcf service url is not set then show error and dont carry out data call.
            if (!this.CheckServiceUrlSet()) {
                FancyAlert("Cannot connect to service");
                return;
            }

            // If there are no widgets on the tab then dont carry out the data call.
            if (widgetIDList == "")
                return;

            var parent = this;
            var success = false;
            var currentTab = this.CurrentTabID();

            $.ajax({
                async: false,
                type: "POST",
                url: this.WCFServerUrl + 'Client/User/Widget/BehaviourClient.svc/EditWidgetPosition',
                data: '{ "widgetIDList": "' + widgetIDList + '", "tabID": "' + currentTab + '" }',
                contentType: "application/json; charset=utf-8",
                dataType: "json",

                failure: function(data) {
                    FancyFailedMessage();
                },
                success: function(data) {
                    switch (data.d.ClientOutcome) {
                    case "Success":
                        success = true;
                        break;
                    case "NewActiveSession":
                        window.location = "SignOut.aspx?exit=1006";
                        break;
                    case "SessionNotSet":
                    case "NotAuthenticated":
                        window.location = "SignOut.aspx";
                        break;
                    default:
                        FancyFailedMessage();
                        success = false;
                        break;
                    }
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    FancyFailedMessage();
                }
            });
            return success;
        },
        Init: function() {

            var parentObject = this;
            jQuery.support.cors = true;

            //Customise and Add Widgets Lightbox
            if (jQuery().fancybox) {

                if ($('#customise').length > 0) {
                    $("#customise").fancybox({
                        'padding': 0,
                        'width': 940,
                        'height': 580,
                        'autoScale': false,
                        'transitionIn': 'none',
                        'transitionOut': 'none',
                        'titleShow': false,
                        'type': 'iframe',
                        'scrolling': 'no',
                        'onCleanup': function() {
                            var hasBeenSaved = $("#fancybox-frame").contents().find('#isDirty').val();

                            // Save if the save has been flagged!
                            if (hasBeenSaved == 'true' || hasBeenSaved == true) {

                                // If a save has been done, we need to reflect the changes on the front screen.  Get the values from the iFrame.
                                var profilePic = $("#fancybox-frame").contents().find('#profilePic').val();
                                var customBannerCol = $("#fancybox-frame").contents().find('#customBannerColour').val();
                                var customWidgetCol = $("#fancybox-frame").contents().find('#customWidgetColour').val();
                                var customBackgroundCol = $("#fancybox-frame").contents().find('#customBackgroundColour').val();
                                var customToolbarCol = $("#fancybox-frame").contents().find('#customToolbarColour').val();
                                var selectedTheme = $("#fancybox-frame").contents().find('#selectedTheme').val();
                                var fontsize = $("#fancybox-frame").contents().find('#fontsizeset').val();

                                var aupURL = $('#aup').attr('href');
                                if (aupURL != undefined) {
                                    var PartsAUP = aupURL.split("?");
                                    aupURL = PartsAUP[0] + "?f=" + fontsize;
                                    $('#aup').attr('href', aupURL);


                                    var AccessibilityGuidelinesURL = $('#aup').attr('href');
                                    var PartsGuidelines = AccessibilityGuidelinesURL.split("?");
                                    AccessibilityGuidelinesURL = PartsGuidelines[0] + "?f=" + fontsize;
                                    $('#AccessibilityGuidelines').attr('href', AccessibilityGuidelinesURL);
                                }

                                var cookiesURL = $('#cookies').attr('href');
                                if (cookiesURL != undefined) {
                                    var PartsCookies = cookiesURL.split("?");
                                    cookiesURL = PartsCookies[0] + "?f=" + fontsize;
                                    $('#cookies').attr('href', cookiesURL);
                                }
                                // Update current page with new values.
                                parentObject.UpdateCurrentPageStyles(profilePic, customBackgroundCol, customBannerCol, customWidgetCol, customToolbarCol, selectedTheme, fontsize);
                                setTimeout($('#column1').masonry('reload'), "800");
                            }
                        }
                    }); //End customise fancybox extender
                }

                // Font sizer
                var $font_sizer = $('#font-sizer');
                //$('a:first', $font_sizer).addClass('selected');

                $('a', $font_sizer).on('click', function() {
                    var size = $(this).attr('data-fontsize');

                    if (parentObject.SaveFontChange(size)) {
                        $('body').removeClass().addClass(size);
                        $('a', $font_sizer).removeClass('selected');
                        $(this).addClass('selected');
                        $('#columns').masonry('reload');
                        $('#notice-slideshow').tallest('div');
                        $('.slides_container').tallest('div');
                    }
                    return false;
                });


                // View all apps lightbox.
                if ($('#view-all-apps').length > 0) {
                    $("#view-all-apps").fancybox({
                        'padding': 0,
                        'width': 940,
                        'height': 580,
                        'autoScale': false,
                        'transitionIn': 'none',
                        'titleShow': false,
                        'transitionOut': 'none',
                        'type': 'iframe',
                        'scrolling': 'no',
                        'onStart': function() {
                            parentObject.SetCookie("banner", parentObject.rgb2hex($('#header-wrap').css("background-color")));
                        }
                    });
                }

                if ($('#add-widgets').length > 0) {
                    $("#add-widgets").fancybox({
                        'padding': 0,
                        'width': 940,
                        'height': 580,
                        'autoScale': false,
                        'titleShow': false,
                        'transitionIn': 'none',
                        'transitionOut': 'none',
                        'type': 'iframe',
                        'scrolling': 'no',
                        'onCleanup': function() {

                            // Get list of removed and added widget items.
                            var removeWidgetList = $("#fancybox-frame").contents().find('#removeWidgetList').val();
                            var addWidgetList = $("#fancybox-frame").contents().find('#addWidgetList').val();

                            //For RSS
                            var rssWidetsAdded = $("#fancybox-frame").contents().find('#rsswidgetsadded').val();
                            var rssWidgetContentID = $("#fancybox-frame").contents().find('#rssContentID').val();
                            var rssIDs = $("#fancybox-frame").contents().find('#RssIds').val();

                            if (removeWidgetList != undefined) {
                                if (removeWidgetList.length > 0) {
                                    // Remove from colum1.
                                    parentObject.RemoveWidgetsFromCol1(removeWidgetList);
                                }
                            }

                            if (addWidgetList != undefined || rssWidetsAdded == 1) {
                                if (addWidgetList.length > 0 || rssWidetsAdded == 1) {
                                    // Add from colum1.
                                    parentObject.AddWidgetsToCol1(addWidgetList, rssWidetsAdded, rssWidgetContentID, rssIDs);
                                }
                            }
                            parentObject.EditWidgetPosition(parentObject.GetCurrentWidgetIDS());
                            setTimeout(function() {
                                // If the masonry plugin exists then reload it.
                                if (jQuery().masonry) {
                                    if ($('#column1').length > 0) {
                                        $('#column1').masonry('reload');
                                    }
                                }
                            }, 1000);

                        }
                    }); //End add widgets fancybox extender
                }

                $("#help").fancybox({
                    'padding': 30,
                    'type': 'inline',
                    'transitionIn': 'none',
                    'titleShow': false,
                    'transitionOut': 'none',
                    onComplete: function() {
                        $('#fancybox-content').first().focus();
                    }
                });
            } //End if fancybox exits
        },
        //End init
        rgb2hex: function(rgb) {
            if (rgb.search("rgb") == -1) {
                return rgb;
            } else {
                rgb = rgb.match( /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/ );

                function hex(x) {
                    return ("0" + parseInt(x).toString(16)).slice(-2);
                }

                return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
            }
        },
        //End rgb2hex
        SetCookie: function(name, value) {
            // Set the cookie.
            document.cookie = name + "=" + value;

        },
        //End SetCookie
        UpdateCurrentPageStyles: function(profilePic, customBackgroundCol, customBannerCol, customWidgetCol, customToolbarCol, selectedTheme, fontsize) {
            // Set the values on the page...
            if (profilePic != undefined) {
                if (profilePic.length > 0) {
                    // Set new profile pic.
                    $(".profile-img-frame img").attr('src', profilePic);
                }
            }

            if (selectedTheme != undefined) {
                if (selectedTheme.length > 0) {

                    $('link#theme-stylesheet').remove();
                    if (selectedTheme == "custom") {
                        if ((customBackgroundCol != undefined) && (customBannerCol != undefined) && (customWidgetCol != undefined) && (customToolbarCol != undefined)) {
                            $("<style type='text/css'>body{" + customBackgroundCol + "}#header-wrap, #lightbox-wrap, .tabs-nav span, .create-rss-widget, .lightbox-help span, .ui-widget-header, #external-app-bar{" + customBannerCol + "}.widget-head{" + customWidgetCol + "}#control-panel, #accordion, .accordion-heading, #add-favourite .add, .save-btn, .incorrect-details a, .add-widget, #create-rss input[type=\"submit\"], #create-notice input[type=\"submit\"], #font-sizer a.selected, .f-ok{" + customToolbarCol + "}.widget-head,#control-panel{background-image:none!important;}</style>").appendTo("head");
                        }
                    } else {
                        var stylesheet = "themes/" + selectedTheme + "/css/all.css";

                        if (document.createStyleSheet) {
                            document.createStyleSheet(stylesheet);
                            $("head").children(":last").attr('id', 'theme-stylesheet');
                        } else {
                            $("head").append("<link>");
                            var css = $("head").children(":last");
                            css.attr({
                                rel: "stylesheet",
                                type: "text/css",
                                href: stylesheet,
                                id: 'theme-stylesheet'
                            });
                        }
                    }

                    setTimeout(function() {
                        // If the masonry plugin exists then reload it.
                        if (jQuery().masonry) {
                            if ($('#column1').length > 0) {
                                $('#column1').masonry('reload');
                            }
                        }
                    }, "300");
                    $('#alerts-slideshow').find('div').css('background-color', 'transparent');
                }
            }

            if (fontsize != undefined) {
                if (fontsize.length > 0) {
                    // Set new font size.
                    $('body').removeClass().addClass(fontsize);
                    $('.slides_container').tallest('div');

                    // If the masonry plugin exists then reload it.
                    if (jQuery().masonry) {
                        if ($('#column1').length > 0) {
                            $('#column1').masonry('reload');
                        }
                    }
                }
            }

            return true;
        },

        CheckServiceUrlSet: function() {
            return ValidateUrl(this.WCFServerUrl);
        },
        //End checkServiceUrlSet
        RemoveWidgetsFromCol1: function(listofids) {
            var idList = listofids.split("|");

            var len = idList.length;
            for (var i = 0; i < len; i++) {
                // $('.widget').find('div').remove();
                //$('#' + idList[i] + 'Content').parent().remove();
                $('div[id^="' + idList[i] + 'Content"]').parent().remove();
            }
        },

        AddWidgetsToCol1: function(listofids, rssWidetsAdded, rssWidgetContentID, rssIDs) {

            var TabID = this.CurrentTabID();

            if (rssWidetsAdded == '1') {
                if (listofids.length > 0) {
                    listofids += '|' + rssWidgetContentID;
                } else {
                    listofids = rssWidgetContentID;
                }
            }

            // If the wcf service url is not set then show error and dont carry out data call.
            if (!this.CheckServiceUrlSet()) {
                FancyAlert("Cannot connect to service");
                return;
            }

            var success = false;
            var parent = this;

            // Data call.
            $.ajax({
                async: false,
                type: "POST",
                url: this.WCFServerUrl + 'Client/User/Widget/BehaviourClient.svc/RetrieveNewWidgets',
                contentType: "application/json; charset=utf-8",
                data: '{ "widgetIDList" : "' + listofids + '", "tabID" : "' + TabID + '" }',
                failure: function() {
                    FancyFailedMessage();
                },
                success: function(data) {
                    switch (data.d.ClientOutcome) {
                    case "Success":
                        parent.BuildCanvasHTML(data, rssIDs);
                        success = true;
                        break;
                    case "NewActiveSession":
                        window.location = "SignOut.aspx?exit=1006";
                        break;
                    case "SessionNotSet":
                    case "NotAuthenticated":
                        window.location = "SignOut.aspx";
                        break;
                    default:
                        FancyFailedMessage();
                        break;
                    }
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    FancyFailedMessage();
                }
            });

            return success;
        },
        //End RetrieveNewWidgets.

        IncludeJavaScript: function(rel, file) {
            var script = document.createElement('script');

            if (file.indexOf("http") >= 0) {
                script.async = false;
                script.src = decodeURIComponent(file);
            } else {
                script.src = rel + file;
            }

            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
        },

        IncludeStandaloneCSSFile: function(filename) {

            if (filename == undefined)
                return;

            if (filename.length == 0)
                return;

            var stylesheet = ("Styles/" + filename).replace('Styles/http', 'http');

            if (document.createStyleSheet) {
                document.createStyleSheet(stylesheet);
                $("head").children(":last").attr('id', 'theme-stylesheet-widget');
            } else {
                $("head").append("<link>");
                var css = $("head").children(":last");
                css.attr({
                    rel: "stylesheet",
                    type: "text/css",
                    href: stylesheet,
                    id: 'theme-stylesheet-widget'
                });
            }
        },
        IncludeCSSFile: function(widgetname) {

            if (widgetname == undefined)
                return;

            if (widgetname.length == 0)
                return;

            var stylesheet = "Styles/Content/" + widgetname.replace('.js', '.min.css');

            if (document.createStyleSheet) {
                document.createStyleSheet(stylesheet);
                $("head").children(":last").attr('id', 'theme-stylesheet-widget');
            } else {
                $("head").append("<link>");
                var css = $("head").children(":last");
                css.attr({
                    rel: "stylesheet",
                    type: "text/css",
                    href: stylesheet,
                    id: 'theme-stylesheet-widget'
                });
            }
        },
        //endIncludeJavaScript
        BuildCanvasHTML: function(data, rssIDs) {

            var parentObject = this;
            var selectors = "";

            if (data != null) {
                var len = data.d.Data.length;
                var arrayRssIDs = rssIDs.split(',');
                for (var i = 0; i < len; i++) {
                    if (selectors.length > 0) {
                        selectors += ',';
                    }
                    selectors += '#' + data.d.Data[i].TitleSafeVariableName + ' a[rel="external"]';

                    // Only include RSS widgets that have just been added
                    var ignoreWidget = false;
                    if (data.d.Data[i].Title == "RSS") {
                        if (jQuery.inArray(data.d.Data[i].WidgetID.toString(), arrayRssIDs) < 0) {
                            ignoreWidget = true;
                        }
                    }

                    if (ignoreWidget == false) {
                        var widgetWidth = data.d.Data[i].WidgetWidth;
                        var widthCss = "widget-single";

                        switch (widgetWidth) {
                        case 1:
                            widthCss = "widget-single";
                            break;
                        case 2:
                            widthCss = "widget-double";
                            break;
                        case 3:
                            widthCss = "widget-triple";
                            break;
                        }

                        var outputHtml = "";
                        outputHtml += "<li class=\"widget " + widthCss + " \" id=\"" + data.d.Data[i].TitleSafeVariableName + "\" data-widgetid=\"" + data.d.Data[i].WidgetID.toString() +
                            "\" data-pid=\"" + data.d.Data[i].ProviderID.toString() + "\" data-cat=\"" + data.d.Data[i].ProviderCatName + "\" data-title=\"" + data.d.Data[i].TitleSafeVariableName +
                                "\" data-widgetcontentid=\"" + data.d.Data[i].WidgetContentID + "\" >";

                        outputHtml += "<div class=\"widget-head-wrap\" data-collapsed=\"";

                        if (data.d.Data[i].Collapsed == true) {
                            outputHtml += "small";
                        } else {
                            outputHtml += "large";
                        }

                        outputHtml += "\"><div class=\"widget-head newWidget\"><span></span><h2>";

                        if (data.d.Data[i].Title != "RSS") {
                            outputHtml += data.d.Data[i].Title;
                        } else {
                            outputHtml += data.d.Data[i].FeedTitle;
                        }

                        outputHtml += "</h2>";

                        if (data.d.Data[i].HelpText != '') {
                            outputHtml += "<a id='help" + data.d.Data[i].WidgetID + "' href=\"#help" + data.d.Data[i].WidgetID + "content\" class=\"help\" title=\"help\">Help</a>";
                            outputHtml += "<div style='display:none;'><div id='help" + data.d.Data[i].WidgetID + "content' class='helptext'><h2>";

                            var extrahelp = "";

                            if (data.d.Data[i].Hyperlink != undefined)
                                if (data.d.Data[i].Hyperlink.UserHref.length > 0)
                                    extrahelp = "<br/><br/>Click the <a href=\"#\" class=\"buttonselection\" title=\"Expand button\">a</a> button to get full access to " + data.d.Data[i].Title + " in a separate browser window.";

                            outputHtml += data.d.Data[i].Title + " Help</h2><p>" + data.d.Data[i].HelpText + extrahelp + "</p></div></div>";
                        } else {
                            if (!data.d.Data[i].FeedURL == '') {
                                outputHtml += "<a id='help" + data.d.Data[i].WidgetID + "' href=\"#help" + data.d.Data[i].WidgetID + data.d.Data[i].FeedTitle.replace(' ', '') + "content\" class=\"help\" title=\"help\">Help</a>";
                                outputHtml += "<div style='display:none;'><div id='help" + data.d.Data[i].WidgetID + data.d.Data[i].FeedTitle.replace(' ', '') + "content' class='helptext'><h2>";
                                outputHtml += "Rss Feed Help</h2><p>This widget is connected to the following Rss feed: " + data.d.Data[i].FeedURL + "</p></div></div>";
                            }
                        }

                        outputHtml += "</div></div>";
                        
                        outputHtml += "<div class=\"widget-content\" id=\"" + data.d.Data[i].ControllerID.toString() + "Content" + data.d.Data[i].WidgetID.toString() + "\" >";
                        //ANC1000648v2-C2k Exchange Feeds -- Start
                        if (data.d.Data[i].Title.toString().toUpperCase() == "C2K EXCHANGE FEEDS") {
                            outputHtml += "<div style=\" height: 500px; max-height: 500px;overflow-y: scroll;\" class=\"widget-content\" id=\"" + data.d.Data[i].ControllerID.toString() + "Content" + data.d.Data[i].WidgetID.toString() + "\" >";
                        }
                        else {
                            outputHtml += "<div class=\"widget-content\" id=\"" + data.d.Data[i].ControllerID.toString() + "Content" + data.d.Data[i].WidgetID.toString() + "\" >";
                        }
                        //ANC1000648v2-C2k Exchange Feeds -- End 

                        if (data.d.Data[i].HTMLContent != '') {
                            outputHtml += data.d.Data[i].HTMLContent;
                        }

                        outputHtml += "</div><span class=\"widget-btm\"></span>";

                        //is there a footer link
                        if (data.d.Data[i].Hyperlink.UserHref.length > 0) {
                            if (data.d.Data[i].IsAvailable == true || isMemberOfCompuwareUser.toLowerCase() == "true") {
                                outputHtml += "<a href=\"" + data.d.Data[i].Hyperlink.UserHref + "\" rel=\"external\" class=\"launch-new-window\" data-pid=\"" + data.d.Data[i].ProviderID.toString() + "\" data-wid=\"" + data.d.Data[i].WidgetContentID.toString() + "\" title=\"Launch " + data.d.Data[i].Title + "\" data-oib=\"" + data.d.Data[i].Hyperlink.OpenInBanner.toString() + "\">Open</a>";
                            }
                        }

                        outputHtml += "</li>";

                        //Write out 1
                        $('#column1').append(outputHtml);

                        outputHtml = "";
                        if (data.d.Data[i].ExtraJavaScriptFileNames != '') {
                            var arrayOfNames = data.d.Data[i].ExtraJavaScriptFileNames.split(',');
                            for (var n = 0; n < arrayOfNames.length; n++) {
                                var link = ("<script src='Scripts/" + arrayOfNames[n] + "'>").replace("Scripts/http", "http");
                                this.IncludeJavaScript("Scripts/", arrayOfNames[n]);
                                outputHtml = link;
                            }
                        }

                        if (data.d.Data[i].ExtraCssFileNames != '') {
                            var arrayOfNames = data.d.Data[i].ExtraCssFileNames.split(',');
                            for (var n = 0; n < arrayOfNames.length; n++) {
                                this.IncludeStandaloneCSSFile(arrayOfNames[n]);
                            }
                        }

                        $('#column1').append(outputHtml);

                        if (data.d.Data[i].IsAvailable == true || isMemberOfCompuwareUser.toLowerCase() == "true") {
                            if (data.d.Data[i].JavaScriptFileName != '') {
                                if (data.d.Data[i].Title != "RSS") {
                                    //Write out the Javascript
                                    this.IncludeJavaScript("Scripts/Content/", data.d.Data[i].JavaScriptFileName);

                                    outputHtml = "<script src=\"Scripts/Content/" + data.d.Data[i].JavaScriptFileName + "\"></script><script>" + "Populate" + data.d.Data[i].TitleSafeVariableName + "Data.WCFServiceUrl='" + this.WCFServerUrl + "';Populate" + data.d.Data[i].TitleSafeVariableName + "Data.Init('" + data.d.Data[i].ControllerID.toString() + "Content" + data.d.Data[i].WidgetID.toString() + "');</script>";

                                } else {
                                    //Write out the 2nd javascript
                                    this.IncludeJavaScript("Scripts/Content/", data.d.Data[i].JavaScriptFileName);

                                    outputHtml = "<script src=\"Scripts/Content/" + data.d.Data[i].JavaScriptFileName + "\"></script><script>" + "Populate" + data.d.Data[i].TitleSafeVariableName + "Data.WCFServiceUrl='" + this.WCFServerUrl + "';Populate" + data.d.Data[i].TitleSafeVariableName + "Data.Init('" + data.d.Data[i].ControllerID.toString() + "Content" + data.d.Data[i].WidgetID.toString() + "', '" + data.d.Data[i].FeedURL + "');</script>";
                                }
                                $('#column1').append(outputHtml);
                            }
                        } else {
                            var content = data.d.Data[i].ControllerID.toString() + "Content" + data.d.Data[i].WidgetID.toString();
                            $("#" + content).html(widgetsUnavailableMessage);
                        }
                        // Include the css file for this.
                        this.IncludeCSSFile(data.d.Data[i].JavaScriptFileName);
                    }
                }
                $('#column1').BindWidgetEvents(serviceurl);


                $('a[id^="help"]').fancybox({
                    'padding': 20,
                    'type': 'inline',
                    'transitionIn': 'none',
                    'titleShow': false,
                    'transitionOut': 'none',
                    onComplete: function() {
                        $('#fancybox-content').first().focus();
                    }
                });

                $(selectors).click(function() {
                    if ($(this).attr('data-oib') == 'True' || $(this).attr('data-oib') == 'true') {
                        // Drop a css cookie for the page.
                        parentObject.SetCookie("banner", parentObject.rgb2hex($('#header-wrap').css("background-color")));
                        parentObject.SetCookie("loc", $(this).attr('href'));
                        window.open(parentObject.VirutalDir + "external.aspx");
                    } else {
                        window.open($(this).attr('href'));
                    }

                    return false;
                });
            }

            // If the masonry plugin exists then reload it.
            if (jQuery().masonry) {
                if ($('#column1').length > 0) {
                    $('#column1').masonry('reload');
                }
            }
        }
        
    //End Add Widgets
    }

    myschoolindex.WCFServerUrl = serviceurl;
    myschoolindex.VirutalDir = virutaldir;
    myschoolindex.Init();

})(jQuery);

// Create a closure
(function () {
    // Your base, I'm in it!
    var originalAddClassMethod = jQuery.fn.addClass;

    jQuery.fn.addClass = function () {
        // Execute the original method.
        var result = originalAddClassMethod.apply(this, arguments);

        // trigger a custom event
        jQuery(this).trigger('cssClassChanged');

        // return the original result
        return result;
    }
})();