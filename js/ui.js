
$(function(){


	/* 요소별 */
	if( $('.selectBox01').length )	{ hmall.selectBox('.selectBox01'); };
	if( $('.chkBox01').length )		{ hmall.checkBox.init('.chkBox01'); };

	/* main */
	if( $('.main_page').length ) { hmall.page.main(); };


});

var hmall = {}

hmall = {
	/* 가운데 정렬 */
	posCenter: function(trg){
		$(trg).css({
			'margin-left':function(){return -($(this).width()/2);},
			'margin-top':function(){return -($(this).height()/2);}
		});
	},
	selectBox: function(trg){
		$(document).on('change', trg+' select' , function(){
			var $this = $(this);
			$this.closest(trg).find('.labelTxt').text( $this.val() );
		});
	},
	checkBox: {
		init: function(el){
			var thisObj = this;
			thisObj.set(el);

			// input check
			$(document).on('change', el+' input', function(){
				thisObj.movement(this, el);
			});
		},
		// 초기값 셋팅
		set: function(el){
			var thisObj = this;
			this.movement( $(el).find('input'), el );
		},
		// 동작
		movement: function(_this, el){
			var $this = $(_this);
			var $thisBox = $this.closest(el);

			if($this.attr('type') == 'radio'){
				$thisBox = $('input[name=' + $this.attr('name') + ']').closest(el);
			}
			$thisBox.each(function(idx){
				var _$this = $(this);
				_$this.removeClass('active');
				if( _$this.find('input').prop('checked') ){
					_$this.addClass('active');
				}
			});

			/*if($this.attr('type') == 'radio'){ // radio
				var $radio = $('input[name=' + $this.attr('name') + ']').closest(el);
				$radio.removeClass('active');
				$radio.each(function(idx){
					var _$this = $(this);
					if( _$this.find('input').prop('checked') ){
						_$this.addClass('active');
					}
				});
			} else { // checkbox
				if( $this.prop('checked') ){
					$thisBox.addClass('active');
				} else {
					$thisBox.removeClass('active');
				}
			}*/
		}
	},
}

hmall.page = {
	main: function(){
		hmall.posCenter('.remote_wrap .btnBox');
		$(window).resize(function(){
			hmall.posCenter('.remote_wrap .btnBox');
		});
	},
}


