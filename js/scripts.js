var colorCounter = 0;
var filterProjects = function(type) {
    $('.filters + ul').isotope({filter: type});
};
var advanceColors = function(){
  var backgroundColors = ['#e8c1ab','#ff8785','#ffdfa0','#d6c6ff','#ff8785','#59b97b'];
  var textColors = ['#ff8785','#d6c6ff','#e5bbe8','#59b97b','#e5bbe8','#ff8785'];
  
  $('.home #content .container:first-child').css('background',backgroundColors[colorCounter]);
  $('.home #content #carousel .carousel-inner .item:eq('+ colorCounter +') p, .home #content #carousel .carousel-inner .item:eq('+(colorCounter + 1)+') p').css('color',textColors[colorCounter]);

  if (colorCounter < 5){
    colorCounter++;
  }
  else{
    colorCounter = 0;
  }
};
var checkWidth = function(){
	if ($(window).width() < 1200){
		$('.getatme p:nth-child(2)').html('Fill out the form below! Assuming you aren\'t spamming me, I\'ll get back to you ASAP!');
	}
	else{
		$('.getatme p:nth-child(2)').html('Fill out the form to the right! Assuming you aren\'t spamming me, I\'ll get back to you ASAP!');
	}
	if ($(window).width() <= '568'){
		$('.message').insertBefore($('.getatme + .container form .submit'));
	}
	else{
		if (!$('.getatme + .container form p:first-child').hasClass('.message')){
			$('.message').prependTo($('.getatme + .container form'));
		}
	}
};

$(document).ready(function(){
  checkWidth();
});

$(function(){
  var windowHeight = $(window).height() + 800;
  var uri = window.location.pathname.split('/');
  $('#spaceKitty').click(function(e){
    e.preventDefault();
    ga('send', 'event', 'Special Events', 'kittyClick', 'Space Kitty Launched');
    $('#theKitty').show().animate({
      bottom: '+='+windowHeight,
      left: '+=400'
    }, 7000, function(){
      $('#theKitty').hide().css(
        {
          bottom: '-650px',
          left: '10%'
        }
      );
    });
  });
  $('header .navbar-nav li a').each(function(){
    if ($(this).attr('href').substring(1) == uri[1]){
      $(this).parent('li').addClass('active');
    }
  });
  $('#carousel').carousel({
      interval: 3500
  });
  
  $('.home #carousel').bind('slide.bs.carousel', function(){
    advanceColors()
  });

  $('.filters + ul').isotope(
    {
      itemSelector: '.project',
      layoutMode: 'fitRows'
    }
  );
  $('.filters').on('click','button',function(){
    $('.filters .button.is-checked').removeClass('is-checked');
    $(this).addClass('is-checked');
    filterProjects($(this).attr('data-filter'));
  });
  $(window).resize(function(){
    checkWidth();
  })
});