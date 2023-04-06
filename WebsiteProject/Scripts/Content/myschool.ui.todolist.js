var PopulatetodolistData = {

    WCFServiceUrl: "",

    Identifier: "",

    Init: function (id) {
        var parent = this;
        this.Identifier = id;
        // Setup overlay effect.
        this.SetupOverlay();
        // Add item to list on button click
        $('#todo_add').click(function () {
            parent.AddNewItem();
        });
        // Don't display items until they have loaded.
        $('#todolistitems').hide();
        // Load up existing user data.
        this.RetrieveItems();
        $('#todolistitems').fadeIn('slow');
    },

    // Retrieve Todo items for user from database
    RetrieveItems: function () {
        var parentObject = this;
        jQuery.support.cors = true;
        $.ajax({
            async: true,
            type: "POST",
            url: this.WCFServiceUrl + 'Client/User/Widget/ContentClient.svc/RetrieveUserTodo',
            contentType: "application/json; charset=utf-8",
            data: '{ }',
            failure: function () {
                FancyFailedMessage();
                return false;
            },
            error: function (xhr, ajaxOptions, thrownError) {
                FancyFailedMessage();
                return 0;
            },
            success: function (data) {
                var itemsArray = data.d.Data;
                if (itemsArray.length != 0) {
                    var newitemshtml = "";
                    // Found items on server.  Parse and create html on the widget.
                    for (var i = 0; i < itemsArray.length; i++) {
                        var date = new Date(parseInt(itemsArray[i].DateCreated.substr(6)));
                        var strDateTime = [[parentObject.AddZero(date.getDate()), parentObject.AddZero(date.getMonth() + 1), date.getFullYear()].join("/"), [parentObject.AddZero(date.getHours()), parentObject.AddZero(date.getMinutes())].join(":"), date.getHours() >= 12 ? "PM" : "AM"].join(" ");

                        $('#todolistitems').append('<li class="todo" id="todoitem' + itemsArray[i].TodoID + '"><input type="checkbox" class="done" value="' + itemsArray[i].IsComplete + '" ' + (itemsArray[i].IsComplete == true ? 'checked' : '') + ' /><div id="text_wrapper" ' + (itemsArray[i].IsComplete == true ? 'class="todo_strikeout"' : '') + '>' + itemsArray[i].Description + '<div class="date_created">' + strDateTime + '</div></div><a id="todo_delete" class="link_delete" href="#">x</a></li>');

                        // BIND THE CHECK EVENT.
                        // Load items, bind events to them! (for each)
                        parentObject.BindCheckEvent(itemsArray[i].TodoID);

                        // BIND THE DELETE EVENT.
                        parentObject.BindDeleteEvent(itemsArray[i].TodoID);
                    }
                }
                if (jQuery().masonry) {
                    if ($('#column1').length > 0) {
                        $('#column1').masonry('reload');
                    }
                }
            }
        });
    },

    // Add new item to Todo list on click of button
    AddNewItem: function (description) {
        var parentObject = this;
        // If successully added to db, then...
        //AJAX call will give you an id from DB.
        var list = $("#todolist");
        var count = list.find("li").size();
        var text = $("#todo_newitem").val();

        if (jQuery.trim(text).length == 0) {
            $("#todo_newitem").focus();
            return;
        }
        if (count < 30) {
            parentObject.Create(text);
        }
        else {
            FancyAlert('You can only have a maximum of thirty todo items');
        }
    },

    // Format time
    AddZero: function (num) {
        return (num >= 0 && num < 10) ? "0" + num : num + "";
    },
    // Format date
    GetOrdinal: function (day) {
        if ((day == '1') || (day == '01') || (day == '21')) { return "st"; }
        if ((day == '2') || (day == '02') || (day == '22')) { return "nd"; }
        if ((day == '3') || (day == '03') || (day == '23')) { return "rd"; }
        return "th";
    },
    // Format Date
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
    },

    // Create new Todo item
    Create: function (description) {
        var parentobj = this;
        // Data call.
        $.ajax({
            async: false,
            type: "POST",
            url: this.WCFServiceUrl + 'Client/User/Widget/ContentClient.svc/CreateUserTodo',
            contentType: "application/json; charset=utf-8",
            data: '{ "description" : "' + description + '" }',
            failure: function () {
                FancyFailedMessage();
                return 0;
            },
            success: function (data) {
                if (data.d.ClientOutcome == "Success") {
                    $("#todo_newitem").val('');
                    $("#todo_newitem").focusout();

                    // BIND THE CHECK EVENT.
                    // Load items, bind events to them! (for each)
                    parentobj.BindCheckEvent(data.d.Data);

                    // BIND THE DELETE EVENT.
                    parentobj.BindDeleteEvent(data.d.Data);

                    $('#todolistitems').empty();
                    parentobj.RetrieveItems();
                }
                else {
                    FancyFailedMessage();
                    return 0;
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                FancyFailedMessage();
                return 0;
            }
        });
    },

    // Delete Todo item
    Delete: function (todoid) {
        $.ajax({
            async: false,
            type: "POST",
            url: this.WCFServiceUrl + 'Client/User/Widget/ContentClient.svc/DeleteuserTodo',
            contentType: "application/json; charset=utf-8",
            data: '{ "todoid" : "' + todoid + '" }',
            failure: function () {
                FancyFailedMessage();
            },
            success: function (data) {
                if (data.d.ClientOutcome == "Success") {
                    $("#todoitem" + todoid).remove();
                    return false;
                }
                else {
                    FancyFailedMessage();
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                FancyFailedMessage();
            }
        });
    },

    //Bind the delete event to the 'x' button
    BindDeleteEvent: function (todoid) {
        var myparent = this;
        // Delete item from list on click of delete link (x)
        $("#todoitem" + todoid).find('.link_delete').click(function () {
            myparent.Delete(todoid);
            return false;
        });
    },

    // Update a Todo item (checked, description)
    Update: function (todoid, description, checked) {
        $.ajax({
            async: true,
            type: "POST",
            url: this.WCFServiceUrl + 'Client/User/Widget/ContentClient.svc/UpdateUserTodo',
            contentType: "application/json; charset=utf-8",
            data: '{ "todoid" : "' + todoid + '", "iscomplete":"' + checked + '" ,"newdescription":"' + description + '" }',
            failure: function () {
                FancyFailedMessage();
                return false;
            },
            success: function (data) {
                if (data.d.ClientOutcome == "Success") {
                    return true;
                }
                else {
                    FancyFailedMessage();
                    return false;
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                FancyFailedMessage();
                return false;
            }
        });
    },

    // Bind check event to tickbox
    BindCheckEvent: function (itemid) {
        var myParent = this;
        // Strikethrough list item on click of checkbox
        $("#todoitem" + itemid).find('.done').change(function () {

            var des = $("#todoitem" + itemid).find('#text_wrapper').html().toLowerCase();
	    var indexOfdiv = des.indexOf('<div');

            var description = des.substring(0, indexOfdiv);
            if (description.length == 0) { description = des; }

	    description = description.replace(/(\r\n|\n|\r)/gm,"");

            // Send update to server, no need to wait for response.
            myParent.Update(itemid, description, $(this).is(':checked'));

            if ($(this).is(':checked')) {
                $(this).parent().find('#text_wrapper').addClass('todo_strikeout');
            }
            else {
                $(this).parent().find('#text_wrapper').removeClass('todo_strikeout');
            }
        });
    },

    // Over 'Enter Todo...' on text input box
    SetupOverlay: function () {
        // Label for default text (Enter Todo...)
        $('#add-todo li label').each(function () {
            $(this).addClass('overlay');
        });
        $('#add-todo li input[type=text]').each(function () {
            if ($(this).val()) {
                $(this).parent('li').find('label').hide();
            }
        });

        $('#add-todo li input[type=text]').bind('paste', function (e) {
            $(this).parent('li').find('label').hide();
        });

        $('#add-todo li input[type=text]').focusin(function () {
            $(this).parent('li').find('label').addClass('dim');
            $(this).keypress(function() {
                $(this).parent('li').find('label').hide();
            });
        });
        $('#add-todo li input[type=text]').focusout(function () {
            if (!$(this).val()) {
                $(this).parent('li').find('label').removeClass('dim').show();
            }
        });
    }
}