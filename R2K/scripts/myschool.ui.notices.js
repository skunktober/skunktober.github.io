(function ($) {

    // user panel operations namespaced.
    var myschoolnoticeboard = {
        Init: function () {
            //Alerts slideshow
            if ($('#alerts-slideshow').length > 0) {
                $('#alerts-slideshow').cycle({
                    fx: 'fade',
                    delay: 5000,
                    speed: 500,
                    fit: 0,
                    pause: 0,
                    prev: '#alerts-prev',
                    cleartype: 1,
                    next: '#alerts-next'
                });
                $('#resumeButton').hide();
                $('#pauseButton').click(function () {
                    $('#alerts-slideshow').cycle('pause');
                    $(this).hide();
                    $('#resumeButton').show();
                    return false;
                });
                $('#resumeButton').click(function () {
                    $('#alerts-slideshow').cycle('resume');
                    $(this).hide();
                    $('#pauseButton').show();
                    return false;
                });
                //.stop(true, true).fadeIn({ duration: slideDuration, queue: false }).css('display', 'none').slideDown(slideDuration);
                $('#alerts').fadeIn().slideDown('slow');
            };
        } //End init
    }

    myschoolnoticeboard.Init();

})(jQuery);