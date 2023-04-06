(function ($) {

    // tab operations namespaced.
    var myschooltabs = {

        WCFServerUrl: "",

        MaxAllowedTabs: 5,

        TotalNumberOfTabs: function () {
            return $('#nav .custom-tab').length;
        },
   
        Init: function () {

            var parentObject = this;
            jQuery.support.cors = true;

            //Delete tab
            $(".delete-tab").live('click', function (item) {

                var tabid = $(this).attr("data-tabid");
                var msg = "Are you sure you want to remove this tab?";
                var e = $(this);
                var parent = "li";

                FancyConfirm(msg, function (ret) {

                    if (ret) {

                        var deleted = parentObject.DeleteUserTab(tabid);

                        if (deleted == true) {
                            e.hide();
                            e.parents(parent).animate({
                                opacity: 0
                            }, function () {

                                e.wrap('<div/>').parent().slideUp(function () {
                                    //Remove widget so masonry reload adjusts heights correctly
                                    e.parents(parent).remove();
                                    e.remove();

                                    // If the masonry plugin exists then reload it.
                                    if (jQuery().masonry) {
                                        if ($('#column1').length > 0) {
                                            $('#column1').masonry('reload');
                                        }
                                    }

                                    // If we have just deleted our current tab, then relocate the
                                    // browser window to the default MY HOME page.
                                    var selectedTab = $('#nav .selected').attr("data-tabid");
                                    if ((tabid == selectedTab) || (selectedTab == undefined)) {
                                        // Get the current URL and remove the querystring.  In this case, querystring
                                        // will be the ?tabid=0000.  Removing this will leave index.aspx.
                                        var currentLoc = window.location.toString();
                                        currentLoc = currentLoc.substring(0, currentLoc.indexOf('?'));
                                        window.location = currentLoc;
                                    }
                                });
                            });
                        }
                        else {
                            FancyAlert("There was a problem deleting your tab!");
                        }
                    };
                });
                return false;
            });

            //Add tab
            $(".new-tab a").live('click', function () {

                if (parentObject.TotalNumberOfTabs() == parentObject.MaxAllowedTabs) {
                    FancyAlert("Sorry, you are limited to 5 custom tabs.");
                }
                else {
                    var newtabid = parentObject.CreateUserTab('Untitled Tab');

                    if (newtabid != 0) {
                        $(this).parent().before('<li><a data-tabid="' + newtabid + '" href="index.aspx?tabid=' + newtabid + '" class="custom-tab">Untitled Tab</a><a data-tabid="' + newtabid + '" href="" class="delete-tab"></a></li>').hide().fadeIn();
                    }
                };
                return false;
            });


            //Editable area
            if ($('.edit').length > 0) {
                $('.edit').editable(function (value, settings) {
                    //console.log(this);
                    //console.log(value);
                    //console.log(settings);
                    return (value);
                }, {
                    onblur: 'submit',
                    //Update tab in navigation
                    callback: function (value, settings) {
                        //This references the tab currently selected
                        var tabid = $('#nav .selected').attr("data-tabid");
                        var oldTabName = $('#nav .selected').html();

                        if (parentObject.ValidateTabTitle(value) == true) {
                            var success = parentObject.RenameUserTab(tabid, value);

                            if (success) {
                                $('#nav .selected').html(value);
                                $('#nav .selected').attr('title', value);
                            }
                            else {
                                FancyAlert("There was a problem renaming your tab!");
                                $(".edit").html(oldTabName);
                            }
                        } else {

                            FancyAlert("There was a problem renaming your tab! Please enter a Valid Tab Name");
                            $(".edit").html(oldTabName);

                        }

                    }
                });
            };

        },
        //End Init
        CheckServiceUrlSet: function () {
            return ValidateUrl(this.WCFServerUrl);
        },
        //End CheckServiceUrlSet
        ValidateTabTitle: function (Title) {
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
        //End ValidateTabTitle
        
        DeleteUserTab: function (tabid) {

            // If the wcf service url is not set then show error and dont carry out data call.
            if (!this.CheckServiceUrlSet()) {
                FancyAlert("Cannot connect to service");
                return;
            }

            var parent = this;
            var success = false;

            $.ajax({
                async: false,
                type: "POST",
                url: this.WCFServerUrl + 'Client/User/TabsClient.svc/DeleteCustomUserTab',
                data: '{ "tabID": "' + tabid + '" }',
                contentType: "application/json; charset=utf-8",
                dataType: "json",

                failure: function (data) {
                    FancyAlert("Could not complete your request at this time. Please refresh your page and try again.");
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
                            FancyAlert("There was a problem deleting your tab (" + data.d.Message + ")");
                            success = false;
                            break;
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    FancyAlert("Could not complete your request at this time. Please refresh your page and try again.");
                }
            });
            return success;
        },
        //End DeleteUserTab
        RenameUserTab: function (tabid, newname) {

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
                url: this.WCFServerUrl + 'Client/User/TabsClient.svc/EditCustomTabName',
                contentType: "application/json; charset=utf-8",
                data: '{ "tabID": "' + tabid + '", "tabName": "' + newname + '" }',
                failure: function (data) {
                    FancyAlert("Could not complete your request at this time. Please refresh your page and try again.");
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
                            FancyAlert("There was a problem renaming your tab (" + data.d.Message + ")");
                            success = false;
                            break;
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    FancyAlert("Could not complete your request at this time. Please refresh your page and try again.");
                }
            });
            return success;
        },
        //End RenameUserTab
        CreateUserTab: function (newTabName) {

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
                url: this.WCFServerUrl + 'Client/User/TabsClient.svc/CreateCustomUserTab',
                contentType: "application/json; charset=utf-8",
                data: '{ "tabName": "' + newTabName + '" }',
                failure: function (data) {
                    FancyAlert("Could not complete your request at this time. Please refresh your page and try again.");
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
                            FancyAlert("Could not create your tab (" + data.d.Message + ")");
                            success = false;
                            break;
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    FancyAlert("Could not complete your request at this time. Please refresh your page and try again.");
                }
            });
            return success;
        } //End CreateUserTab
    };
    myschooltabs.MaxAllowedTabs = schoolmaxallowedtabs;
    myschooltabs.WCFServerUrl = serviceurl;
    myschooltabs.Init();

})(jQuery);