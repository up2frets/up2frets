$(function() {

	var $mpHome = $('.mp-home'),
		$header = $('header'),
		$headerLink = $header.find('.header_nav a'),
		$section = $('.mp'),
		$footer = $('footer'),
		$btnScrollBottom = $('.mp-projects_scroll a')

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

	var body = document.body,
    timer;

	window.addEventListener('scroll', function() {
	  clearTimeout(timer);
	  if(!body.classList.contains('disable-hover')) {
	    body.classList.add('disable-hover')
	  }
	  
	  timer = setTimeout(function(){
	    body.classList.remove('disable-hover')
	  },200);
	}, false);

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

			console.log(patternId);
		}

	}

})