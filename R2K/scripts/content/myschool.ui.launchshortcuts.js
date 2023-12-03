var PopulatelaunchshortcutsData = {

    WCFServiceUrl: "",

    ContentsID: "",

    ReorderItems: function () {
        var mylist = $('#launchshortcuts .apps-box ul');
        var listitems = mylist.children('li').get();
        listitems.sort(function (a, b) {
            var compA = $(a).attr('order');
            var compB = $(b).attr('order');
            return compA - compB;
        })
        $.each(listitems, function (idx, itm) { mylist.append(itm); });
    },

    ShowHideEdit: function (show) {
        var parentObject = this;
        if (show) {
            $('#launchshortcutslist li').trigger('startRumble');
            $('#launchshortcuts .apps-box').sortable('enable');
            $('#LaunchAddContainer').hide();
            $('#LaunchEditContainer').show();
            $('#launchshortcuts ul>li a').addClass('lauchmove');
            $('#launchshortcuts li').prepend('<a href="#" class="launchremove" title="Remove this shortcut"><span></span></a>');
            $('#launchmessage').html('All shortcuts removed');
            $('#launchshortcuts a[rel="external"]').attr({
                'rel': '',
                'href': '#'
            }).removeAttr('target').bind('click', function (e) { e.preventDefault(); });
        }
        else {
            $('#launchshortcutslist li').trigger('stopRumble');
            $('#launchshortcuts .apps-box').sortable('disable');
            $('#LaunchEditContainer').hide();
            $('#LaunchAddContainer').show();
            $("#launchshortcuts ul>li").each(function () { $(this).find('a:first').remove(); $(this).find('a').removeClass('lauchmove'); });
            $('#launchmessage').html('Click Add to start selecting your shortcuts');
            $('#launchshortcuts a[rel=""]').each(function () {
                $(this).attr({
                    'rel': 'external',
                    'href': $(this).attr('data-href')
                });
            }).attr('target', '_blank').unbind('click');
        }
    },

    Init: function (containerID) {
        var parentObject = this;
        this.ContentsID = containerID;
        this.RetrieveShortcuts();

        // Setup jRumble.
        $('#launchshortcutslist li').jrumble({ x: 0, y: 0, rotation: 1 });

        //Setup sorting.
        $('#launchshortcuts .apps-box').sortable({ forcePlaceholderSize: false, handle: 'a', items: 'li', revert: 0, placeholder: 'launchplaceholder', delay: 100, opacity: 0.8,
            start: function (event, ui) { ui.item.trigger('stopRumble'); ui.placeholder.height(ui.item.height() - 5); ui.placeholder.width(ui.item.width() - 5); },
            change: function (event, ui) { },
            stop: function (event, ui) { ui.item.trigger('startRumble'); }
        }).sortable('disable');

        // Setup remove click events.
        $('.launchremove').live('click', function () {
            parentObject.RemoveLaunch(this);

            var counthidden = 1;
            $('#launchshortcuts .apps-box li').each(function () {
                if ($(this).is(':hidden')) {
                    counthidden++;
                }
            });

            parentObject.ShowHideMessage($('#launchshortcuts .apps-box li').length == counthidden);
            return false;
        });

        // Setup button click events.
        $('#LaunchShortcutsAdd').click(function () {
            // Get header colour of widget to pass to select box.
            var bgcol = $('.widget-head:first').css('backgroundColor');
            if (bgcol == 'transparent') { bgcol = $('.widget:first').css('backgroundColor'); }

            // Get list of already selected items.
            var items = '';
            $('#launchshortcuts .apps-box li a').each(function () { if (items.length > 0) { items += ','; } items += $(this).attr('data-wid'); });

            if (bgcol.indexOf('#') >= 0) {
                bgcol = encodeURIComponent(bgcol);
            }

            // Show fancybox with launch shortcut selections.
            $('<a href="AddShortcuts.aspx?bg=' + bgcol + '&items=' + items + '&show=true">test</a>').fancybox({
                'padding': 0, 'width': 480, 'height': 400, 'autoScale': false, 'titleShow': false, 'transitionIn': 'none', 'transitionOut': 'none', 'type': 'iframe', 'scrolling': 'auto',
                'onCleanup': function () {
                    if ($("#fancybox-frame").contents().find("#IsDirty").val() == 'true') {
                        parentObject.ShowHideMessage($('#launchshortcuts .apps-box li').length == 0);
                        parentObject.RetrieveShortcuts();
                    }
                }
            }).click();
        });
        $('#LaunchShortcutsEdit').click(function () {
            parentObject.ShowHideEdit(true);
            var count = 1;
            $('#launchshortcuts .apps-box li').each(function () {
                $(this).attr('order', count);
                count++;
            });
        });
        $('#LaunchShortcutsSave').click(function () {

            var deletedids = [], orderids = [];

            $('#launchshortcuts .apps-box li').each(function () {
                // Get the ids to delete from the server.
                if ($(this).is(':hidden')) {
                    deletedids.push($(this).find('a:last').attr('data-wid')); $(this).remove();
                }
            });

            // Get the ids to reorder.
            $('#launchshortcuts li').each(function () {
                orderids.push($(this).find('a:last').attr('data-sid'));
            });

            // Make server call.
            parentObject.CreateDeleteOrderShortcuts([], deletedids, orderids);

            parentObject.ShowHideEdit(false);
            parentObject.ShowHideMessage($('#launchshortcuts .apps-box li').length == 0);
        });

        $('#LaunchShortcutsCancel').click(function () {
            $('#launchshortcuts .apps-box li').each(function () {
                if ($(this).is(':hidden')) {
                    $(this).show();
                }
            });
            parentObject.ReorderItems();
            parentObject.ShowHideEdit(false); parentObject.ShowHideMessage($('#launchshortcuts .apps-box li').length == 0);
        });
    },
    hex2rgb: function (hexStr) {
        // note: hexStr should be #rrggbb
        var hex = parseInt(hexStr.substring(1), 16);
        var r = (hex & 0xff0000) >> 16;
        var g = (hex & 0x00ff00) >> 8;
        var b = hex & 0x0000ff;
        return [r, g, b];
    },

    ShowHideMessage: function (show) {
        if (show) {
            $('#LaunchShortcutsEdit,#launchshortcutscontainer').hide();
            $('#launchmessage').show();
        }
        else {
            $('#LaunchShortcutsEdit,#launchshortcutscontainer').show();
            $('#launchmessage').hide();
            // Pass to ajax call. Then draw on page.
        }
        this.RefreshMasonry();
    },

    RemoveLaunch: function (item) {
        $(item).parent().fadeOut('fast');
        $(item).trigger('stopRumble');
        return true;
    },

    RefreshMasonry: function () {
        // If the masonry plugin exists then reload it.
        if (jQuery().masonry) {
            if ($('#column1').length > 0) {
                $('#column1').masonry('reload');
            }
        }
    },

    RetrieveShortcuts: function () {
        var parentObject = this;
        jQuery.support.cors = true;

        $.ajax({
            async: true,
            type: "POST",
            url: this.WCFServiceUrl + 'Client/User/Widget/ContentClient.svc/RetrieveShortcuts',
            contentType: "application/json; charset=utf-8",
            data: '{ }',
            failure: function (data) {
                $('#' + parentObject.ContentsID).html('There was a problem loading your shortcuts');
                parentObject.RefreshMasonry();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $('#' + parentObject.ContentsID).html('There was a problem loading your shortcuts');
                parentObject.RefreshMasonry();
            },
            success: function (data) {
                if (data.d.ClientOutcome == "Success") {
                    $('#launchshortcuts ul').empty();
                    parentObject.ShowHideMessage(data.d.Data.length == 0);
                    if (data.d.Data.length > 0) {
                        for (var i = 0; i < data.d.Data.length; i++) {
                            $('#launchshortcuts ul').append('<li><a title="Launch ' + data.d.Data[i].Title + '" data-sid="' + data.d.Data[i].ShortcutID + '" data-href="' + data.d.Data[i].Href + '" href="' + data.d.Data[i].Href + '" rel="external" target="_blank" data-pid="' + data.d.Data[i].ProviderID + '" data-oib="' + (data.d.Data[i].OpenInBrowser == true ? 'True' : 'False') + '" data-wid="' + data.d.Data[i].WidgetContentID + '"><span class="' + data.d.Data[i].ClassName + '"></span><br>' + data.d.Data[i].Title + '</a></li>');
                            $('#launchshortcuts li:last').jrumble({ x: 0, y: 0, rotation: 1 });
                        }
                    } parentObject.RefreshMasonry();
                }
                else {
                    $('#' + parentObject.ContentsID).html('There was a problem loading your shortcuts');
                    parentObject.RefreshMasonry();
                }
            }
        });
    },

    CreateDeleteOrderShortcuts: function (addwidgetcontentids, deleteshortcutids, ordershortcutids) {
        var parentObject = this;
        jQuery.support.cors = true;

        $.ajax({
            async: false,
            type: "POST",
            url: this.WCFServiceUrl + 'Client/User/Widget/ContentClient.svc/CreateDeleteOrderShortcuts',
            contentType: "application/json; charset=utf-8",
            data: '{ "AddWidgetContentIDs": [' + addwidgetcontentids.join(',') + '], "DeleteWidgetIDs": [' + deleteshortcutids.join(',') + '],"OrderShortcutIDs": [' + ordershortcutids.join(',') + ']}',
            failure: function (data) {
                FancyFailedMessage();
                return false;
            },
            error: function (xhr, ajaxOptions, thrownError) {
                FancyFailedMessage();
                return false;
            },
            success: function (data) {
                if (data.d.ClientOutcome == "Success") {
                    return true;
                }
            }
        });

    }
}

function openAddShortcutsMenu() {
    // Create a new div for the popup
    var popupDiv = document.createElement("div");
    popupDiv.innerHTML = `
        <div class="popup-overlay">
            <div class="popup-content">

                <!-- Close button -->
                <button class="popup-close" onclick="closeAddShortcutsMenu();">Close</button>
                
                <!-- Separate page content goes here -->
                <div id="maincontent">
                    ...
                </div>
            </div>
        </div>
    `;
    popupDiv.style.display = "none";
    document.body.appendChild(popupDiv);

    // Add some basic CSS for the popup
    var popupStyle = document.createElement("style");
    popupStyle.innerHTML = `
        .popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1000;
        }
        .popup-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #fff;
            padding: 20px;
            max-width: 80%;
            max-height: 80%;
            overflow: auto;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
            z-index: 1001;
            border-radius: 5px;
        }
        .popup-close {
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            cursor: pointer;
        }
    `;
    document.head.appendChild(popupStyle);

    // Show the popup
    popupDiv.style.display = "block";
}

function closeAddShortcutsMenu() {
    var popupDiv = document.querySelector(".popup-overlay").parentNode;
    popupDiv.style.display = "none";

    // Remove the popup div and style when closed
    document.body.removeChild(popupDiv);
    var popupStyle = document.querySelector("style[description='popup']");
    document.head.removeChild(popupStyle);
}