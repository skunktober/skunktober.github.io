(function ($) {

    // user panel operations namespaced.
    var myschoolpanel = {

        UrgentTimer: 30000,
        EmailTimer: 30000,
        UrgentLoopID: 0,

        WCFServerUrl: "",

        VirutalDir: "",

        rgb2hex: function (rgb) {
            if (rgb.search("rgb") == -1) {
                return rgb;
            } else {
                rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);

                function hex(x) {
                    return ("0" + parseInt(x).toString(16)).slice(-2);
                }
                return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
            }
        },
        //End rgb2hex
        Init: function () {

            var parentObject = this;
            jQuery.support.cors = true;

            $('#accordion a.accordion-heading').click(function (item) {
                parentObject.SetCookie("ms_panel", $(this).attr('data-index'));
            });

            // Call removed as return value not referenced.
            //if (emailoroffice365 == true) {
            //    parentObject.RetrieveInboxUnreadEmailCount();
            //}

            var defaultIndex = parentObject.GetCookie("ms_panel");
            if ($('#accordion').length > 0) {
                if (defaultIndex == undefined) {
                    defaultIndex = 0;
                } else { defaultIndex = parseInt(defaultIndex); }
                $('#accordion').accordion({
                    autoheight: false,
                    animated: 'slide',
                    active: defaultIndex
                });
            };

            //Remove borders
            $('.email-box li:last,.homework-box li:last').addClass('end');

            //Profile Lightbox
            if (jQuery().fancybox) {

                // View profile image lightbox.
                if ($('#launch-profile').length > 0) {
                    $("#launch-profile").fancybox({
                        'padding': 0,
                        'width': 628,
                        'height': 330,
                        'autoScale': false,
                        'titleShow': false,
                        'transitionIn': 'none',
                        'transitionOut': 'none',
                        'type': 'iframe',
                        'scrolling': 'no',
                        onComplete: function () {
                            $('#fancybox-content').first().focus();
                        }
                    });
                }
            }

            //Anti Bullying button
            $('.anti-bullying').on('click', function () {

                FancyConfirm("Are you sure you want to send a message?", function (ret) {
                    if (ret) {
                        parentObject.SendAntibullyingAlert();
                    };
                });

                return false;
            });

            //Teacher alert button
            $('.teacher-alert').on('click', function () {
                FancyConfirm("Are you sure you want to send a message?", function (ret) {
                    if (ret) {
                        parentObject.SendTeacherAlert();
                    };
                });
                return false;
            });
        },
        //End init

        SetUrgentScroll: function () {
            if ($('#user-box .urgent-alert').length > 2) {
                // Hide all items.
                $('#user-box .urgent-alert').hide();

                // Get the next item we will add the ticker class to.
                var element = $('#user-box .urgentticker').next('.urgent-alert');
                // console.log($(element).html());

                // Remove the ticker class from current item.
                $('.urgentticker').removeClass('urgentticker').hide();

                // If the next item is not null, then add the class.  Otherwise go back to the start.
                if ($(element).html() == null) {
                    $('#user-box .urgent-alert:first').addClass('urgentticker').show();
                }
                else {
                    $(element).addClass('urgentticker').show();
                }
            }
            else {
                $('#user-box .urgent-alert').show();
            }
        },

        GetCookie: function (name) {
            var i, x, y, ARRcookies = document.cookie.split(";");
            for (i = 0; i < ARRcookies.length; i++) {
                x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
                y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
                x = x.replace(/^\s+|\s+$/g, "");
                if (x == name) {
                    return unescape(y);
                }
            }
        },

        SetCookie: function (name, value) {
            // Set the cookie.
            document.cookie = name + "=" + value;
        },
        //End SetCookie
        CheckServiceUrlSet: function () {
            return ValidateUrl(this.WCFServerUrl);
        },
        //End checkServiceUrlSet

        //End FancyAlert

        CheckServiceUrlSet: function () {
            return ValidateUrl(this.WCFServerUrl);
        },
        //End CheckServiceUrlSet

        GetOrdinal: function (day) {
            if ((day == '1') || (day == '01') || (day == '21')) { return "st"; }
            if ((day == '2') || (day == '02') || (day == '22')) { return "nd"; }
            if ((day == '3') || (day == '03') || (day == '23')) { return "rd"; }
            return "th";
        }, //End GetOrdinal

        FormatDate: function (date) {

            var dateObj = new Date(parseInt(date.substr(6)));
            var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var dateParts = dateObj.toString().split(' '); var selectedMonthName = months[dateObj.getMonth()];
            var selectedDay = dateParts[2];
            if (selectedDay.length == 1) {
                selectedDay = "0" + selectedDay;
            }
            var mins = dateObj.getMinutes();
            var hours = dateObj.getHours();
            var time = "";
            if (hours < 10) { time = "0"; }
            time += hours + ":";
            if (mins < 10) { time += "0"; }
            time += mins;
            var ampm = "AM";
            var bits = time.split(':');
            if (bits[0] > 12) {
                ampm = "PM";
                time = (parseInt(bits[0]) - 12).toString() + ":" + bits[1];
            }
            else { time = bits[0] + ":" + bits[1]; }
            var finalDate = selectedMonthName + " " + selectedDay + this.GetOrdinal(selectedDay) + " " + time + " " + ampm;

            //November 02nd 10:47 
            return finalDate;
        }, //End FormatDate

        ClearAllIntervals: function (bEmail, bUrgent) {
            // Clear all intervals for this javascript file.
            if (bEmail == true) {
                clearInterval(panel_emailtimerID);
            }
            if (bUrgent == true) {
                clearInterval(panel_noticetimerID);
            }
        }, // End clear all intervals.

        SendTeacherAlert: function () {

            // If the wcf service url is not set then show error and dont carry out data call.
            if (!this.CheckServiceUrlSet()) {
                FancyAlert("Cannot connect to service");
                return;
            }

            var parent = this;

            // Data call.
            $.ajax({
                async: true,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: this.WCFServerUrl + 'Client/User/PanelClient.svc/SendEmergencyAlert',
                failure: function (data) {
                    FancyFailedMessage();
                },
                success: function (data) {

                    switch (data.d.ClientOutcome) {
                        case "Success":
                            FancyAlert("Your message has been sent");
                            break;
                        case "NewActiveSession":
                            window.location = "SignOut.aspx?exit=1006";
                            break;
                        case "SessionNotSet":
                        case "NotAuthenticated":
                            window.location = "SignOut.aspx";
                            break;
                        case "Failure":
                            FancyAlert("Your message could not be sent at this time");
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
        },

        SendAntibullyingAlert: function () {

            // If the wcf service url is not set then show error and dont carry out data call.
            if (!this.CheckServiceUrlSet()) {
                FancyAlert("Cannot connect to service");
                return;
            }

            var parent = this;

            // Data call.
            $.ajax({
                async: true,
                type: "POST",
                url: this.WCFServerUrl + 'Client/User/PanelClient.svc/SendAntiBullyingAlert',
                contentType: "application/json; charset=utf-8",
                failure: function (data) {
                    FancyFailedMessage();
                },
                success: function (data) {
                    switch (data.d.ClientOutcome) {
                        case "Success":
                            FancyAlert("Your message has been sent");
                            break;
                        case "NewActiveSession":
                            window.location = "SignOut.aspx?exit=1006";
                            break;
                        case "SessionNotSet":
                        case "NotAuthenticated":
                            window.location = "SignOut.aspx";
                            break;
                        case "Failure":
                            FancyAlert("Your message could not be sent at this time");
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
        }
    }

    myschoolpanel.WCFServerUrl = serviceurl;
    myschoolpanel.VirutalDir = virutaldir;
    myschoolpanel.EmailTimer = emailRefreshTime;
    myschoolpanel.UrgentTimer = urgentAlertsRefreshTime;
    myschoolpanel.Init();

})(jQuery);