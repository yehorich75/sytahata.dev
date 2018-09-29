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

import {TimelineMax} from 'gsap';

let tl = new TimelineMax();

tl
    .from( $('.logo__s'), 1, {
        y: -10
    }, "-=1")
    .from( $('.logo__y'), 1, {
        rotation: 58,
        transformOrigin: "100% 50%"
    }, "-=1")
    .from( $('.logo__t'), 1, {
        y: -10
    })
    .from( $('.logo__a'), 1, {
        rotation: -38,
        transformOrigin: "100% 50%"
    }, "-=1")
    .from( $('.logo__h'), 1, {
        y: 100
    }, "-=1")
    .from( $('.logo__2a'), 1, {
        rotation: -28,
        transformOrigin: "100% 50%"
    }, "-=1")
    .from( $('.logo__2t'), 1, {
        y: 10
    }, "-=1")
    .from( $('.logo__3a'), 1, {
        rotation: 28,
        transformOrigin: "100% 50%"
    }, "-=1");

	


	
