(function($) {

	var confetti = {

		defaults: {
			origin:  [0, 0],
			count:   [10, 25],
			range:   {
				x: [-750, 750],
				y: [-750, 750],
			},
			classes: ['blue', 'green'],
		},

		count: 0,
		uuid:     "uid_",

		_create: function( $el, options ) {
			this.options    = $.extend(true, {}, this.defaults, options);
			this.$particles = $()

			this.count  = this.random(this.options.count)
			this.uuid   = this.uuid + new Date().getTime()			

			this.grab()
			this.throw()
		},

		random: function( range ) {
			return Math.floor(Math.random() * (range[1] - range[0] + 1) + range[0]);
		},

		get_class: function() {
			return this.options.classes[ this.random([0, this.options.classes.length-1]) ]
		},

		grab: function() {
			for ( var i = 0; i < this.count; i++ ) {
				var $particle = $( document.createElement('div') )
				$particle.addClass("particle " +this.uuid+ " " +this.get_class())
					.css({ 
						left: this.options.origin[0],
						top: this.options.origin[1],
					})
				this.$particles = this.$particles.add($particle);
			}
		},

		_getCSS: function() {
			if (typeof this.options.css === "function")  {
				return this.options.css.call(this.$el, this.options.origin, this.options.range.x, this.options.range.y, this.random);
			}

			var x = this.random(this.options.range.x)
			,	y = this.random(this.options.range.y)
			,	translate = "translate(" + x + "px, " + y + "px)"

			return {
				"-webkit-transform": translate,
				   "-moz-transform": translate,
				    "-ms-transform": translate,
				     "-o-transform": translate,
				        "transform": translate,
							opacity: .5,
			}
		},

		throw: function() {
			var self = this;
			this.$particles.appendTo("body").each(function() {
				var $this = $(this)
				,	toss  = function() { $this.css(self._getCSS()); }
				,	clean = function() { $this.remove(); }

				setTimeout(toss);
				setTimeout(clean, 500);
			});
		}
	}






	$.fn.confetti = function() {
		 if ( typeof arguments[0] === 'object' ) {
			confetti._create.call( confetti, this, arguments[0] );
		} else {
			confetti._create.call(confetti, this)
		}
		return this;
	};

})( jQuery );