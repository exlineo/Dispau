/* user-ihm.js */

(function($) {

	$('.carousel').carousel({
  		interval: false
	});

	$("#btn-parameters").click(function() {
		// toggle class .para-open
		$('#parameters').toggleClass("para-open");
	}); 

	$("#btn-infos").click(function() {
		// toggle class .annonce-infos-open
		$('#annonce-infos').toggleClass("annonce-infos");
	});

	$("#btn-home a").click(function() {
		// toggle class .para-open
		$('#parameters').toggleClass("para-open");
	});
	
})(jQuery);