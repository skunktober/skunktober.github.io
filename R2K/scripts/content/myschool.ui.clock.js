$(window).resize(function () {
    $('.rapClock').each(function () {
        this.Render();
    });
});

var PopulateclockData = {
    Init: function () {
        $('#javascript-clock').jsRapClock();
    }
};

(function ($) {
    $.fn.jsRapClock = function (options) {

        var currentTime = new Date();
        var month = currentTime.getMonth();
        var day = currentTime.getDate();
        var year = currentTime.getFullYear();

        var myDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        var myMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        var html = myDays[currentTime.getDay()] + '<br><span class="date">' + day + '</span><br><span class="month-year">' +
        myMonths[month] + ' ' + year;
        $("#clockDate").html(html);

        return this.each(function () {
            this.opt = $.extend({
                caption: '',
                clockNumbers: true,
                clock: 0,
                stopwatch: 0,
                pitch: 1.0,
                rate: 0.8,
                shiftH: 0,
                shiftM: 0,
                shiftS: 0
            }, options);

            let base = this;
           
            this.Render = function () {
                $(this).empty();
                var w = 100;
                $(this).addClass('rapClock').height(w);
                if (this.opt.caption)
                    $('<div>').addClass('rapClockCaption').css({ 'font-size': (w * 0.08) + 'px' }).text(this.opt.caption).appendTo(this);
                for (var n = 0; n < 12; n++)
                    if (this.opt.clockNumbers)
                        $('<div>').text((n + 5) % 12 + 1).addClass('rapClockNumbers').css({ 'font-size': (w * 0.1) + 'px', transform: 'translate(-50%,-50%) rotate(' + (n * 30) + 'deg) translate(0,' + (w * 0.36) + 'px) rotate(-' + (n * 30) + 'deg)' }).appendTo(this);
                    else
                        $('<div>').addClass('rapClockHours').css('transform', 'translate(-50%,-50%) rotate(' + (n * 30) + 'deg) translate(0,500%)').appendTo(this);
                $('<div>').addClass('rapClockHands rapClockH').appendTo(this);
                $('<div>').addClass('rapClockHands rapClockM').appendTo(this);
                $('<div>').addClass('rapClockHands rapClockS').appendTo(this);
                this.ShowTime();
            }

            this.ShowTime = function () {
                let d = new Date();
                let t = d.getTime() + this.opt.shiftH * 3600000 + this.opt.shiftM * 60000 + this.opt.shiftS * 1000;
                d.setTime(t);
                let h = d.getHours();
                let m = d.getMinutes();
                let s = d.getSeconds();
                $('.rapClockH', this).css('transform', 'translate(-50%,-50%) rotate(' + (h * 30 + m / 2) + 'deg) translate(0,-40%)');
                $('.rapClockM', this).css('transform', 'translate(-50%,-50%) rotate(' + (m * 6) + 'deg) translate(0,-45%)');
                $('.rapClockS', this).css('transform', 'translate(-50%,-50%) rotate(' + (s * 6) + 'deg) translate(0,-30%)');
            }

            this.Render();
            setInterval(function () {
                base.ShowTime();
            }, 1000);

        });

    }
})(jQuery);

$(document).ready(function() {
    $('#javascript-clock').jsRapClock();
});
