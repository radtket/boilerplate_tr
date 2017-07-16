/* ---------------------------------------------
Scripts initialization
--------------------------------------------- */

window.addEventListener('DOMContentLoaded', () => {
    fadeOut(document.querySelector('.se-pre-con'));
    window.dispatchEvent(new Event('scroll'));
    window.dispatchEvent(new Event('resize'));
});


document.addEventListener('DOMContentLoaded', () => {
    init_classic_menu();
    initPageSliders();
    initSmoothScrolling();
    init_wow();
});


window.onresize = () => {
    init_classic_menu_resize();
    js_height_init();
}




/* --------------------------------------------
Platform detect
--------------------------------------------- */
let mobileTest;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    mobileTest = true;
    document.documentElement.classList.add("mobile");
} else {
    mobileTest = false;
    document.documentElement.classList.add("no-mobile");
}

let mozillaTest;
if (/mozilla/.test(navigator.userAgent)) {
    mozillaTest = true;
} else {
    mozillaTest = false;
}
let safariTest;
if (/safari/.test(navigator.userAgent)) {
    safariTest = true;
} else {
    safariTest = false;
}

// Detect touch devices    
if (!("ontouchstart" in document.documentElement)) {
    document.documentElement.className += " no-touch";
}


/* ---------------------------------------------
 Sections helpers
 --------------------------------------------- */

// Sections backgrounds
var page_section = document.querySelectorAll(".home-section, .page-section, .small-section, .hero--section");

page_section.forEach((indx) => {
    if (indx.hasAttribute("data-background")) {
        indx.style.backgroundImage = "url(" + indx.dataset.background + ")";
    }
});



// Function for block height 100%
function height_line(height_object, height_donor) {
    height_object.style.height = height_donor.offsetHeight + "px";
    height_object.style.lineHeight = height_donor.offsetHeight + "px";
}




function js_height_init(){
    (function($){
        $(".js-height-full").height($(window).height());
        $(".js-height-parent").each(function(){
            $(this).height($(this).parent().first().height());
        });
    })(jQuery);
}




// Fade Out

function fadeOut(el) {
    el.style.opacity = 1;

    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
}

// Fade In
function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";

    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
}





const main_nav = document.querySelector('.main-nav');
const desktop_nav = document.querySelector(".inner-nav");
const hamburger_menu = document.querySelector("#js-mobile-menu");



function init_classic_menu_resize() {

    let window_width = window.innerWidth;
    let window_height = window.innerHeight;
    let desktop_nav_ul = document.querySelector(".inner-nav").children;


    desktop_nav.style.maxHeight = window_height - desktop_nav.offsetHeight - 20 + "px";

    if (window_width <= 1000) {
        main_nav.classList.add("mobile-on");
        desktop_nav.classList.add("closed");
    } else if (window_width > 1000) {
        main_nav.classList.remove("mobile-on");
    }

}



function init_classic_menu() {

    if (main_nav.classList.contains("transparent")) {
        main_nav.classList.add("js-transparent");
    }

    window.onscroll = () => {
        if (window.scrollY > 10) {
            document.querySelector(".js-transparent").classList.remove("transparent");
            document.querySelector(".nav-download_btn").classList.remove("btn-border-w");
        } else {
            document.querySelector(".js-transparent").classList.add("transparent");
            document.querySelector(".nav-download_btn").classList.add("btn-border-w");
        }
    }


    // Hamburger Menu
    hamburger_menu.addEventListener("click", (evnt) => {
        evnt.preventDefault();
        // desktop_nav.classList.toggle("closed");
        if (desktop_nav.classList.contains('closed')) {
            desktop_nav.classList.remove('closed');
        } else {
            desktop_nav.classList.add('closed')
        }

    });




}




/* ---------------------------------------------
 Sliders
 --------------------------------------------- */


function initPageSliders() {

    var client__slider = new Swiper('.clients__swiper', {
        slidesPerView: 3,
        spaceBetween: 50,
        slideClass: 'clients__swiper--item',
        nextButton: '.swiper-next',
        prevButton: '.swiper-prev',
        breakpoints: {
            1024: {
                slidesPerView: 3,
                spaceBetween: 40
            },
            900: {
                slidesPerView: 3,
                spaceBetween: 25
            },
            700: {
                slidesPerView: 2,
                spaceBetween: 25
            },
            600: {
                slidesPerView: 1,
                spaceBetween: 10
            }
        }
    });


    var swiper = new Swiper('.testimonial__swiper', {
        slideClass: 'testimonial__swiper--item',
        nextButton: '.swiper-next',
        prevButton: '.swiper-prev',
        pagination: '.swiper__pagination',
        autoHeight: true,
        paginationClickable: true,
        bulletClass: 'swiper__pagination--item',
        bulletActiveClass: 'active',
        paginationBulletRender: function(swiper, index, className) {
            return '<div class="' + className + '">' + '<span></span>' + '</div>';
        }

    });




};





/* ---------------------------------------------
 Anchor Smooth Scrolling
 --------------------------------------------- */

function initSmoothScrolling() {
    if (isCssSmoothSCrollSupported()) {
        document.getElementById('css-support-msg').className = 'supported';
        return;
    }

    var duration = 400;

    var pageUrl = location.hash ?
        stripHash(location.href) :
        location.href;

    delegatedLinkHijacking();
    //directLinkHijacking();

    function delegatedLinkHijacking() {
        document.body.addEventListener('click', onClick, false);

        function onClick(e) {
            if (!isInPageLink(e.target))
                return;

            e.stopPropagation();
            e.preventDefault();

            jump(e.target.hash, {
                duration: duration,
                callback: function() {
                    setFocus(e.target.hash);
                }
            });
        }
    }

    function directLinkHijacking() {
        [].slice.call(document.querySelectorAll('a'))
            .filter(isInPageLink)
            .forEach(function(a) {
                a.addEventListener('click', onClick, false);
            });

        function onClick(e) {
            e.stopPropagation();
            e.preventDefault();

            jump(e.target.hash, {
                duration: duration,
            });
        }

    }

    function isInPageLink(n) {
        return n.tagName.toLowerCase() === 'a' &&
            n.hash.length > 0 &&
            stripHash(n.href) === pageUrl;
    }

    function stripHash(url) {
        return url.slice(0, url.lastIndexOf('#'));
    }

    function isCssSmoothSCrollSupported() {
        return 'scrollBehavior' in document.documentElement.style;
    }

    // Adapted from:
    // https://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/
    function setFocus(hash) {
        var element = document.getElementById(hash.substring(1));

        if (element) {
            if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
                element.tabIndex = -1;
            }

            element.focus();
        }
    }

}

function jump(target, options) {
    var
        start = window.pageYOffset,
        opt = {
            duration: options.duration,
            offset: options.offset || 0,
            callback: options.callback,
            easing: options.easing || easeInOutQuad
        },
        distance = typeof target === 'string' ?
        opt.offset + document.querySelector(target).getBoundingClientRect().top :
        target,
        duration = typeof opt.duration === 'function' ?
        opt.duration(distance) :
        opt.duration,
        timeStart, timeElapsed;

    requestAnimationFrame(function(time) {
        timeStart = time;
        loop(time);
    });

    function loop(time) {
        timeElapsed = time - timeStart;

        window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));

        if (timeElapsed < duration)
            requestAnimationFrame(loop)
        else
            end();
    }

    function end() {
        window.scrollTo(0, start + distance);

        if (typeof opt.callback === 'function')
            opt.callback();
    }

    // Robert Penner's easeInOutQuad - http://robertpenner.com/easing/
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2
        if (t < 1) return c / 2 * t * t + b
        t--
        return -c / 2 * (t * (t - 2) - 1) + b
    }

}









/* ---------------------------------------------
 WOW animations
 --------------------------------------------- */

function init_wow() {
    var wow = new WOW({
        boxClass: 'wow', // default
        animateClass: 'animated', // default
        offset: 90, // default
        mobile: false, // default
        live: true // default
    });
    wow.init();
};




(function() {

  'use strict';

  /**
   * tabs
   *
   * @description The Tabs component.
   * @param {Object} options The options hash
   */
  var tabs = function(options) {

    var el = document.querySelector(options.el);
    var tabNavigationLinks = el.querySelectorAll(options.tabNavigationLinks);
    var tabContentContainers = el.querySelectorAll(options.tabContentContainers);
    var activeIndex = 0;
    var initCalled = false;

    /**
     * init
     *
     * @description Initializes the component by removing the no-js class from
     *   the component, and attaching event listeners to each of the nav items.
     *   Returns nothing.
     */
    var init = function() {
      if (!initCalled) {
        initCalled = true;
        el.classList.remove('no-js');
        
        for (var i = 0; i < tabNavigationLinks.length; i++) {
          var link = tabNavigationLinks[i];
          handleClick(link, i);
        }
      }
    };

    /**
     * handleClick
     *
     * @description Handles click event listeners on each of the links in the
     *   tab navigation. Returns nothing.
     * @param {HTMLElement} link The link to listen for events on
     * @param {Number} index The index of that link
     */
    var handleClick = function(link, index) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        goToTab(index);
      });
    };

    /**
     * goToTab
     *
     * @description Goes to a specific tab based on index. Returns nothing.
     * @param {Number} index The index of the tab to go to
     */
    var goToTab = function(index) {
      if (index !== activeIndex && index >= 0 && index <= tabNavigationLinks.length) {
        tabNavigationLinks[activeIndex].classList.remove('is-active');
        tabNavigationLinks[index].classList.add('is-active');
        tabContentContainers[activeIndex].classList.remove('is-active');
        tabContentContainers[index].classList.add('is-active');
        activeIndex = index;
      }
    };

    /**
     * Returns init and goToTab
     */
    return {
      init: init,
      goToTab: goToTab
    };

  };

  /**
   * Attach to global namespace
   */
  window.tabs = tabs;

})();






