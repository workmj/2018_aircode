
$(function(){

	/* 요소별 */
	if( $(".js-tab-wrap").length ){
		encore.tab();
	}
	if( $(".gnb_wrap").length ){
		encore.gnb();
	}
	if( $(".selectBox01").length ){
		encore.selectBox(".selectBox01");
	}
	if( $(".selectBox02").length ){
		encore.selectBox(".selectBox02");
	}
	if( $(".content_type05").length ){
		encore.nextToggle(".content_type05 .header a", ".content");
	}
	/*if( $("input[type='number']").length ){
		encore.integerEntry("input[type='number']");
	}*/

	/* 홈 */
	if( $(".home_page").length ){
		encore.home.init();
	}
	/* 상품상세 */
	if( $(".detail_page").length ){
		encore.detail.init();
	}
	/* 상품상세 > 구매하기 > 배송지입력 */
	if( $(".fullPop_container .p_address_page").length ){
		encore.p_address.init();
	}
	/* MY > 이용내역 > 상세 */
	if( $(".usageDetail_page").length ){
		encore.usageDetail.init();
	}

});

var encore = {}

encore = {
	/* tab */
	tab : function(){
		var $wrap = $(".js-tab-wrap");
		var $menuLi = $wrap.find(".js-tab-menu li");
		var $tabCont = $wrap.find(".js-tab-cont");

		// init
		action(0, $wrap);

		// action
		$menuLi.find("a").on("click", function(){
			var $wrap = $(this).closest(".js-tab-wrap");
			var idx = $menuLi.index( $(this).parent() );
			action(idx, $wrap);
			return false;
		});
		function action(idx, $wrap){
			var $menuLi = $wrap.find(".js-tab-menu li");
			var $tabCont = $wrap.find(".js-tab-cont");
			$menuLi.removeClass("active");
			$menuLi.eq(idx).addClass("active");
			$tabCont.hide();
			$tabCont.eq(idx).show();
		}
	},
	/* gnb fixed */
	gnb: function(){
		var $gnb = $(".gnb_wrap");
		var headerH = $("#header_container").height();
		$(window).on("scroll", function(){
			var nScrl = $(this).scrollTop();
			if( nScrl > headerH ) {
				$gnb.addClass("fixed");
			} else {
				$gnb.removeClass("fixed");
			}
		});
	},
	/* 세자리수마다 콤마찍기 */
	numComma : function(n, suffix){
		var result;
		/* var num = parseFloat(n)+"";
		result = num.replace(/\B(?=(\d{3})+(?!\d))/g, ","); */
		var parts = n.toString().split(".");
		result = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
		if( suffix ){
			result += suffix;
		}
		return result;
	},
	/* 정수만 입력받기 */
	integerEntry : function(el){
		$(document).on("keydown", el, function(e){
			/* e(지수), .(소수점) -(마이너스) 예외처리 */
			if(e.keyCode == 69 || e.keyCode == 190 || e.keyCode == 109 || e.keyCode == 189){
				return false;
			} 
		});
	},
	/* select */
	selectBox : function(el){
		// 초기값 셋팅
		$(el).find("select").each(function(idx){
			changeValue( $(this), true );
		});
		// 셀렉트 선택
		$(document).on("change", el + " select", function(){
			changeValue( $(this) );
		});
		// 동작
		function changeValue($this, initFlag){
			var $value = $this.closest(el).find(".value");
			if( initFlag && $value.find(".hint").length ){
				return false;
			}
			$value.text( $this.find('option:selected').text() );
		}
	},
	/* 팝업 */
	popup : function(el){
		var $el = $(el);
		if( $el.css("display") != "none" ){
			$el.hide();
		} else {
			$el.show();
		}
	},
	/* 다음요소_슬라이드 */
	nextToggle : function(trgEl, openEl){
		$(document).on("click", trgEl, function(){
			var $header = $(this).parent();
			var $content = $header.next(openEl);
			if( $header.hasClass("open") ){
				$header.removeClass("open");
				$content.slideUp(300);
			} else {
				$header.addClass("open");
				$content.slideDown(300);
			}
			return false;
		});
	}
}



/*
*	swiper option
*/
var _swiperOption = {
	ad : function($wrap){
		return {
			pagination: {
				el: $wrap + ' .swiper-pagination',
				type: 'bullets',
			},
			speed: 500,			// 속도
			loop: true,			// 무한롤링 (마지막 페이지에서 다시 첫번째 페이지로)
			autoplay: {
				delay: 3000,	// 자동롤링 속도 (3초마다)
				disableOnInteraction: false,	// 사용자가 조작시 자동롤링 멈추는 기능 해제(false)
			},
		}
	},
	brand : function($wrap){
		return {
			pagination: {
				el: $wrap + ' .swiper-pagination',
				type: 'fraction',
				renderFraction: function (currentClass, totalClass) {
					return	'<span class="' + currentClass + '"></span>' +
							'/' +
							'<span class="' + totalClass + '"></span>';
				}
			}
		}
	}
}



/*
*	홈
*/
encore.home = {
	init : function(){
		this.theme();
	},
	theme : function(){
		var $wrap = $(".home_page .theme_wrap");
		var $list = $wrap.children("ul");
		var $btnMore = $wrap.find(".btnMore");
		var lineDefulat = 2; // 기본 노출(2줄)
		var lineHeight = parseInt($list.find("li").css("height")); // 기본90
		// 모션 정의
		var motion = {
			close : function(initFlag){
				// 닫기
				$wrap.removeClass("extend");
				var speed = 300;
				if(initFlag){
					speed=0;
				}
				$list.animate({"height":lineDefulat*lineHeight}, speed);
				$btnMore.find("span").text("펼쳐보기");
			},
			open: function(){
				// 열기
				var fullHeight = Math.ceil($list.find("li").length/4) * lineHeight; // 4는 한 줄에 4개씩 들어가는 것을 의미합니다.
				$wrap.addClass("extend"); 
				$list.animate({"height":fullHeight}, 300);
				$btnMore.find("span").text("접기");
			}
		}
		// init
		motion.close(true);
		// 버튼 클릭
		$btnMore.on("click", function(){
			if( $wrap.hasClass("extend") ){
				motion.close();
			} else {
				motion.open();
			}
			return false;
		});
	}
}


/*
*	상품상세
*/
encore.detail = {
	init : function(){
		this.amount();
		this.numEntry();
	},
	amount : function(){
		var $wrap = $(".detail_page .buy_content");
		var $btnBuy = $wrap.find(".btnBuy");
		var $btnClose = $wrap.find(".amount_wrap .btnClose");
		$btnBuy.on("click", function(){
			$wrap.addClass("open");
			return false;
		});
		$btnClose.on("click", function(){
			$wrap.removeClass("open");
			return false;
		});
	},
	numEntry : function(){
		encore.integerEntry(".detail_page .buy_content .amount_wrap .numBox .adjust .entry input");
	}
}



/*
*	상품상세 > 구매하기 > 배송지입력
*/
encore.p_address = {
	init : function(){
		encore.integerEntry(".p_address_page .content_wrap .table_type02 .phone .txtEntry01 input");
	}
}




/*
*	MY > 이용내역 > 상세
*/
encore.usageDetail = {
	init : function(){
		encore.nextToggle(".usageDetail_page .pay_content .hd a", ".cont");
		encore.nextToggle(".usageDetail_page .product_detail .delivery_wrap .hd a", ".cont");
	}
}


