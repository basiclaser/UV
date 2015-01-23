

function uvApp() {


    var hide = function () {
        $('.uv-app-invisible').fadeTo("fast", 0);
        $('.uv-app-invisible').addClass("uv-app-displace");
    };

    // KEYDOWN

    $(document).on('keydown', null, 'shift', function (e) {

        $('*').css('cursor', 'crosshair');
        $("*").css("user-select", "none");
        $("*").on("mouseenter", function () {
            $(this).addClass("uv-app-highlight");
        });
        $("*").on("mouseleave", function () {
            $(this).removeClass("uv-app-highlight");
        });


        //reveal invisible elements
        $('.uv-app-invisible').fadeTo("fast", 1);
        $('.uv-app-invisible').removeClass("uv-app-displace");

        // click to toggle visibility
        $('body').on("click", "*", function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $(this).toggleClass("uv-app-invisible");
            //change savestate
            if ($(this).hasClass("uv-app-invisible")) {
                var key = "uv-app " + getElementPath(this);

                 localStorage.setItem(key, getElementPath(this));
            } else {
                    localStorage.removeItem(key, getElementPath(this));
            }
        });
    });


        // KEYUP

    // set click behaviour back to default
    $(document).on('keyup', function (e) {

        //unstyle the cursor
        $('*').css('cursor', 'auto');
        $('*').css("user-select", "auto");

        //remove any remaining .highlight
        $('*').removeClass('uv-app-highlight');

        //remove event handlers
        $('*').off("click", "**");
        $('*').off('mouseenter mouseleave');

        // finally, hide the elements
        hide();
    });

}

uvApp();




//  Accurate Url detect
//
//function simpleURL(protocol, domain, path){
//    return protocol + "://" + domain "/" + path;
//}
//
//var urls = paths.map(function(path){
//    return simpleURL("http", siteDomain, path);
//})


// css selector generator
function getElementPath(element) {
    return $(element).parents().andSelf().map(function () {
        var $this = $(this);
        var tagName = this.nodeName;
        if ($this.siblings(tagName).length > 0) {
            tagName += ":nth-of-type(" + $this.prevAll(tagName).length + ")";
        }
        return tagName;
    }).get().join(".");
}

