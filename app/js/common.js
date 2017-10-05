$(function() {

	// Custom JS

	$("#special-offers-carousel").owlCarousel({
		loop:true,
		items:4,
		navigation:true,
		navigationText : ["<i class=\"fa fa-chevron-left animation\"></i>","<i class=\"fa fa-chevron-right animation\"></i>"],
        pagination : false
	});

	// Magnific Popup

	$(".item, a.gallery").magnificPopup({
		type : 'image',
		gallery : {
			enabled : true,
			navigateByImgClick: true,
			preload: [0,1]
		},
		removalDelay: 300,
		mainClass: 'mfp-fade',
		// tLoading: '<img src="img/spin.gif" alt="Loading...">'
	});

});

	


	
