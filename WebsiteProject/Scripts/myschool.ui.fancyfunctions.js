function FancyConfirm(msg, callback) {

    // If the fancy box plugin exists.
    if (jQuery().fancybox) {
        var ret;
        $.fancybox({
            modal: true,
            content: "<div class=\"alert-confirm center\">" + msg + "<br/><input id=\"fancyConfirm_ok\" type=\"button\" value=\"Yes\" class=\"f-ok\"><input id=\"fancyConfirm_cancel\" type=\"button\" value=\"No\" class=\"f-cancel\"></div>",
            onComplete: function () {
                $('#fancybox-content').first().focus();
                $("#fancyConfirm_cancel").click(function () {
                    ret = false;
                    $.fancybox.close();
                });
                $("#fancyConfirm_ok").click(function () {
                    ret = true;
                    $.fancybox.close();
                });
            },
            onClosed: function () {
                callback.call(this, ret);
            }
        });
    }
    else {
        alert(msg);
        return false;
    }
}
        
function FancyAlert(msg) {

    // If the fancy box plugin exists.
    if (jQuery().fancybox) {
        //Override native javascript confirm box using plugin. This has an "Close" button only.
        $.fancybox({
            'modal': true,
            'content': "<div class=\"fancy-alert center\">" + msg + "<br/><input type=\"button\" onclick=\"jQuery.fancybox.close();\" value=\"Close\" title='Close' class=\"f-close\"></div>",
            onComplete: function () {
                $('#fancybox-content').first().focus();
            }
        });
    }
    else {
        // Plain old alert!
        alert(msg);
    }
}


function FancyAlertNoClose(msg) {

    // If the fancy box plugin exists.
    if (jQuery().fancybox) {
        //Override native javascript confirm box using plugin.
        $.fancybox({
            'modal': true,
            'content': "<div class=\"fancy-alert center\">" + msg + "</div>",
            onComplete: function () {
                $('#fancybox-content').first().focus();
            }
        });
    }
    else {
        // Plain old alert!
        alert(msg);
    }
}

function FancyFailedMessage() {
    FancyAlert("Could not complete your request at this time. Please refresh your page and try again.");
}

function FancyFailedMessageWithMessage(msg) {
    FancyAlert(msg);
}

function FancySecurity(msg, callback) {

    if (jQuery().fancybox) {
        var ret;
        $.fancybox({
            modal: true,
            content: "<div class=\"secure-alert-confirm\">" + msg + "<br/><input id=\"f-password\" title=\"\" type=\"password\" class=\"f-security\" /> <br/> <div id='secure-container'><input id=\"fancyConfirm_ok\" type=\"button\" title=\"OK\" value=\"OK\" class=\"f-ok\"><input id=\"fancyConfirm_cancel\" type=\"button\" value=\"Cancel\" class=\"f-cancel\"></div></div>",
            onComplete: function () {
                $('#fancybox-content').first().focus();
                $("#fancyConfirm_cancel").click(function () {
                    ret = null;
                    $.fancybox.close();
                });
                $("#fancyConfirm_ok").click(function () {
                    ret = $('#f-password').val();
                    $.fancybox.close();
                });
                setTimeout($('#f-password').focus(), 300);
                $('#f-password').live("keypress", function (e) {
                    /* ENTER PRESSED*/
                    if (e.keyCode == 13) {
                        if ($('#f-password').val().length > 0) {
                            ret = $('#f-password').val();
                        }
                        else {
                            ret = null;
                        }
                        $.fancybox.close();
                    }
                });
            },
            onClosed: function () {
                callback.call(this, ret);
            }
        });
    }
}

function ValidateUrl(url) {
    // If the url is blank or undefined, we will return false as it isnt valid.
    if ((url == '') || (url == undefined)) {
        return false;
    }
    // Check url using regular expression.
    if (/^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url)) {
        return true;
    } else {
        return false;
    }
}