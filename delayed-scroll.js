/**
 * jQuery Delayed Scroll v1.0.0 - Utility helper for adding events on page scroll.
 * https://github.com/dev-labs-bg/delayed-scroll
 */

(function(window, $) {
    window.DelayedScroll = window.DelayedScroll || {};

    var scrollTimeout = null;
    var delayedScrollAttachedEvents = [];
    var initialized = false;
    var $window = $(window);

    /**
     * This private function calls the actual callbacks
     */
    function onDelayedScroll(){
        // Get the new scrollTop position (so inner callbacks have it ready)
        var currentScrollTop = $window.scrollTop();

        // Call the callbacks
        for(var i = 0, len = delayedScrollAttachedEvents.length; i < len; i++){
            delayedScrollAttachedEvents[i](currentScrollTop);
        }

        // Clear the timeout object
        scrollTimeout = null;
    }

    /**
     * Private function to handle the scroll event as received from the browser
     */
    function onScrollEventTimeouted(){
        if (scrollTimeout) {
            // clear the timeout, if one is pending
            clearTimeout(scrollTimeout);
            scrollTimeout = null;
        }

        scrollTimeout = setTimeout(onDelayedScroll, 250);
    }

    /**
     * Private function to handle the scroll event as received from the browser
     *
     * @type {int} lastScrollEvent - the timestamp of the last time we triggered a scroll event
     */
    var lastScrollEvent = 0;
    function onScrollEventTimeLimited(){
        if((new Date()).getTime() - lastScrollEvent > 250){
            onDelayedScroll();
            lastScrollEvent = (new Date()).getTime();
        }
    }

    /**
     * Combines a timelimited event (once every 250ms)
     * and a timeouted event (250ms after you stop scrolling)
     */
    function onScrollEventMixed(){
        // Call it once in every 250ms
        onScrollEventTimeLimited();

        // Schedule a delayed event also (for after you've stopped scrolling)
        onScrollEventTimeouted();
    }

    /**
     * Private function to kick off
     * scroll event functionality
     * after the first attach
     */
    function initialize(){
        $window.on('scroll', onScrollEventMixed);

        initialized = true;
    }

    /**
     * Attach a scroll event on the $(window) with a timeout
     * which follows a javascript design pattern
     * (avoid attaching handlers to the window scroll event)
     *
     * https://github.com/shichuan/javascript-patterns/blob/master/jquery-patterns/window-scroll-event.html
     *
     * @type {{attach: Function, detach: Function}}
     */
    window.DelayedScroll = {
        /**
         * Attach a new callback to the delayed scroll event
         *
         * @param callback
         */
        attach: function(callback){
            if( ! initialized) {
                initialize();
            }

            delayedScrollAttachedEvents.push(callback);
        },

        /**
         * Detach a callback from the delayed scroll event
         *
         * @param callback
         */
        detach: function(callback){
            var callbackIndex = delayedScrollAttachedEvents.indexOf(callback);
            if(callbackIndex !== -1) {
                delayedScrollAttachedEvents.splice(callbackIndex, 1);
            }
        }
    };
})(window, $);
