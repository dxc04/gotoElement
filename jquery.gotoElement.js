(function($) { 
  $.fn.gotoElement = function(options) {
		var $this = this;
		var GotoElementSettings = {
			options : {
				gotobox_top : $this.offset().top,
				last_view_top : 0,
				last_view_id : 'goto_last_view'
			},
			actions : {
				setLastView : function() {
					$('.goto-link').click(function(e) {
						GotoElementSettings.options.last_view_top = $('#mygoto').offset().top - GotoElementSettings.options.gotobox_top;	
					});	
				},
				gotoLastView : function() {
					$('#' + GotoElementSettings.options.last_view_id).click(function() {
						$('html, body').animate({scrollTop:GotoElementSettings.options.last_view_top}, 'slow');		
					});
				}

			}
		};
		GotoElementSettings.options = $.extend(GotoElementSettings.options, options);

		$.each(GotoElementSettings.options.elements, function(index, value) {
			$this.find('ul').append('<li><a class="goto-link" style="text-decoration: none;" href="#' + value.anchor  + '">' + value.goto_name + '</a></li>');			
		});

		GotoElementSettings.actions.setLastView();
		GotoElementSettings.actions.gotoLastView();

		return $this;

	}
})(jQuery);


var GotoElement = {
	actions : {
		addGotoBox: function(options) {
			// attach the gotoElement plugin to our goto div
			// anchor should be an id selector
			GotoElement.obj = $('#mygoto').gotoElement(options);
		},
		setupGotoBox : function () {
			// create the goto container which will be appended to the page
			var goto_box = '<div id="mygoto" class="well" style="position: fixed; bottom: 5%; right: 3%; padding: 5px 10px; width: auto;">'
				     + '<legend style="margin-bottom: 5px;">Go to...</legend><ul class="unstyled"><li> <a id="goto_last_view" href="#">Last View</a></li></ul>'
				     + '</div>';
			$("body").append(goto_box);
		},
	}	
}

GotoElement.actions.setupGotoBox();
