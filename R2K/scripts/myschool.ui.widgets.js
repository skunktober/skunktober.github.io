$(function () {

    // namespaced customisation variable.
    var myschoolwidgetcontrol = {

        MaxAllowedWidgets: 15,

        WCFServerUrl: "",

        CurrentTabID: function () {
            return $('#nav .selected').attr("data-tabid");
        },

        CurrentTabIsSystem: function () {
            return !($('#nav .selected').hasClass("custom-tab"));
        },

        CheckServiceUrlSet: function () {
            return ValidateUrl(this.WCFServerUrl);
        },
        //End CheckServiceUrlSet

        SetDefaultCollapsedState: function () {

            // Set the default collapsed state.
            $('#column1 li').each(function () {
                var collapsed = $(this).find('div').attr('data-collapsed');
                if (collapsed == 'small') {
                    $(this).find('.collapse').css({
                        backgroundPosition: '-36px -6px'
                    }).parents('.widget').find('.widget-content').hide();
                    $(this).find('.widget-head').addClass('widget-collapsed');
                    $(this).find('.launch-new-window').hide();
                    t.masonry('reload');
                }
            });

        },

        // Get comma seperated list of Id's of the widgets within column1.
        GetCurrentWidgetIDS: function () {
            var liIds = $('#column1 li').map(function (i, n) {
                return $(n).attr('data-widgetid');
            }).get().join(',');
            return liIds;
        },

        //End FancyConfirm
        RemoveWidget: function (widgetID) {

            // If the wcf service url is not set then show error and dont carry out data call.
            if (!this.CheckServiceUrlSet()) {
                FancyAlert("Cannot connect to service");
                return;
            }

            var parent = this;
            var success = false;
            var currentTab = this.CurrentTabID();

            $.ajax({
                async: false,
                type: "POST",
                url: this.WCFServerUrl + 'Client/User/Widget/BehaviourClient.svc/RemoveWidget',
                data: '{ "widgetID": "' + widgetID + '", "tabID": "' + currentTab + '" }',
                contentType: "application/json; charset=utf-8",
                dataType: "json",

                failure: function (data) {
                    FancyFailedMessage();
                },
                success: function (data) {
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
                error: function (xhr, ajaxOptions, thrownError) {
                    FancyFailedMessage();
                }
            });
            return success;
        },
        //End RemoveWidget
        EditWidgetPosition: function (widgetIDList) {

            // If the wcf service url is not set then show error and dont carry out data call.
            if (!this.CheckServiceUrlSet()) {
                FancyAlert("Cannot connect to service");
                return;
            }

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

                failure: function (data) {
                    FancyFailedMessage();
                },
                success: function (data) {
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
                error: function (xhr, ajaxOptions, thrownError) {
                    FancyFailedMessage();
                }
            });
            return success;
        },
        //End EditWidgetPosition
        SetWidgetCollapsed: function (widgetID, collapsed) {

            // If the wcf service url is not set then show error and dont carry out data call.
            if (!this.CheckServiceUrlSet()) {
                FancyAlert("Cannot connect to service");
                return;
            }

            var parent = this;
            var success = false;
            var currentTab = this.CurrentTabID();

            $.ajax({
                async: false,
                type: "POST",
                url: this.WCFServerUrl + 'Client/User/Widget/BehaviourClient.svc/SetWidgetCollapsed',
                data: '{ "widgetID": "' + widgetID + '", "tabID": "' + currentTab + '", "collapsed": "' + collapsed + '" }',
                contentType: "application/json; charset=utf-8",
                dataType: "json",

                failure: function (data) {
                    FancyFailedMessage();
                },
                success: function (data) {
                    switch (data.d.ClientOutcome) {
                        case "Success":
                            success = data.d.Data;
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
                error: function (xhr, ajaxOptions, thrownError) {
                    FancyFailedMessage();
                }
            });

            return success;
        },

        CheckConnectionAllowed: function (url) {
            var parent = this;
            var success = false;
            jQuery.support.cors = true;
            $.ajax({
                async: false,
                type: "POST",
                url: parent.WCFServerUrl + 'Client/User/SecurityClient.svc/AllowedConnection',
                data: '{ "url" : "' + url + '" }',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                error: function (xhr, ajaxOptions, thrownError) { success = false; },
                failure: function (data) { success = false; },
                success: function (data) {
                    if (data.d.Data != null) {
                        switch (data.d.Data.StatusCode) {
                            case 401: success = false; break; // No content
                            case 204: success = false; break; // Unauthorised
                            case 403: success = false; break; // Forbidden
                            case 407: success = false; break; // Proxy auth required
                            case 502: success = false; break; // Bad gateway
                            default: success = !data.d.Data.Redirected; break;
                        }
                    } else { success = false; }
                }
            });

            return success;
        },

        //End SetWidgetCollapsed
        CreateRSSWidget: function (url, title) {

            // Dont create the feed if the url is not an allowed one.
            if (this.CheckConnectionAllowed(url) == false) { return false; }

            // If the wcf service url is not set then show error and dont carry out data call.
            if (!this.CheckServiceUrlSet()) {
                FancyAlert("Cannot connect to service");
                return;
            }

            var parent = this;
            var success = false;
            var currentTab = this.CurrentTabID();

            $.ajax({
                async: false,
                type: "POST",
                url: parent.WCFServerUrl + 'Client/User/Widget/BehaviourClient.svc/CreateRSSWidget',
                data: '{ "tabID": "' + currentTab + '", "url": "' + url + '", "title": "' + title + '" }',
                contentType: "application/json; charset=utf-8",
                dataType: "json",

                failure: function (data) {
                    FancyFailedMessage();
                },
                success: function (data) {
                    switch (data.d.ClientOutcome) {
                        case "Success":
                            success = true;
                            break;
                        default:
                            FancyFailedMessage();
                            success = false;
                            break;
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    FancyFailedMessage();
                }
            });
            return success;
        } //End CreateRSSWidget
    }

    //    //TODO: Setup if max limit is set...
    //    //myschoolwidgetcontrol.MaxAllowedWidgets = appmaxallowedwidgets;
    myschoolwidgetcontrol.WCFServerUrl = serviceurl;

    //Show/Hide remove button
    $('.widget-head-wrap').hover(function () {
        $(this).find('.remove,.edit,.help').show();
    }, function () {
        $(this).find('.remove,.edit,.help').hide();
    });

    //Sortable & Masonry
    if ($('#column1').length > 0) {
        var t = $('#column1');

        t.masonry({
            itemSelector: '.widget',
            isResizable: true,
            columnWidth: 240
        });

        if (myschoolwidgetcontrol.CurrentTabIsSystem()) {
            $('#column1').fadeIn();
            return;
        }

        $('#column1').sortable({
            forcePlaceholderSize: true,
            handle: '.widget-head',
            items: '.widget',
            placeholder: 'widget-placeholder widget',
            revert: 0,
            delay: 100,
            opacity: 0.8,

            start: function (event, ui) {
                $('.remove,.help', this).hide();
                ui.item.addClass('dragging').removeClass('widget');
                ui.placeholder.height($(ui.item).height());
                if (ui.item.hasClass('widget-double')) {
                    ui.placeholder.addClass('widget-double');
                }
                if (ui.item.hasClass('widget-triple')) {
                    ui.placeholder.addClass('widget-triple');
                }
                if ($.browser.msie && $.browser.version <= 8) {
                    ui.placeholder.height($(ui.item).height() - 2);
                } else {
                    ui.placeholder.height($(ui.item).height() - 4);
                };
                ui.placeholder.width($(ui.item).width() - 4);
                ui.item.parent().masonry('reload');

            },
            change: function (event, ui) {
                ui.item.parent().masonry('reload');
                $('.remove,.help', this).hide();
            },
            stop: function (event, ui) {
                ui.item.removeClass('dragging').addClass('widget');
                ui.item.parent().masonry('reload');
                $('.remove,.help', this).hide();

                //Edit Widget position AJAX call
                if ($('#' + ui.item[0].id).attr('data-widgetid') != '0') {
                    myschoolwidgetcontrol.EditWidgetPosition(myschoolwidgetcontrol.GetCurrentWidgetIDS());
                }
            }
        });

        //Collapsible
        $('<a href="#" class="collapse">Collapse</a>').mousedown(function (e) {
            e.stopPropagation();
        }).toggle(function () {
            var collapse = ($(this).parent().parent().attr('data-collapsed') == 'small');
            var currentState = $(this).parent().parent().attr('data-collapsed');

            // small
            if (myschoolwidgetcontrol.SetWidgetCollapsed($(this).parents('.widget').attr('data-widgetid'), !collapse) == true) {

                if (currentState == 'large') { // small
                    $(this).parent().parent().attr('data-collapsed', 'small');
                    $(this).css({
                        backgroundPosition: '-36px -6px'
                    }).parents('.widget').find('.widget-content').hide();
                }
                else {
                    $(this).parent().parent().attr('data-collapsed', 'large');
                    $(this).css({
                        backgroundPosition: '-62px -6px'
                    }).parents('.widget').find('.widget-content').show();
                }

                $(this).parent().addClass('widget-collapsed');
                $(this).parent().parent().parent().find('.launch-new-window').hide();
                t.masonry('reload');
            }

            return false;
        }, function () {
            var currentState = $(this).parent().parent().attr('data-collapsed');
            var collapse = (currentState == 'small');

            // large
            if (myschoolwidgetcontrol.SetWidgetCollapsed($(this).parents('.widget').attr('data-widgetid'), collapse) == true) {

                if (currentState == 'large') { // small
                    $(this).parent().parent().attr('data-collapsed', 'small');
                    $(this).css({
                        backgroundPosition: '-36px -6px'
                    }).parents('.widget').find('.widget-content').hide();
                }
                else { // large
                    $(this).parent().parent().attr('data-collapsed', 'large');
                    $(this).css({
                        backgroundPosition: '-62px -6px'
                    }).parents('.widget').find('.widget-content').show();
                }
                $(this).parent().removeClass('widget-collapsed');
                $(this).parent().parent().parent().find('.launch-new-window').show();
                t.masonry('reload');
            }

            return false;
        }).prependTo($('.widget-head', this));

        
        function confirmRemoval(e, msg, parent) {
            FancyConfirm(msg, function (ret) {
                if (ret) {
                    e.hide();
                    e.parents(parent).animate({
                        opacity: 0
                    }, function () {
                        var widgetID = e.parents(".widget").attr('data-widgetid');
                        var saved = myschoolwidgetcontrol.RemoveWidget(widgetID);
                        if (saved) {
                            e.wrap('<div/>').parent().slideUp(function () {
                                //Remove widget so masonry reload adjusts heights correctly
                                e.parents(parent).remove();
                                e.remove();
                                t.masonry('reload');
                            });
                        }
                    });

                };
            })
        };

        //Remove widget button
        $('<a href="#" class="remove">CLOSE</a>').mousedown(function (e) {
            e.stopPropagation();
        }).click(function () {
            confirmRemoval($(this), "Are you sure you want to remove this widget?", ".widget");
            return false;
        }).appendTo($('.widget-head', this));

        //Add move cursor
        $('.widget').find('.widget-head').css({
            cursor: 'move'
        });

        myschoolwidgetcontrol.SetDefaultCollapsedState();
    };

    $('#column1').fadeIn().slideDown('slow');
});