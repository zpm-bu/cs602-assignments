===============================================================================
                                   Problem 1
===============================================================================

I hope this one is as easy as it seems.

Source: `callbacks.js <./callbacks.js>`_.

Definition
----------

A *callback* is a function which is executed as part of executing some parent
function; the callback's execution is delayed and timed out based on the
parent, not on the callback's call in-script.

Any function can be a callback, so we just define it as we would any other
function.


Snippet
-------

Some simple callbackness::

    // A callback: Execute the inner function () => {...} after a delay

    setTimeout(() => {
      console.log("Delayed execution");
    }, 1000);
