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
		browserIcon = 0,
		scrollTimer,
		browsersTimer;

	$body.removeClass('loading');

	// Detecting scrolling and changing links
	function scrollSpy(){
		var currentElement = $('.mp:in-viewport').attr('id'),
			patternHref = '[href $= "{currentElement}"]'.replace('{currentElement}', currentElement),
			patternId = '[id $= "{currentElement}"]'.replace('{currentElement}', currentElement),
			footerBottom = $(document).height() - $(window).scrollTop() - $(window).height(); 

		// Fading in header
		$(window).scrollTop() >= $mpHome.height() ? $header.addClass('ready') : $header.removeClass('ready');

		// "Scroll top" button states
		footerBottom <= 360 ? $btnScrollBottom.addClass('active') : $btnScrollBottom.removeClass('active')

		$headerLink.removeClass('active');

		// Changing active nav links
		if (footerBottom == 0) {
			$headerLink.filter('[href $= "contacts"]').addClass('active');
		} else {
			$headerLink.filter(patternHref).addClass('active');
			$section.filter(patternId).addClass('active');
		}
	}

	// Disable hover on scroll (to increase FPS )
	function disableHover(){
		clearTimeout(scrollTimer);
		if(!$body.hasClass('disable-hover')) {
		   	$body.addClass('disable-hover')
		}
		  
		scrollTimer = setTimeout(function(){
		  	$body.removeClass('disable-hover')
		},200);
	}

	// Anchor smooth scrolling
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 500, 'swing', function () {
	        window.location.hash = target;
	    });
	});

	// "Crossbrowser" section icons 
	browsersTimer = setTimeout(function changeIcon(){
		$browserIcons.removeClass('active');
		$browserIcons.eq(browserIcon).addClass('active');

		// Resetting timer
		browserIcon < $browserIcons.length - 1 ? browserIcon++ : browserIcon = 0;
		
		// Setting interval
		browsersTimer = setTimeout(changeIcon, 2000);
		
	}, 1000);

	// Partition of the project items
	for (var i = 0, len = $projectsRow.length; i < len; i += 3) {
		$projectsRow.slice(i, i + 3).wrapAll('<div class = "cf">');
	}

	// Main handler 
	$(window).on('load scroll resize', function(){
		if ($(this).width() >= 700) {
			disableHover();
			scrollSpy();
		}
	});

});