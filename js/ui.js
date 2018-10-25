
$(function(){


	/* 요소별 */
	if( $('.selectBox01').length ){
		hmall.selectBox('.selectBox01');
	};
	if( $('.chkBox01').length ){
		hmall.checkBox.init('.chkBox01');
	};
	if( $('.list_type01.multiple').length ){
		hmall.listMultiple.init('.list_type01.multiple');
	};
	if( $('.txtEntry01').length ){
		hmall.formFocus('.txtEntry01');
		hmall.focusScrl('.txtEntry01');
	};
	if( $('.txtEntry02').length ){
		hmall.formFocus('.txtEntry02');
	};
	if( $('.srhEntry01').length ){
		hmall.formFocus('.srhEntry01');
	};

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
		},
	},
	listMultiple: {
		init: function(trg){
			var thisObj = this;
			var $trg = $(trg);
			$li = $trg.children('li');

			// 초기값 셋팅
			$trg.each(function(){
				thisObj.movement($(this).children('li'), 0);
			});

			// 옵션 label 선택
			$li.children('a').on('click', function(){
				var $this = $(this);
				var $thisLi = $this.closest(trg).children('li');
				var idx = $this.closest(trg).children('li').index( $this.parent('li') );
				thisObj.movement($thisLi, idx);
			});

			// 하위 옵션 선택
			$li.find('ul').find('a').on('click', function(){
				var $this = $(this);
				var $allLi = $this.closest(trg).children('li');
				var idx = $allLi.index( $this.closest('ul').parent('li') );

				thisObj.movement($allLi, idx+1);

				$this.closest('ul').find('li').removeClass('active');
				$this.parent('li').addClass('active');
				return false;
			});
		},
		// 동작
		movement: function($thisLi, idx){
			$thisLi.removeClass('open');
			$thisLi.eq(idx).addClass('open');
		},
	},
	formFocus: function(trg){
		$(document).on('focus', trg+' input', function(){
			$(this).closest(trg).addClass('focus');
		});
		$(document).on('blur', trg+' input', function(){
			$(this).closest(trg).removeClass('focus');
		});
	},
	focusScrl: function(trg){
		$(document).on('focus', trg+' input', function(){
			var $this = $(this);
			var nPos = $this.offset().top - $('#header_container').height() - 20 ;
			console.log(nPos, 5);
			setTimeout(function(){
				$('html, body').scrollTop(nPos);
			}, 600);
		});
		/*$(window).on('scroll', function(){
			console.log( $(window).scrollTop() )
		});*/
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


