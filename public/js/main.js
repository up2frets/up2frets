$(function() {

	var $body = $('body'),
		$mpHome = $('.mp-home'),
		$header = $('header'),
		$headerLink = $header.find('.header_nav a'),
		$section = $('.mp'),
		$footer = $('footer'),
		$btnScrollBottom = $('.mp-projects_scroll a'),
		$browserIcons = $('.pl_browsers li'),
		$projectsRow = $('.projects_list > li'),
		scrollTimer,
		browsersTimer;

	$body.removeClass('loading')

	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    console.log($(target));

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 500, 'swing', function () {
	        window.location.hash = target;
	    });
	});


	$(window).on('scroll', function() {
	  clearTimeout(scrollTimer);
	  if(!$body.hasClass('disable-hover')) {
	    $body.addClass('disable-hover')
	  }
	  
	  scrollTimer = setTimeout(function(){
	    $body.removeClass('disable-hover')
	  },200);
	});

	$(window).on('load scroll resize', function(){
		scrollSpy();
	});

	function scrollSpy(){
		var currentElement = $('.mp:in-viewport').attr('id'),
			patternHref = '[href $= "{currentElement}"]'.replace('{currentElement}', currentElement),
			patternId = '[id $= "{currentElement}"]'.replace('{currentElement}', currentElement),
			footerBottom = $(document).height() - $(window).scrollTop() - $(window).height(); 

		$(window).scrollTop() >= $mpHome.height() ? $header.addClass('ready') : $header.removeClass('ready');
		footerBottom <= 360 ? $btnScrollBottom.addClass('active') : $btnScrollBottom.removeClass('active')

		$headerLink.removeClass('active');
		//$section.removeClass('active');


		if (footerBottom == 0) {
			$headerLink.filter('[href $= "contacts"]').addClass('active');
		} else {
			$headerLink.filter(patternHref).addClass('active');
			$section.filter(patternId).addClass('active');
		}

	}

	var index = 0;
	browsersTimer = setTimeout(function changeIcon(){
		$browserIcons.removeClass('active');
		$browserIcons.eq(index).addClass('active');

		index < $browserIcons.length - 1 ? index++ : index = 0;
		
		browsersTimer = setTimeout(changeIcon, 2000);
		
	}, 1000);

	for (var i = 0, len = $projectsRow.length; i < len; i += 3) {
		$projectsRow.slice(i, i + 3).wrapAll('<div class = "cf">');
	}

})