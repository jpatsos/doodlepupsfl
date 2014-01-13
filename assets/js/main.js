$(document).ready(function(){

	//----------------------------------------
	// WAYPOINT 
	//----------------------------------------
	$(function(){
		$("#content").waypoint(function(){
			$("#nav").toggleClass("stuck");
		},{
			offset: 160
		});
	});
	
	//----------------------------------------
	// NAV 
	//----------------------------------------
	var $window = $(window);
	$(function(){
		$(".small-nav").click(function(e){
			$("#navigation").stop().slideToggle();
			e.preventDefault();
		});
	});
	
	
	
	
	//----------------------------------------
	// INSTAFEED 
	//----------------------------------------
	$(function () {
		var feed = new Instafeed({
			get: 'user',
			userId: 749573286,
			resolution: 'standard_resolution',
			accessToken: '749573286.467ede5.bc57271b9027409387d20efe027d4cda',
			sortBy: 'random',
			limit: 20,
			template: '<a href="{{link}}" class="item"><img src="{{image}}" /></a>'
		});
		
		feed.run();
		
	});
	
	function imgLoaded(){
		$("#instafeed .item").each( function (index) {
			index += 1;
			if(index % 3 == 0) {
				$(this).addClass("w2");
			}
		});
		var $container = $('#instafeed');
		$container.masonry({
			columnWidth: 200,
			itemSelector: '.item'
		});
	}
	
	//----------------------------------------
	// PHOTOSET 
	//----------------------------------------
	
	(function($,sr){
	
	  // debouncing function from John Hann
	  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	  var debounce = function (func, threshold, execAsap) {
	      var timeout;
	
	      return function debounced () {
	          var obj = this, args = arguments;
	          function delayed () {
	              if (!execAsap)
	                  func.apply(obj, args);
	              timeout = null;
	          };
	
	          if (timeout)
	              clearTimeout(timeout);
	          else if (execAsap)
	              func.apply(obj, args);
	
	          timeout = setTimeout(delayed, threshold || 100);
	      };
	  }
	  // smartresize 
	  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
	
	})(jQuery,'smartresize');
	
	/* Wait for DOM to be ready */
	$(function() {
	  
		// Detect resize event
		$(window).smartresize(function () {
			// Set photoset image size
			$('.photoset-row').each(function () {
				var $pi    = $(this).find('.photoset-item'),
					  cWidth = $(this).parent('.photoset').width();
	
				// Generate array containing all image aspect ratios
				var ratios = $pi.map(function () {
					return $(this).find('img').data('org-width') / $(this).find('img').data('org-height');
				}).get();
	
				// Get sum of widths
				var sumRatios = 0, sumMargins = 0,
	          minRatio  = Math.min.apply(Math, ratios);
				for (var i = 0; i < $pi.length; i++) {
					sumRatios += ratios[i]/minRatio;
				};
	      
	      $pi.each(function (){
	        sumMargins += parseInt($(this).css('margin-left')) + parseInt($(this).css('margin-right'));
	      });
	
				// Calculate dimensions
				$pi.each(function (i) {
					var minWidth = (cWidth - sumMargins)/sumRatios;
					$(this).find('img')
	          .height(Math.floor(minWidth/minRatio))
						.width(Math.floor(minWidth/minRatio) * ratios[i]);
				});
			});
		});
	});
	
	/* Wait for images to be loaded */
	$(window).load(function () {
	
		// Store original image dimensions
		$('.photoset-item img').each(function () {
	      $(this)
	        .data('org-width', $(this)[0].naturalWidth)
	        .data('org-height', $(this)[0].naturalHeight);
		});
	
	  $(window).resize();
	});
	
	//----------------------------------------
	// PUPPY AGE 
	//----------------------------------------
	
	if($('body').length){
		birthDate = new Date(2013,11,16);
		birthDateParse = birthDate.valueOf();
	
		currentDate = new Date();
		currentDateParse = currentDate.valueOf();
		
		diff = currentDateParse - birthDateParse
		secs = diff / (1000);
		var minutes = secs    / 60 ;
		var hours   = minutes / 60 ;  
		var days =  hours / 24;
		
		function getWeeks(days) {
			return {
				weeks : Math.floor(days / 7),
				days : days % 7
			};
		}
	
		var totalDays = Math.floor(days);
		var elapsed = getWeeks(totalDays);
	
	
	dateStr = '';
	
	if (elapsed.weeks >= 1) {
		if (elapsed.weeks == 1) {
			dateStr += elapsed.weeks + ' week ';
		}
		else {
			dateStr += elapsed.weeks + ' weeks ';
			}		
	} 
	
	if (elapsed.days >= 1) {
		if (elapsed.days == 1) {
			dateStr +=  elapsed.days + ' day';
		} else {
			dateStr += elapsed.days + ' days';
		}
	}
	$('.age').text(dateStr);
	}
	
	//----------------------------------------
	// CONTENT 
	//----------------------------------------
	$(function () {
		$("#content").waypoint(function () {
			$("header#header").toggleClass("stuck");
		}, {
			offset: 100
		});
	});
	
	$(function () {
	var link = $('nav a');
	
	link.click(function(e){
	var href = '.waypoint-section' + $(this).attr('href');
	
	$('html, body').animate({
	scrollTop: $(href).offset().top  - 100
	}, 300);
	
	e.preventDefault();
	
	});
	});
	
	$('.flexslider').flexslider({
	animation: "slide"
	});
	
	$(".dropkick").dropkick();
	
	$(function () {
	
	function submitForm($field_values){
	$.ajax({
	url: "../assets/xhr/contactengine.php",
	type: "POST",
	dataType: "json",
	data: $field_values,
	error: function (res) {
	console.log("Ajax Error: Could not connect to the message function" + res);
	},
	success: function(res) {
	if(!$('#contact').length == 0) {
	$('#contact').fadeOut(600, function(){
	$(this).html("<h3>Thank you!</h3><p>We will contact you within 24 hours.</p>").fadeIn();
	});
	}
	}
	});
	}
	
	function valEmail($email) {
	var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test($email);
	}
	
	function validateFields(){
	$required_name 	= $('#required_name').val();
	$required_email = $('#required_email').val();
	$message 		= $('#required_message').val();
	
	$field_array = {};
	$errors_array = Array();
	$field_array.name 		= $required_name;
	$field_array.email 		= $required_email;
	$field_array.message 	= $message;
	
	if ($field_array.name == "")
	{
	$errors_array.push("Please fill out the name field.");
	}
	
	if (! valEmail($field_array.email))
	{
	$errors_array.push("Please enter a correct email address.");
	}
	
	if ($field_array.message == "")
	{
	$errors_array.push("Please fill out the message field.");
	}
	
	if($errors_array.length){
	return false;
	}
	else
	{
	return true;
	}
	}
	
	$('#submit').on("click", function(){
	if(validateFields()){
	$name 			= $('#required_name').val();
	$email 			= $('#required_email').val();
	$phone 			= $('#required_email').val();
	$message 		= $('#required_message').val();
	
	
	$field_values =
	"&name=" + 
	$name + 
	"&email=" + 
	$email + 
	"&phone=" + 
	$phone + 
	"&message=" + 
	$message;
	
	submitForm($field_values);
	}
	else {
	//TODO: errors availabe via $errors_array. Loop through here to output to UI
	$htmlString = '';
	$.each($errors_array, function(i,v){
	$htmlString += '<span class="error">' + v + '</span>';
	});
	
	$('#error_messages').html($htmlString);
	}
	return false;
	});
	
	});	


});
