/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2016, Codrops
 * http://www.codrops.com
 */
;(function(window) {

	'use strict';

	// Helper vars and functions.
	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}
	// From http://www.quirksmode.org/js/events_properties.html#position
	function getMousePos(e) {
		var posx = 0;
		var posy = 0;
		if (!e) var e = window.event;
		if (e.pageX || e.pageY) 	{
			posx = e.pageX;
			posy = e.pageY;
		}
		else if (e.clientX || e.clientY) 	{
			posx = e.clientX + document.body.scrollLeft
				+ document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop
				+ document.documentElement.scrollTop;
		}
		return {
			x : posx,
			y : posy
		}
	}
	// Detect mobile. From: http://stackoverflow.com/a/11381730/989439
	function mobilecheck() {
		var check = false;
		(function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	}

	// The Day obj.
	function Day(options) {
		this.options = extend({}, this.options);
		extend(this.options, options);
		this.number = this.options.number;
		this.color = this.options.color;
		this.previewTitle = this.options.previewTitle;
		this.isActive = !this.options.inactive;
		this._layout();
	}

	Day.prototype.options = {
		number: 0,
		color: '#f1f1f1',
		previewTitle: '',
		inactive: false
	};

	// Build the 3D cube element.
	Day.prototype._layout = function() {
		/* The Cube structure:
		<div class="cube">
			<div class="cube__side cube__side--front"></div>
			<div class="cube__side cube__side--back"></div>
			<div class="cube__side cube__side--right"></div>
			<div class="cube__side cube__side--left"></div>
			<div class="cube__side cube__side--top"></div>
			<div class="cube__side cube__side--bottom"></div>
		</div>
		*/
		this.cube = document.createElement('div');
		this.cube.className = this.isActive ? 'cube' : 'cube cube--inactive';
		this.cube.innerHTML = '<div class="cube__side cube__side--back"></div><div class="cube__side cube__side--left"></div><div class="cube__side cube__side--right"></div><div class="cube__side cube__side--bottom"></div><div class="cube__side cube__side--top"></div><div class="cube__side cube__side--front"><div class="cube__number">' + (this.number+1) + '</div></div>';
		this.currentTransform = {translateZ: 0, rotateX: 0, rotateY: 0};
	};

	Day.prototype._rotate = function(ev) {
		anime.remove(this.cube);

		var dir = this._getDirection(ev),
			type = ev.type.toLowerCase() === 'mouseenter' ? 1 : -1,
			animationSettings = {
				targets: this.cube,
				duration: 500,
				easing: 'easeOutExpo'
			};

		animationSettings.translateZ = {
			value: type === 1 ? 100 : 0,
			duration: 900,
			easing: 'easeOutExpo'
		};

		switch(dir) {
			case 0 : // from/to top
				animationSettings.rotateX = type === 1 ? -180 : 0; 
				animationSettings.rotateY = 0;
				break; 
			case 1 : // from/to right
				animationSettings.rotateY = type === 1 ? -180 : 0; 
				animationSettings.rotateX = 0;
				break; 
			case 2 : // from/to bottom
				animationSettings.rotateX = type === 1 ? 180 : 0; 
				animationSettings.rotateY = 0;
				break; 
			case 3 : // from/to left
				animationSettings.rotateY = type === 1 ? 180 : 0; 
				animationSettings.rotateX = 0;
				break;
		};

		this.currentTransform = {
			translateZ: animationSettings.translateZ, 
			rotateX: animationSettings.rotateX, 
			rotateY: animationSettings.rotateY
		};

		anime(animationSettings);
	};

	Day.prototype._setContentTitleFx = function(contentTitleEl) {
		this.titlefx = new TextFx(contentTitleEl);
		this.titlefxSettings = {
			in: {
				duration: 800,
				delay: function(el, index) { return 650 + index*10; },
				easing: 'easeOutExpo',
				opacity: {
					duration: 200,
					value: [0,1],
					easing:'linear'
				},
				translateY: [100,0],
				rotateZ: function(el, index) { return [anime.random(-20,20), 0]; }
			},
			out: {
				duration: 800,
				delay: 400,
				easing: 'easeInExpo',
				opacity: 0,
				translateY: 350
			}
		};
	};

	// From: https://codepen.io/noeldelgado/pen/pGwFx?editors=0110 by Noel Delgado (@noeldelgado).
	Day.prototype._getDirection = function(ev) {
		var obj = this.cube.querySelector('.cube__side--front'),
			w = obj.offsetWidth, 
			h = obj.offsetHeight,
			bcr = obj.getBoundingClientRect(),
			x = (ev.pageX - (bcr.left + window.pageXOffset) - (w / 2) * (w > h ? (h / w) : 1)),
			y = (ev.pageY - (bcr.top + window.pageYOffset) - (h / 2) * (h > w ? (w / h) : 1)),
			d = Math.round( Math.atan2(y, x) / 1.57079633 + 5 ) % 4;

		return d;
	};

	// The Calendar obj.
	function Calendar(el) {
		this.el = el;
		this.calendarDays = [].slice.call(this.el.querySelectorAll('.cube'));
		
		// Let´s build the days/cubes structure.
		this.cubes = document.createElement('div');
		this.cubes.className = 'cubes';
		this.el.appendChild(this.cubes);

		// Array of days (each day is represented by a 3D Cube)
		this.days = [];
		var self = this;
		this.calendarDays.forEach(function(d, pos) {
			// Get the bg color defined in the data-bg-color of each division.
			var day = new Day({
					number: pos,
					color: d.getAttribute('data-bg-color') || '#f1f1f1',
					previewTitle: d.getAttribute('data-title') || '',
					inactive: d.hasAttribute('data-inactive')
				}),
				content = contents[pos];

			if( content !== undefined ) {
				var contentTitle = contents[pos].querySelector('.content__title');
				day._setContentTitleFx(contentTitle);
			}

			self.days.push(day);
			self.cubes.appendChild(day.cube);
			self.el.removeChild(d);
			self._initDayEvents(day);
		});

		// structure to show each day preview (day + title + subtitle etc, when the user hovers one day/cube).
		this.dayPreview = document.createElement('h2');
		this.dayPreview.className = 'title';
		this.el.appendChild(this.dayPreview);
		
		this._initEvents();
	}

	Calendar.prototype._initEvents = function() {
		var self = this;

		// Mousemove event / tilt functionality
		if( settings.tilt ) {
			this.mousemoveFn = function(ev) {
				if( self.isOpen ) {
					return false;
				};
				requestAnimationFrame(function() {
					// Mouse position relative to the document.
					var mousepos = getMousePos(ev);
					self._rotateCalendar(mousepos);
				});
			};
			
			this.handleOrientation = function() {
				if( self.isOpen ) {
					return false;
				};

				var y = event.gamma;
				// To make computation easier we shift the range of x and y to [0,180]
				y += 90;
				requestAnimationFrame(function() {
					// Transform values.
					var movement = {ry:40},
						rotY = 2*movement.ry / 180 * y - movement.ry;

					self.cubes.style.WebkitTransform = self.cubes.style.transform = 'rotate3d(0,-1,0,' + rotY + 'deg)';
				});
			};
			if( isMobile ) {
				window.addEventListener('deviceorientation', this.handleOrientation);
			}
			else {
				document.addEventListener('mousemove', this.mousemoveFn);
			}
		}

		this.backToCalendarFn = function(ev) {
			// If the calendar is currently animating then do nothing.
			if( !self.isOpen || self.isAnimating ) {
				return false;
			}
			self.isAnimating = true;
			self._hidePreviewTitle();
			self._hideContent();

			// Show the main container
			anime({
				targets: self.el,
				duration: 1200,
				easing: 'easeInOutExpo',
				opacity: 1,
				complete: function() {
					self.isOpen = false;
					self.isAnimating = false;
				}
			});

			for(var i = 0, totalDays = self.days.length; i < totalDays; ++i) {
				var day = self.days[i];
				if( self.currentDayIdx === i ) {
					anime({
						targets: day.cube,
						duration: 1200,
						delay: 1000,
						easing: 'easeOutExpo',
						scale: 1,
						translateY: 0,
						translateZ: [-1500,0],
						rotateX: 0,
						rotateY: 0
					});
					day.isRotated = false;
				}
				else {
					anime({
						targets: day.cube,
						duration: 1200,
						delay: 1000,
						easing: 'easeOutExpo',
						scale: 1,
						translateX: 0,
						translateY: 0,
						translateZ: [3000,0],
						rotateY: 0
					});
				}
			}
		};
		backCtrl.addEventListener('click', this.backToCalendarFn);
	};

	Calendar.prototype._initDayEvents = function(day) {
		var self = this;

		// Day/Cube mouseenter/mouseleave event.
		var instance = day;
		if( !isMobile ) {
			instance.mouseenterFn = function(ev) {
				if( instance.isRotated || self.isOpen ) {
					return false;
				};
				clearTimeout(colortimeout);
				instance.rotatetimeout = setTimeout(function() {
					colortimeout = setTimeout(function() { self._changeBGColor(instance.color); }, 30);
					instance._rotate(ev);
					self._showPreviewTitle(instance.previewTitle, instance.number);
					instance.isRotated = true;
				}, 30);
			};
			instance.mouseleaveFn = function(ev) {
				if( self.isOpen ) {
					return false;
				};
				clearTimeout(instance.rotatetimeout);
				clearTimeout(colortimeout);
				if( instance.isRotated ) {
					colortimeout = setTimeout(function() { self._resetBGColor(); }, 35);
					self._resetBGColor();
					instance._rotate(ev);
					self._hidePreviewTitle();
					instance.isRotated = false;
				}
			};
		}
		// Day/Cube click event.
		instance.clickFn = function(ev) {
			// If the day is inactive or if the calendar is currently animating then do nothing.
			if( !instance.isActive || self.isAnimating ) {
				return false;
			}
			self.isAnimating = true;
			self.isOpen = true;
			self.currentDayIdx = instance.number;

			// Hide the main container
			anime({
				targets: self.el,
				duration: 1200,
				easing: 'easeInOutExpo',
				opacity: 0,
				complete: function() {
					self.isAnimating = false;
				}
			});

			for(var i = 0, totalDays = self.days.length; i < totalDays; ++i) {
				var day = self.days[i];

				if( self.currentDayIdx === i ) {
					anime({
						targets: day.cube,
						duration: 600,
						delay: 200,
						easing: 'easeInExpo',
						scale: 1.1,
						translateY: -window.innerHeight*2,
						translateZ: day.currentTransform.translateZ,
						rotateX: day.currentTransform.rotateX,
						rotateY: day.currentTransform.rotateY
					});

					self._showContent(instance);
				}
				else {
					var bcr = day.cube.getBoundingClientRect();
					anime({
						targets: day.cube,
						duration: 1200,
						easing: 'easeInOutExpo',
						scale: 0.1,
						translateX: function(el, index) {
							return bcr.left + window.pageXOffset <= window.innerWidth/2 ? anime.random(-800,0) : anime.random(0,800);
						},
						translateY: function(el, index) {
							return bcr.top + window.pageYOffset <= window.innerHeight/2 ? anime.random(-1400,-200) : anime.random(-200,600);
						},
						translateZ: -1500,
						rotateY: function(el, index) {
							return bcr.left + window.pageXOffset <= window.innerWidth/2 ? anime.random(-40,0) : anime.random(0,40);
						}
					});
				}
			}
		};
		instance.cube.querySelector('.cube__side--front').addEventListener('mouseenter', instance.mouseenterFn);
		instance.cube.addEventListener('mouseleave', instance.mouseleaveFn);
		instance.cube.addEventListener('click', instance.clickFn);
		instance.cube.addEventListener('mousedown', function() {
			clearTimeout(instance.rotatetimeout );
		});
	};

	Calendar.prototype._rotateCalendar = function(mousepos) {
		// Transform values.
		var movement = {rx:3, ry:3},
			rotX = 2 * movement.rx / this.cubes.offsetHeight * mousepos.y - movement.rx,
			rotY = 2 * movement.ry / this.cubes.offsetWidth * mousepos.x - movement.ry;
		
		this.cubes.style.WebkitTransform = this.cubes.style.transform = 'rotate3d(-1,0,0,' + rotX + 'deg) rotate3d(0,1,0,' + rotY + 'deg)';
	};

	Calendar.prototype._showPreviewTitle = function(text, number) {
		this.dayPreview.innerHTML = text;
		this.dayPreview.setAttribute('data-number', parseInt(number+1));
		
		this.txtfx = new TextFx(this.dayPreview);
		this.txtfx.hide();
		this.dayPreview.style.opacity = 1;
		this.txtfx.show({
			in: {
				duration: 800,
				delay: function(el, index) { return index*20; },
				easing: 'easeOutElastic',
				opacity: 1,
				translateY: function(el, index) {
					return index%2 === 0 ? [-25, 0] : [25, 0];
				}
			}
		});
	};

	Calendar.prototype._hidePreviewTitle = function() {
		var self = this;
		if( this.txtfx ) {
			this.txtfx.hide();
		}
		this.dayPreview.style.opacity = 0;
	};

	Calendar.prototype._showContent = function(day) {
		// The content box for the clicked day.
		var content = contents[this.currentDayIdx],
			title = content.querySelector('.content__title'),
			description = content.querySelector('.content__description'),
			meta = content.querySelector('.content__meta');

		content.classList.add('content__block--current');

		day.titlefx.hide();
		day.titlefx.show(day.titlefxSettings);	
		
		anime({
			targets: [description, meta],
			duration: 800,
			delay: function(el, index) { return index === 0 ? 900 : 1000 },
			easing: 'easeOutExpo',
			opacity: [0,1],
			translateY: [100,0]
		});

		anime({
			targets: backCtrl,
			duration: 1000,
			delay: 800,
			easing: 'easeOutExpo',
			opacity: [0,1],
			translateY: [50,0]
		});

		contentNumber.innerHTML = this.currentDayIdx + 1;
		anime({
			targets: contentNumber,
			duration: 500,
			delay: 800,
			easing: 'easeOutExpo',
			opacity: [0,1],
			translateX: [100,0]
		});
	};

	Calendar.prototype._hideContent = function() {
		var day = this.days[this.currentDayIdx],
			// The content box for the clicked day.
			content = contents[this.currentDayIdx],
			// The content title, description and meta for this day.
			title = content.querySelector('.content__title'),
			description = content.querySelector('.content__description'),
			meta = content.querySelector('.content__meta');

		// The content number placeholder animation.
		anime({
			targets: contentNumber,
			duration: 500,
			easing: 'easeInExpo',
			opacity: 0,
			translateX: 100
		});

		// The back button animation.
		anime({
			targets: backCtrl,
			duration: 1000,
			easing: 'easeInExpo',
			opacity: 0,
			translateY: 50
		});

		// The description and meta animation.
		anime({
			targets: [description, meta],
			duration: 800,
			delay: function(el, index) { return index === 0 ? 150 : 0 },
			easing: 'easeInExpo',
			opacity: [1,0],
			translateY: [0,200]
		});

		// The content title animation.
		day.titlefx.hide(day.titlefxSettings, function() {
			content.classList.remove('content__block--current');
		});
	};

	Calendar.prototype._changeBGColor = function(color) {
		bgEl.style.backgroundColor = color;
	};

	Calendar.prototype._resetBGColor = function() {
		bgEl.style.backgroundColor = defaultBgColor;
	};

	// Snow obj. Based on // https://gist.github.com/OmShiv/4368164.
	function Snow() {
		this.canvas = document.createElement('canvas');
		this.canvas.id = 'snow';
		this.canvas.className = 'background';
		this.canvas.style.background = defaultBgColor;
		document.body.insertBefore(this.canvas, document.body.firstElementChild);

		this.flakes = [];
		this.ctx = this.canvas.getContext('2d');
		this.flakeCount = 300;
		this.mX = -100,
		this.mY = -100

		this.width = this.canvas.width = window.innerWidth;
		this.height = this.canvas.height = window.innerHeight;

		this._init();
	}

	Snow.prototype._init = function() {
		var self = this;
		window.addEventListener('resize', function() {
			self.width = self.canvas.width = window.innerWidth;
			self.height = self.canvas.height = window.innerHeight;
		});

		for(var i = 0; i < this.flakeCount; ++i) {
			var x = Math.floor(Math.random() * this.width),
				y = Math.floor(Math.random() * this.height),
				size = (Math.random()*3.5) + .5,
				speed = size*.5,
				opacity = (Math.random() * 0.5) + 0.1;

			this.flakes.push({
				speed: speed,
				velY: speed,
				velX: 0,
				x: x,
				y: y,
				size: size,
				stepSize: (Math.random()) / 30,
				step: 0,
				opacity: opacity
			});
		}

		this._snow();
	};

	Snow.prototype._snow = function() {
		this.ctx.clearRect(0, 0, this.width, this.height);

		for(var i = 0; i < this.flakeCount; ++i) {
			var flake = this.flakes[i],
				x = this.mX,
				y = this.mY,
				minDist = 150,
				x2 = flake.x,
				y2 = flake.y,
				dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
				dx = x2 - x,
				dy = y2 - y;

			if( dist < minDist ) {
				var force = minDist / (dist * dist),
				xcomp = (x - x2) / dist,
				ycomp = (y - y2) / dist,
				deltaV = force / 2;
				flake.velX -= deltaV * xcomp;
				flake.velY -= deltaV * ycomp;
			}
			else {
				flake.velX *= .98;
				if( flake.velY <= flake.speed ) {
					flake.velY = flake.speed
				}
				flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
			}

			this.ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
			flake.y += flake.velY;
			flake.x += flake.velX;

			if( flake.y >= this.height || flake.y <= 0 ) {
				this._reset(flake);
			}

			if( flake.x >= this.width || flake.x <= 0 ) {
				this._reset(flake);
			}

			this.ctx.beginPath();
			this.ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
			this.ctx.fill();
		}
		requestAnimationFrame(this._snow.bind(this));
	};

	Snow.prototype._reset = function(flake) {
		flake.x = Math.floor(Math.random() * this.width);
		flake.y = 0;
		flake.size = (Math.random() * 3.5) + .5;
		flake.speed = flake.size*.5,
		flake.velY = flake.speed;
		flake.velX = 0;
		flake.opacity = (Math.random() * 0.5) + 0.1;
	};

	var calendarEl = document.querySelector('.calendar'),
		calendarDays = [].slice.call(calendarEl.children),
		settings = {
			snow: false,
			tilt: true
		},
		bgEl = document.body,
		defaultBgColor = bgEl.style.backgroundColor,
		colortimeout,
		contentEl = document.querySelector('.content'),
		contents = contentEl.querySelectorAll('.content__block'),
		backCtrl = contentEl.querySelector('.btn-back'),
		contentNumber = contentEl.querySelector('.content__number'),
		isMobile = mobilecheck();

	function init() {
		layout();
	}

	function layout() {
		new Calendar(calendarEl);
		// If settings.snow === true then create the canvas element for the snow effect.
		if( settings.snow ) {
			var snow = new Snow();
			bgEl = snow.canvas;
		}
	}

	init();

})(window);