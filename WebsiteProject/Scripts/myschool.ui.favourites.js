(function ($) {
    // namespaced favourites variable.
    var myschoolfavourites = {

        WCFServerUrl: "",

        Init: function () {

            var parent = this;

            //1) Click the add favourite button event.
            $('.add').click(function () {

                if ($('#favs-list li').size() == 50) {
                    FancyAlert("You have reached the maximum allowed number of favourites");
                    return;
                }
                var title = $('#website-title').val().toString();
                var url = $('#website-address').val().toString();

                if (url.indexOf("://") == -1) {
                    url = "http://" + url;
                }

                if ((title.length == 0) || (url.length == 0) || (parent.ValidateUrl(url) == false) || (parent.ValidateTitle(title) == false)) {
                    FancyAlert("Please enter a title and valid url");
                }
                else {
                    var newFavID = parent.Create(url, title);
                    if (newFavID != 0) {
                        $('#no-favs').remove();

                        // Add the item to the ul.
                        $('#favs-list').append('<li> <div class="star"></div><a href="' + url + '" target="_blank" title="Click to visit ' + title + '">' + title + '</a><a href="" class="remove-favourite" data-favid="' + newFavID + '">Remove</a></li>').fadeIn("slow");

                        parent.ResetInputs();
                        $('#add-favourite,.remove-favourite').show();
                    }
                }
                return false;
            });

            //2) Click to remove favourite button event.
            $('.remove-favourite').live('click', function () {
                var item = $(this).attr('data-favid');
                var success = parent.Remove(item);

                if (success == true) {
                    $(this).closest('li').hide().remove();

                    if ($('#favs-list li').size() == 0) {
                        $('#fav-contents').prepend('<p id="no-favs">No favourites added</p>');
                    }
                }
                return false;
            });

            //3) Edit favourite button event.
            $('#add-favourite').hide();
            $('#edit-favourites').on('click', function () {
                $(this).hide();
                $('#add-favourite,.remove-favourite').show();
                return false;
            });

            //4) Cancel edit button event.
            $('#cancel').on('click', function () {
                parent.ClearEdit();
                return false;
            });

            // Labels for placeholders.
            $('#add-favourite li label').each(function () {
                $(this).addClass('overlay');
            });
            $('#add-favourite li input[type=text]').each(function () {
                if ($(this).val()) {
                    $(this).parent('li').find('label').hide()
                }
            });

            $('#add-favourite li input[type=text]').bind('paste', function (e) {
                $(this).parent('li').find('label').hide();
            });

            $('#add-favourite li input[type=text]').focusin(function () {
                $(this).parent('li').find('label').addClass('dim');
                $(this).keypress(function () {
                    $(this).parent('li').find('label').hide()
                })
            });
            $('#add-favourite li input[type=text]').focusout(function () {
                if (!$(this).val()) {
                    $(this).parent('li').find('label').removeClass('dim').show()
                }
            });

            //4) Set jquery cors support.
            jQuery.support.cors = true;

        },
        //End init
        CheckServiceUrlSet: function () {
            return ValidateUrl(this.WCFServerUrl);
        },
        //End checkServiceUrlSet
        ClearEdit: function () {
            $('#add-favourite,.remove-favourite').hide();
            $('#edit-favourites').show();
            this.ResetInputs();
        },
        //End clearEdit
        ResetInputs: function () {
            $('#website-title').val('');
            $('#website-address').val('');
            if (!$('#add-favourite li input[type=text]').val()) {
                $('#add-favourite li input[type=text]').parent('li').find('label').removeClass('dim').show()
            }
        },
        //End resetInputs
        ValidateUrl: function (url) {
            // If the url is blank or undefined, we will return false as it isnt valid.
            if ((url == '') || (url == undefined) || (url == 'http://') || (url == 'https://')) {
                return false;
            }
            // Check url using regular expression.
            if (/^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url)) {
                return true;
            } else {
                return false;
            }
        },
        //End validateurl
        ValidateTitle: function (Title) {
            // If the url is blank or undefined, we will return false as it isnt valid.
            if ((Title == '') || (Title == undefined)) {
                return false;
            }

            // Check url using regular expression.
            var pattern = new RegExp("^[A-Za-z0-9 _'!?&,-£()]*[A-Za-z0-9][A-Za-z0-9 _'!?&,-£()]*$");

            if (pattern.test(Title)) {
                return true;
            } else {
                return false;
            }
        },
        //End validateurl

        FancyCountNotMessage: function () {
            FancyAlert("Could not create this favourite, please check the url entered is valid.");
        }, // Fancy failed message.
     
        CheckConnectionAllowed: function (url) {
            var success = false;
            jQuery.support.cors = true;
            var parent = this;
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

        //End FancyAlert
        Create: function (url, title) {

            // If the wcf service url is not set then show error and dont carry out data call.
            if (!this.CheckServiceUrlSet()) {
                FancyAlert("Cannot connect to service");
                return;
            }

            var success = false;
            var parent = this;

            //            var allow = this.CheckConnectionAllowed(url);

            //            // Dont create the feed if the url is not an allowed one.
            //            if (allow == false) {
            //                parent.FancyCountNotMessage();
            //                return false;
            //            }

            // Data call.
            $.ajax({
                async: false,
                type: "POST",
                url: this.WCFServerUrl + 'Client/User/PanelClient.svc/CreateUserFavourite',
                contentType: "application/json; charset=utf-8",
                data: '{ "url" : "' + url + '", "title" : "' + title + '" }',
                failure: function () {
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
        //End create.
        Remove: function (id) {

            // If the wcf service url is not set then show error and dont carry out data call.
            if (!this.CheckServiceUrlSet()) {
                FancyAlert("Cannot connect to service");
                return;
            }

            var success = false;
            var parent = this;

            $.ajax({
                async: false,
                type: "POST",
                url: this.WCFServerUrl + 'Client/User/PanelClient.svc/DeleteUserFavourite',
                contentType: "application/json; charset=utf-8",
                data: '{ "favID" : "' + id + '" }',
                failure: function () {
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
        } //End remove
    } //End favourites
    myschoolfavourites.WCFServerUrl = serviceurl;
    myschoolfavourites.Init();

})(jQuery);