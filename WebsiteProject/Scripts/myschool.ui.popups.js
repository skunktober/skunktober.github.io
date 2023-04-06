var myschoolPopups = {
    Init: function () {
        if (jQuery().fancybox) {

            if ($("#cookies").length > 0) {
                $("#cookies").fancybox({ padding: 0, width: 900, height: 575, autoScale: false, titleShow: false, transitionIn: "none", transitionOut: "none", type: "iframe", scrolling: "no" })
            }
            if ($("#privacy").length > 0) {
                $("#privacy").fancybox({
                    padding: 0, width: 900, height: 575, autoScale: false, titleShow: false, transitionIn: "none", transitionOut: "none", type: "iframe", scrolling: "no",
                    'onComplete': function () {
                        $("#fancybox-wrap").css({ "position": "fixed" });
                    }
                })
            }
            if ($("#aup").length > 0) {
                $("#aup").fancybox({ padding: 0, width: 900, height: 575, autoScale: false, titleShow: false, transitionIn: "none", transitionOut: "none", type: "iframe", scrolling: "no" })
            }
            if ($("#aPasswordFormatRules_StudentPasswordChanger").length > 0) {
                $("#aPasswordFormatRules_StudentPasswordChanger").fancybox({ padding: 0, width: 420, height: 380, autoScale: false, titleShow: false, transitionIn: "none", transitionOut: "none", type: "iframe", scrolling: "no" })
            }
            if ($("#AccessibilityGuidelines").length > 0) {
                $("#AccessibilityGuidelines").fancybox({ padding: 0, width: 900, height: 575, autoScale: false, titleShow: false, transitionIn: "none", transitionOut: "none", type: "iframe", scrolling: "no" })
            }
            $("#language").fancybox({ padding: 30, type: "inline", transitionIn: "none", titleShow: false, transitionOut: "none" });
            if ($("#school_popup").length > 0) {
                $("#school_popup,#school_popup_name").fancybox({ padding: 0, width: 628, height: 330, titleShow: false, autoScale: false, transitionIn: "none", transitionOut: "none", type: "iframe", scrolling: "no" })
            }
        }
    }
}; myschoolPopups.Init();