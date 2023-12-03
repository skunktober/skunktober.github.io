// col1 setup and requirements:
// 1) bind events
// 2) append new widgets
// 3) remove necessary widgets
// 4) edit widget positions
// 5) remove individual widget
// 6) Set collapsed state
// 7) Get current widget list
(function($) {

    function SetWidgetCollapsed(widgetID, collapsed, serviceUrl) {

        var success = false;
        var currentTab = $('#nav .selected').attr("data-tabid");

        $.ajax({
            async: false,
            type: "POST",
            url: serviceUrl + 'Client/User/Widget/BehaviourClient.svc/SetWidgetCollapsed',
            data: '{ "widgetID": "' + widgetID + '", "tabID": "' + currentTab + '", "collapsed": "' + collapsed + '" }',
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            failure: function (data) {
                FancyFailedMessage();
            },
            success: function(data) {
                switch (data.d.ClientOutcome) {
                case"Success":
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
                    break;
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                FancyFailedMessage();
            }
        });

        return success;
    }

    $.fn.BindWidgetEvents = function(serviceUrl) {

        //Show/Hide remove button
        $('.widget-head-wrap').hover(function() {
            $(this).find('.remove,.edit,.help').show();
        }, function() {
            $(this).find('.remove,.edit,.help').hide();
        });

        //Collapsible
        $('<a href="#" class="collapse">Collapse</a>').mousedown(function(e) {
            e.stopPropagation();
        }).toggle(function() {
            var collapse = ($(this).parent().parent().attr('data-collapsed') == 'small');
            var currentState = $(this).parent().parent().attr('data-collapsed');

            // small
            if (SetWidgetCollapsed($(this).parents('.widget').attr('data-widgetid'), !collapse, serviceUrl) == true) {

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

                // If the masonry plugin exists then reload it.
                if (jQuery().masonry) {
                    if ($('#column1').length > 0) {
                        $('#column1').masonry('reload');
                    }
                }
            }

            return false;
        }, function() {
            var currentState = $(this).parent().parent().attr('data-collapsed');
            var collapse = (currentState == 'small');

            // large
            if (SetWidgetCollapsed($(this).parents('.widget').attr('data-widgetid'), collapse, serviceUrl) == true) {

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

                // If the masonry plugin exists then reload it.
                if (jQuery().masonry) {
                    if ($('#column1').length > 0) {
                        $('#column1').masonry('reload');
                    }
                }
            }

            return false;
        }).prependTo($('.newWidget', this));

        //Remove widget button
        $('<a href="#" class="remove">CLOSE</a>').mousedown(function(e) {
            e.stopPropagation();
        }).click(function() {
            confirmRemoval($(this), "Are you sure you want to remove this widget?", ".widget", serviceUrl);
            return false;
        }).appendTo($('.newWidget', this));

        //Add move cursor
        $('.widget').find('.newWidget').css({
            cursor: 'move'
        }).removeClass('newWidget');;

        // If the masonry plugin exists then reload it.
        if (jQuery().masonry) {
            if ($('#column1').length > 0) {
                $('#column1').masonry('reload');
            }
        }
    }

    function confirmRemoval(e, msg, parent, serviceurl) {
        FancyConfirm(msg, function(ret) {
            if (ret) {
                e.hide();
                e.parents(parent).animate({
                    opacity: 0
                }, function() {
                    var widgetID = e.parents(".widget").attr('data-widgetid');
                    var saved = RemoveWidget(widgetID, serviceurl);
                    if (saved) {
                        e.wrap('<div/>').parent().slideUp(function() {
                            //Remove widget so masonry reload adjusts heights correctly
                            e.parents(parent).remove();
                            e.remove();

                            // If the masonry plugin exists then reload it.
                            if (jQuery().masonry) {
                                if ($('#column1').length > 0) {
                                    $('#column1').masonry('reload');
                                }
                            }
                        });
                    }
                });

            };
        })
    };

    function RemoveWidget(widgetID, serviceurl) {

        var success = false;
        var currentTab = $('#nav .selected').attr("data-tabid");

        $.ajax({
            async: false,
            type: "POST",
            url: serviceurl + 'Client/User/Widget/BehaviourClient.svc/RemoveWidget',
            data: '{ "widgetID": "' + widgetID + '", "tabID": "' + currentTab + '" }',
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            failure: function (data) {
                FancyFailedMessage();
            },
            success: function(data) {
                switch (data.d.ClientOutcome) {
                case"Success":
                    success = success = true;
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
            error: function (xhr, ajaxOptions, thrownError) {
                FancyFailedMessage();
            }
        });
        return success;
    } //End RemoveWidget
})(jQuery);