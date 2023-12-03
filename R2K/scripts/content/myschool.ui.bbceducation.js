var PopulatebbceducationData = {

    WCFServiceUrl: "",

    Init: function (contentHolder) {
        // If the masonry plugin exists then reload it.
        if (jQuery().masonry) {
            if ($('#column1').length > 0) {
                $('#column1').masonry('reload');
            }
        }

        $('#' + contentHolder).rssfeed('http://feeds.bbci.co.uk/news/education/rss.xml', {
            limit: 5,
            slideid: 'bbced',
            ssl: true
        });

        // If the masonry plugin exists then reload it.
        if (jQuery().masonry) {
            if ($('#column1').length > 0) {
                $('#column1').masonry('reload');
            }
        }
    }
}
//Code makes this call: PopulatebbceducationData.Init(contentHolder);
