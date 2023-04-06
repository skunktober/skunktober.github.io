var PopulateartpadData = {

    WCFServiceUrl: "",

    Init: function() {

        var draw = false;
        var x, y = '';
        var canvas = document.getElementById("can");

        if (canvas.getContext) {
            $("#canvas_actual").show();
            $("#canvas_nohtml5").remove();

            var ctx = canvas.getContext("2d");
            var os = 0;
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 10;
            ctx.lineCap = "round";
            var offset = $("#can").offset();

            $("#can").mousedown(function(e) {
                var offset = $("#can").offset();
                draw = true;
                ctx.beginPath();
                ctx.moveTo(e.pageX - offset.left, e.pageY + os - offset.top);
                ctx.lineTo(e.pageX - offset.left + 0.1, e.pageY + os - offset.top + 0.1);
                ctx.stroke();
                //  console.log(offset.top);
            });

            $("#can").mouseout(function (e) {
                draw = false;
            });

            $("#can").mouseup(function() {
                draw = false;
            });

            $("#can").mousemove(function(e) {
                if (draw === true) {
                    var offset = $("#can").offset();
                    ctx.beginPath();
                    ctx.moveTo(e.pageX - offset.left, e.pageY + os - offset.top);
                    ctx.lineTo(e.pageX - offset.left + 1, e.pageY + os - offset.top + 1);
                    ctx.stroke();
                }
            });

            $("#canvas_colors > div").click(function() {
                ctx.strokeStyle = $(this).css("background-color");
                $('#canvas_colorselected').css("background-color", $(this).css("background-color"));
            });

            $("#canvas_pens > div").click(function() {
                $('div').removeClass('canvas_selected');
                $(this).addClass('canvas_selected');
                ctx.lineWidth = $(this).attr("data-size");
            });

            $("#canvas_save").click(function() {
                $("#data").val(canvas.toDataURL());
                $("#frm").trigger('submit');
            });

            $("#canvas_clear").click(function() {
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.strokeStyle = '#000';
                $('#canvas_colorselected').css("background-color", "#000");
                ctx.fillStyle = "#fff";
                return false;
            });
        }
        else {
            $('#canvas_actual').hide();
            $('#canvas_nohtml5').show();
        }

        // If the masonry plugin exists then reload it.
        if (jQuery().masonry) {
            if ($('#column1').length > 0) {
                $('#column1').masonry('reload');
            }
        }
    } //End init
};