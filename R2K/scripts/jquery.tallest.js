(function ($) {
    $.fn.tallest = function (itemsSelector) {
        return this.each(function () {
            var $this = $(this),
			        $items = $(itemsSelector, this),
			        tallest = 0;

            $items.each(function () {
                var $thisItem = $(this);
                if ($thisItem.height() > tallest) {
                    tallest = $thisItem.height();
                }
            });
            if (tallest > tallestOnPage) {
                tallestOnPage = tallest;
            }
            $('.slides_container').height(tallestOnPage) + 18;
        });
    };
})(jQuery);
var tallestOnPage = 0;