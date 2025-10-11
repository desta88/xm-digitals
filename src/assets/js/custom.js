'use strict';

// === On Load ===
$(window).on('load', function () {
  if (typeof wowAnimation === 'function') {
    wowAnimation();
  }
  if (typeof preloader === 'function') {
    preloader();
  }
});

// === Preloader ===
function preloader() {
  var preloaderEl = $('.preloader');
  if (preloaderEl.length) {
    preloaderEl.delay(0).fadeOut();
  }
}

// === WOW Animation ===
function wowAnimation() {
  if (typeof window.WOW !== 'undefined') {
    var wow = new window.WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: false,
      live: true,
    });
    wow.init();
  }
}

// === Scroll To Top ===
(function () {
  var progressPath = document.querySelector('.scroll-top path');
  if (progressPath) {
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition =
      progressPath.style.WebkitTransition =
      'stroke-dashoffset 10ms linear';

    var updateProgress = function () {
      var scroll = $(window).scrollTop();
      var height = $(document).height() - $(window).height();
      var progress = pathLength - (scroll * pathLength) / height;
      progressPath.style.strokeDashoffset = progress;
    };
    updateProgress();
    $(window).scroll(updateProgress);

    var scrollTopbtn = document.querySelector('.scroll-top');
    if (scrollTopbtn) {
      var offset = 50;
      $(window).on('scroll', function () {
        if ($(this).scrollTop() > offset) {
          $(scrollTopbtn).addClass('show');
        } else {
          $(scrollTopbtn).removeClass('show');
        }
      });
      $(scrollTopbtn).on('click', function (event) {
        event.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 300);
        return false;
      });
    }
  }
})();

// === Shape Mockup Plugin ===
(function ($) {
  $.fn.shapeMockup = function () {
    var $shape = $(this);
    $shape.each(function () {
      var $currentShape = $(this);

      var shapeTop = $currentShape.attr('data-top'),
        shapeRight = $currentShape.attr('data-right'),
        shapeBottom = $currentShape.attr('data-bottom'),
        shapeLeft = $currentShape.attr('data-left');

      $currentShape
        .css({
          top: shapeTop,
          right: shapeRight,
          bottom: shapeBottom,
          left: shapeLeft,
          position: 'absolute',
        })
        .removeAttr('data-top')
        .removeAttr('data-right')
        .removeAttr('data-bottom')
        .removeAttr('data-left')
        .parent()
        .addClass('shape-mockup-wrap');
    });

    return this;
  };
})(jQuery);


// === Mobile Menu Plugin ===
(function ($) {
  $.fn.mobilemenu = function (options) {
    var opt = $.extend(
      {
        menuToggleBtn: '.menu-toggle',
        bodyToggleClass: 'body-visible',
        subMenuClass: 'submenu-class',
        subMenuParent: 'submenu-item-has-children',
        subMenuParentToggle: 'active-class',
        meanExpandClass: 'mean-expand-class',
        appendElement: '<span class="mean-expand-class"></span>',
        subMenuToggleClass: 'menu-open',
        toggleSpeed: 400,
      },
      options
    );

    return this.each(function () {
      var menu = $(this);

      function menuToggle() {
        menu.toggleClass(opt.bodyToggleClass);

        var subMenu = '.' + opt.subMenuClass;
        $(subMenu).each(function () {
          if ($(this).hasClass(opt.subMenuToggleClass)) {
            $(this).removeClass(opt.subMenuToggleClass);
            $(this).css('display', 'none');
            $(this).parent().removeClass(opt.subMenuParentToggle);
          }
        });
      }

      menu.find('li').each(function () {
        var submenu = $(this).find('ul');
        submenu.addClass(opt.subMenuClass);
        submenu.css('display', 'none');
        submenu.parent().addClass(opt.subMenuParent);
        submenu.prev('a').append(opt.appendElement);
        submenu.next('a').append(opt.appendElement);
      });

      function toggleDropDown($element) {
        var $parent = $($element).parent();
        var $siblings = $parent.siblings();

        $siblings.removeClass(opt.subMenuParentToggle);
        $siblings.find('ul').slideUp(opt.toggleSpeed).removeClass(opt.subMenuToggleClass);

        $parent.toggleClass(opt.subMenuParentToggle);
        $($element)
          .next('ul')
          .slideToggle(opt.toggleSpeed)
          .toggleClass(opt.subMenuToggleClass);
      }

      var expandToggler = '.' + opt.meanExpandClass;
      $(expandToggler).each(function () {
        $(this).on('click', function (e) {
          e.preventDefault();
          toggleDropDown($(this).parent());
        });
      });

      $(opt.menuToggleBtn).each(function () {
        $(this).on('click', function () {
          menuToggle();
        });
      });

      menu.on('click', function (e) {
        e.stopPropagation();
        menuToggle();
      });

      menu.find('div').on('click', function (e) {
        e.stopPropagation();
      });
    });
  };
})(jQuery);

// === Popup Sidemenu ===
function popupSideMenu($sideMenu, $sideMunuOpen, $sideMenuCls, $toggleCls) {
    // Sidebar Popup
    $($sideMunuOpen).on('click', function (e) {
        e.preventDefault();
        $($sideMenu).addClass($toggleCls);
    });
    $($sideMenu).on('click', function (e) {
        e.stopPropagation();
        $($sideMenu).removeClass($toggleCls)
    });

    var sideMenuChild = $sideMenu + ' > div';
    $(sideMenuChild).on('click', function (e) {
        e.stopPropagation();
        $($sideMenu).addClass($toggleCls)
    });
    $($sideMenuCls).on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $($sideMenu).removeClass($toggleCls);
    });
};
    
