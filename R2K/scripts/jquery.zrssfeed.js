/**
* Plugin: jquery.zRSSFeed
* 
* Version: 1.1.5
* (c) Copyright 2010-2011, Zazar Ltd
* 
* Description: jQuery plugin for display of RSS feeds via Google Feed API
*              (Based on original plugin jGFeed by jQuery HowTo. Filesize function by Cary Dunn.)
* 
* History:
* 1.1.5 - Target option now applies to all feed links
* 1.1.4 - Added option to hide media and now compressed with Google Closure
* 1.1.3 - Check for valid published date
* 1.1.2 - Added user callback function due to issue with ajaxStop after jQuery 1.4.2
* 1.1.1 - Correction to null xml entries and support for media with jQuery < 1.5
* 1.1.0 - Added support for media in enclosure tags
* 1.0.3 - Added feed link target
* 1.0.2 - Fixed issue with GET parameters (Seb Dangerfield) and SSL option
* 1.0.1 - Corrected issue with multiple instances
*
**/
(function ($) {

    $.fn.rssfeed = function (url, options, fn) {

        // Set pluign defaults
        var defaults = {
            limit: 5,
            header: false,
            titletag: 'h4',
            date: true,
            content: true,
            snippet: true,
            media: false,
            showerror: true,
            errormsg: '',
            key: null,
            ssl: true,
            linktarget: '_self',
            slideid: 'slides'
        };
        var options = $.extend(defaults, options);

        // Functions
        return this.each(function (i, e) {
            var $e = $(e);
            var s = '';

            // Check for SSL protocol
            if (options.ssl) s = 's';

            // Add feed class to user div
            //if (!$e.hasClass('rssFeed')) $e.addClass('rssFeed');

            // Check for valid url
            if (url == null) return false;

            jQuery.support.cors = true;
            $.ajax({
                async: true,
                type: "POST",
                url: serviceurl + 'Client/User/SecurityClient.svc/AllowedConnection',
                data: '{ "url" : "' + url + '" }',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data.d.Data != null) {
                        switch (data.d.Data.StatusCode) {
                            case 401:
                                CheckConnectionAllowed = false;
                                $(e).html('<div class="rssError"><p>Could not load rss feed</p></div>');
                                if (jQuery().masonry) { if ($('#column1').length > 0) { $('#column1').masonry('reload'); } }
                                break; // No content
                            case 204:
                                CheckConnectionAllowed = false;
                                $(e).html('<div class="rssError"><p>Could not load rss feed</p></div>');
                                if (jQuery().masonry) { if ($('#column1').length > 0) { $('#column1').masonry('reload'); } }
                                break; // Unauthorised
                            case 403:
                                CheckConnectionAllowed = false;
                                $(e).html('<div class="rssError"><p>Could not load rss feed</p></div>');
                                if (jQuery().masonry) { if ($('#column1').length > 0) { $('#column1').masonry('reload'); } }
                                break; // Forbidden
                            case 407:
                                CheckConnectionAllowed = false;
                                $(e).html('<div class="rssError"><p>Could not load rss feed</p></div>');
                                if (jQuery().masonry) { if ($('#column1').length > 0) { $('#column1').masonry('reload'); } }
                                break; // Proxy auth required
                            case 502:
                                CheckConnectionAllowed = false;
                                $(e).html('<div class="rssError"><p>Could not load rss feed</p></div>');
                                if (jQuery().masonry) { if ($('#column1').length > 0) { $('#column1').masonry('reload'); } }
                                break; // Bad gateway
                            default:

                                if (!data.d.Data.Redirected) {
                                    // Create Google Feed API address
                                    var api = "http" + s + "://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q=" + encodeURIComponent(url);
                                    if (options.limit != null) api += "&num=" + options.limit;
                                    if (options.key != null) api += "&key=" + options.key;
                                    api += "&output=json_xml"

                                    // Send request
                                    $.getJSON(api, function (data) {

                                        // Check for error
                                        if (data.responseStatus == 200) {

                                            // Process the feeds
                                            _process(e, data.responseData, options);

                                            // Optional user callback function
                                            if ($.isFunction(fn)) fn.call(this, $e);
                                            $('.slides_container').tallest('div');
                                            if (jQuery().masonry) { if ($('#column1').length > 0) { $('#column1').masonry('reload'); } }
                                        } else {

                                            // Handle error if required
                                            if (options.showerror)
                                                if (options.errormsg != '') {
                                                    var msg = options.errormsg;
                                                } else {
                                                    var msg = data.responseDetails;
                                                };
                                            $(e).html('<div class="rssError"><p>Could not load Rss feed</p></div>');
                                            if (jQuery().masonry) { if ($('#column1').length > 0) { $('#column1').masonry('reload'); } }
                                        };
                                    });
                                }
                                else {
                                    $(e).html('<div class="rssError"><p>Could not load Rss feed</p></div>');
                                    if (jQuery().masonry) { if ($('#column1').length > 0) { $('#column1').masonry('reload'); } }
                                }
                                break;
                        }
                    }
                }
            });
        });
    };

    // Function to create HTML result
    var _process = function (e, data, options) {

        // Get JSON feed data
        var feeds = data.feed;
        if (!feeds) {
            return false;
        }


        var html = '';

        // Add body
        html += '<div class="rss-news">' +
			'<div id="' + options.slideid + '" class="slides">'
            + '<div class="slides_container">';


        // Add feeds
        for (var i = 0; i < feeds.entries.length; i++) {

            // Get individual feed
            var entry = feeds.entries[i];
            var pubDate;

            // Format published date
            if (entry.publishedDate) {
                var myDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
                var entryDate = new Date(entry.publishedDate);
                pubDate = myDays[entryDate.getDay()] + ' ' + entryDate.toLocaleDateString();
            }

            html += '<div class="slide"><div class="rss-item"><h3>';
            html += entry.title;
            html += '</h3>';

            if (pubDate != undefined) {
                if (pubDate != '') {
                    html += '<p class="date">';
                    html += pubDate;
                    html += '</p>';
                }
            }
            html += '<p>';

            if (options.snippet && entry.contentSnippet != '') {
                var content = entry.contentSnippet;
            } else {
                var content = entry.content;
            }

            html += content;
            html += '<br><br>';

            if (entry.link != undefined) {
                if (entry.link != '') {
                    html += '<a target="_blank" href="';
                    html += entry.link;
                    html += '"title="Read More">Read More</a>';
                }
            }
            html += '</p>';
            html += '</div></div>';

        }
        if (feeds.entries.length > 1) {
            html += '</div><a href="#" class="prev" title="Previous"><img src="images/arrow-prev.png" width="26" height="27" alt="Arrow Prev" /></a>';
            html += '<a href="#" class="next" title="Next"><img src="images/arrow-next.png" width="26" height="27" alt="Arrow Next" /></a>';
            html += '</div></div>';
        }

        $(e).html(html);

        //  If he slides plugin exists then set slides for this item.
        // Selector Different for BBC Education
        if (jQuery().slides) {

            if (feeds.entries.length > 1) {
                if (options.slideid == 'bbced' || options.slideid == 'natgeo' || options.slideid == 'clsntcs' || options.slideid == 'publicntcs') {
                    $('#' + options.slideid).slides({
                        play: 0,
                        pause: 2500,
                        hoverPause: true
                    });
                } else {
                    $('#' + options.slideid).find('.slides').slides({
                        play: 0,
                        pause: 2500,
                        hoverPause: true
                    });
                }
            }

            // Reload masonry control.
            if (jQuery().masonry) {
                if ($('#column1').length > 0) {
                    $('#column1').masonry('reload');
                }
            }
        }
    };


})(jQuery);
