# jQuery Delayed Scroll

Utility helper for attaching events when user scrolls.

Usage:
``` javascript
/**
 * Callback function that you want to trigger,
 * when user scrolls the page.
 * @param {int} scrollTop - plugin returns current page scroll top
 */
function somethingHappeningOnScroll(scrollTop){
    // Do something cool.
}

// Attach event simply by passing your function
DelayedScroll.attach(somethingHappeningOnScroll);

// ... and detach it by passing the same function again
App.DelayedScroll.detach(closeOnScroll);
```

More docs coming soon!
