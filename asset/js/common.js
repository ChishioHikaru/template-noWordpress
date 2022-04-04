// --- 共通関数 -----------------------------------------------

// load判定関数（PC,SP共通処理）
function loadedPageFunc() {
  $("body").addClass("loaded");
}

//cookieによる分岐
function addCookieFunc() {
  // 1時間cookie残す
  date = new Date();
  date.setTime(date.getTime() + 60 * 60 * 1000);
  if ($.cookie("watch")) {
    //cookieある場合
  } else {
    //cookieない場合
    $.cookie("watch", "1 hours", { expires: date });
  }
}

//SP、タブレット時.telにclass付与
function AddNoLink() {
  if (navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i)) {
    $(".tel").removeClass("no_link");
  } else {
    $(".tel").addClass("no_link");
  }
}

//ua判定
function uajudge() {
  var ua = navigator.userAgent.toLowerCase();
  var ver = navigator.appVersion.toLowerCase();
  // IE(11以外)
  var isMSIE = ua.indexOf("msie") > -1 && ua.indexOf("opera") == -1;
  // IE6
  var isIE6 = isMSIE && ver.indexOf("msie 6.") > -1;
  // IE7
  var isIE7 = isMSIE && ver.indexOf("msie 7.") > -1;
  // IE8
  var isIE8 = isMSIE && ver.indexOf("msie 8.") > -1;
  // IE9
  var isIE9 = isMSIE && ver.indexOf("msie 9.") > -1;
  // IE10
  var isIE10 = isMSIE && ver.indexOf("msie 10.") > -1;
  // IE11
  var isIE11 = ua.indexOf("trident/7") > -1;
  // IE
  var isIE = isMSIE || isIE11;
  // Edge
  var isEdge = ua.indexOf("edge") > -1;
  // Google Chrome
  var isChrome = ua.indexOf("chrome") > -1 && ua.indexOf("edge") == -1;
  // Firefox
  var isFirefox = ua.indexOf("firefox") > -1;
  // Safari
  var isSafari = ua.indexOf("safari") > -1 && ua.indexOf("chrome") == -1;
  // Opera
  var isOpera = ua.indexOf("opera") > -1;
  $(function () {
    if (isOpera) {
      //オペラならつけるクラス
      $("body").addClass("js_isOpera");
    } else if (isIE) {
      //IEならつけるクラス
      $("body").addClass("js_isIe");
    } else if (isChrome) {
      //Chromeならつけるクラス
      $("body").addClass("js_isChrome");
    } else if (isSafari) {
      //Safariならつけるクラス
      $("body").addClass("js_isSafari");
    } else if (isEdge) {
      //Edgeならつけるクラス
      $("body").addClass("js_isEdge");
    } else if (isFirefox) {
      //Firefoxならつけるクラス
      $("body").addClass("js_isFirefox");
    } else {
      return false;
    }
    if (!isIE) {
      //オペラならつけるクラス
      $("body").addClass("js_isnotIE");
    }
  });
  //デバイス判定
  var _ua = (function (u) {
    return {
      Tablet:
        (u.indexOf("windows") != -1 &&
          u.indexOf("touch") != -1 &&
          u.indexOf("tablet pc") == -1) ||
        u.indexOf("ipad") != -1 ||
        (u.indexOf("android") != -1 && u.indexOf("mobile") == -1) ||
        (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1) ||
        u.indexOf("kindle") != -1 ||
        u.indexOf("silk") != -1 ||
        u.indexOf("playbook") != -1,
      Mobile:
        (u.indexOf("windows") != -1 && u.indexOf("phone") != -1) ||
        u.indexOf("iphone") != -1 ||
        u.indexOf("ipod") != -1 ||
        (u.indexOf("android") != -1 && u.indexOf("mobile") != -1) ||
        (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1) ||
        u.indexOf("blackberry") != -1,
    };
  })(window.navigator.userAgent.toLowerCase());
  $(function () {
    if (_ua.Mobile) {
      //スマホならつけるクラス
      $("body").addClass("js_isMobile");
    } else if (_ua.Tablet) {
      //タブレットならつけるクラス
      $("body").addClass("js_isTablet");
    } else {
      //スマホ・タブレット以外ならつけるクラス
      $("body").addClass("js_isPc");
    }
  });
  if (navigator.platform.indexOf("Win") != -1) {
    //Windowsならつけるクラス
    $("body").addClass("js_isWin");
  } else {
    //Windows以外ならつけるクラス
    $("body").addClass("js_isNotWin");
  }
  $(function () {
    if (ua.indexOf("iphone") > 0) {
      //iPhoneならつけるクラス
      $("body").addClass("iphone");
    } else if (ua.indexOf("android") > 0 && ua.indexOf("mobile") > 0) {
      //Andoroidのスマホならつけるクラス
      $("body").addClass("android");
    } else if (ua.indexOf("ipad") > 0) {
      //iPadならつけるクラス
      $("body").addClass("ipad");
    }
  });
}

//page top関数（PC,SP共通処理）
function goToPageTopFunc() {
  $("#pageTop").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 900, "swing");
    return false;
  });
}

//ページ内スクロール関数（PC,SP共通処理）
function smoothScrollMoveFunc() {
  $('a[href^="#"]').click(function () {
    var speed = 900;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? "html" : href);
    var position = target.offset().top;
    $("html, body").animate({ scrollTop: position }, speed, "swing");
    return false;
  });
}

//タブ処理
function tabContentFunc() {
  $(".tab li").on("click", function () {
    index = $(".tab li").index(this);
    $(".tab li").removeClass("active");
    $(".tab li").eq(index).addClass("active");
    $(".tab_block").removeClass("active");
    $(".tab_block").eq(index).addClass("active");
  });
}

// アコーディオン処理
// （dl > dt dd dt dd...を想定　<dt class="ac_trigger">をクリックした時にddをアコーディオン処理）
function showAccordionFunc() {
  var acTrigger = $(".ac_trigger");
  // 常に一つだけの処理
  // acTrigger.click(function () {
  // 	if ($(this).hasClass('show')) {
  // 		$(this).removeClass('show').next('dd').slideUp();
  // 	} else {
  // 		$(".ac_trigger").removeClass('show');
  // 		$('dd').slideUp();
  // 		$(this).addClass('show').next('dd').slideDown();
  // 	}
  // });

  // 全部開く
  acTrigger.click(function () {
    if ($(this).hasClass("show")) {
      $(this).removeClass("show").next("dd").slideUp();
    } else {
      $(this).addClass("show").next("dd").slideDown();
    }
  });
}

//表示アニメーション
function scrollAnimFunc() {
  $(window).on("scroll", function () {
    $(
      ".anim, .fade_y, .svg_anim, .scr_cvr, .clip-path, .fadeLeft, .fadeRight"
    ).each(function () {
      scr = $(window).scrollTop();
      winHeight = $(window).height();
      action = $(this).offset().top;
      if (scr > action - winHeight + winHeight / 8) {
        $(this).addClass("on");
      }
    });
  });
}

//SP triggerクリックでメニュー展開
function spMenuOpenFunc() {
  $(".trigger").click(function () {
    if ($(this).hasClass("close")) {
      $(".menu").removeClass("on");
      $(this).removeClass("close");
      $(".header, .nav").removeClass("slideIn");
    } else {
      $(".menu").addClass("on");
      $(this).addClass("close");
      $(".header, .nav").addClass("slideIn");
    }
  });
}

//SP menu展開時に背景固定
function spBodyFixedFunc() {
  var w = $(window).width();
  if (w < 896) {
    var state = false;
    var scrollpos = "";
    $(".trigger").on("click", function () {
      if (state == false) {
        scrollpos = $(window).scrollTop();
        $("body").addClass("sp_fix").css({
          top: -scrollpos,
        });
        state = true;
      } else {
        $("body").removeClass("sp_fix").css({ top: 0 });
        window.scrollTo(0, scrollpos);
        state = false;
      }
    });
    $(".close").on("click", function () {
      $("body").removeClass("sp_fix").css({ top: 0 });
      window.scrollTo(0, scrollpos);
      state = false;
    });
  }
}

//ヘッダーにfv以降までスクロールで何らかの処理
function headerAddEventFunc() {
  if ($(".firstview").length) {
    $(window).on("scroll", function () {
      scr = $(window).scrollTop();
      firstview = $(".firstview").offset().top;
      winHeight = $(window).height();
      if (scr > firstview + winHeight) {
        $(".header, .nav").addClass("on");
      } else {
        $(".header, .nav").removeClass("on");
      }
    });
  }
}

//header ホバーでメガドロップ
function menuShowDelay(element, delayTime) {
  var sethover;
  var setleave;
  var setnexthover;
  var targetOn;
  var targetOff;
  var nowActive = -1;
  var hoverClass = "hover";
  var manuElement = element;
  var hoverTime = delayTime;

  manuElement.on({
    mouseover: function () {
      $(".header").addClass("no_mix");
      targetOn = $(this);
      if (nowActive === -1) {
        sethover = setTimeout(function () {
          targetOn.addClass(hoverClass);
          targetOn.find(".nav--area--under").fadeIn();
          $(".overlay").fadeIn();
          nowActive = manuElement.index(targetOn);
        }, hoverTime);
      } else {
        if (targetOn.hasClass(hoverClass)) {
          clearTimeout(setleave);
        } else {
          setnexthover = setTimeout(function () {
            manuElement.removeClass(hoverClass);
            manuElement.find(".nav--area--under").fadeOut();
            $(".overlay").fadeOut();
            targetOn.addClass(hoverClass);
            targetOn.find(".nav--area--under").fadeIn();
            $(".overlay").fadeIn();
            nowActive = manuElement.index(targetOn);
          }, hoverTime);
        }
      }
    },
    mouseout: function () {
      $(".header").removeClass("no_mix");
      targetOff = $(this);
      clearTimeout(sethover);
      function mouseIsOverWorkaround(what) {
        var temp = $(what).parent().find(":hover");
        return temp.length == 1 && temp[0] == what;
      }
      var parent = targetOff;
      if (mouseIsOverWorkaround(parent[0])) {
        if (targetOff.hasClass(hoverClass)) {
          clearTimeout(setnexthover);
        }
      } else {
        setleave = setTimeout(function () {
          targetOff.removeClass(hoverClass);
          targetOff.find(".nav--area--under").fadeOut();
          $(".overlay").fadeOut();
          nowActive = -1;
        }, hoverTime);
      }
    },
  });
}

// --- 実績関連 -----------------------------------------------
$(function () {
  $(".js-btn-case01").on("click", function () {
    if ($(this).hasClass("on")) {
      $(this).text("裏側をのぞく");
    } else {
      $(this).text("戻る");
    }
    $(this).toggleClass("on");
    $(this).siblings(".changetxt").toggleClass("disnon");
  });

  $(".js-btn-case02").on("click", function () {
    if ($(this).hasClass("on")) {
      $(this).text("挑戦の苦労をみる");
    } else {
      $(this).text("戻る");
    }
    $(this).toggleClass("on");
    $(this).siblings(".changetxt").toggleClass("disnon");
  });
});

// --- ナビ設定 -----------------------------------------------
// function navAddEventFunc() {
// 	if ($('.bgc_change').length) {
// 		$(window).on('scroll', function () {
// 			scr = $(window).scrollTop();
// 			bgview = $(".bgc_change").offset().top;
// 			winHeight = $(window).height();
// 			if (scr > bgview + winHeight) {
// 				$(".header, .nav").addClass("on");
// 			} else {
// 				$(".header, .nav").removeClass("on");
// 			}
// 		});
// 	}
// }

// --- オープニング -----------------------------------------------
// $(function () {
//   setTimeout(function () {
//     $(".opening01").addClass("on");
//   }, 2000);
//   setTimeout(function () {
//     $(".opening02").addClass("on");
//   }, 4000);
//   setTimeout(function () {
//     $(".opening03").addClass("on");
//   }, 6000);
//   setTimeout(function () {
//     $(".opening04").addClass("on");
//   }, 7500);
//   setTimeout(function () {
//     $("#stage.first").addClass("show");
//   }, 9800);
//   setTimeout(function () {
//     $(".opening__area").fadeOut();
//     $("body.top").removeClass("noscroll");
//   }, 10000);
// });

// $(window).on("load", function () {
//   $(".opening01").addClass("on");
//   setTimeout(function () {
//     $(".opening02").addClass("on");
//   }, 2000);
//   setTimeout(function () {
//     $(".opening03").addClass("on");
//   }, 4000);
//   setTimeout(function () {
//     $(".opening04").addClass("on");
//   }, 5500);
//   setTimeout(function () {
//     $("#stage.first").addClass("show");
//   }, 7800);
//   setTimeout(function () {
//     $(".opening__area").fadeOut();
//     $("body.top").removeClass("noscroll");
//   }, 8000);
// });

// 下層MV
// $(function(){
// 	setTimeout(function(){
// 		$('#stage').addClass('on');
// 	},1000);
// 	setTimeout(function(){
// 		$('.block.title__start').addClass('on');
// 	},3000);
// 	setTimeout(function(){
// 		$('.mv__start').addClass('on');
// 	},4800);
// });

// $(window).on("load", function () {
//   $("#stage").addClass("on");
// });

// ---実績紹介、下層 -----------------------------------------------
function projectBox() {
  contentBox = $(".case__suggestion--content .content");
  area1 = contentBox.eq(0).height();
  area2 = contentBox.eq(1).height();
  if (area1 > area2) {
    contentBox.height(area1);
  } else if (area1 < area2) {
    contentBox.height(area2);
  }
}

function anchorFade() {
  targetHash = location.hash;
  if (targetHash == "#defiant") {
    console.log(targetHash);
    $("#defiant .fade_y").addClass("on");
  } else if (targetHash == "#stable") {
    $("#stable .fade_y").addClass("on");
  }
}

// --- 採用情報 -----------------------------------------------
$(function () {
  $(".recruit__flow--listbtn li").on("click", function () {
    num = $(".recruit__flow--listbtn li").index(this);

    $(".recruit__flow--listbtn li").removeClass("current");
    $(this).addClass("current");

    $(".recruit__flow--content .item").addClass("disnon");
    $(".recruit__flow--content .item").eq(num).removeClass("disnon");
  });
});

// ---社員紹介　チャート部分---------------------------------------
$(".single__skill--chart .item").on("click", function () {
  num = $(".single__skill--chart .item").index(this);

  $(".single__skill--chart .item").removeClass("current");
  $(this).addClass("current");

  $(".itemcontent .textarea").addClass("disnon");
  $(".itemcontent .textarea").eq(num).removeClass("disnon");
});

// ---おもろ社内制度------------------------------------------------
$(".internal__meeting--closebtn").on("click", function () {
  $(this).prev().slideToggle();
  $(this).toggleClass("open");
});

// --- 関数実行 -----------------------------------------------

//ページの全データを読み込み後
$(window).on("load", function () {
  loadedPageFunc();
  AddNoLink();
  if ($(".top").length) {
    addCookieFunc();
    $(".mv_slider").slick({
      slidesToShow: 1,
      fade: true,
      speed: 1000,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: false,
      pauseOnFocus: false,
      pauseOnHover: false,
    });
  }
  var w = $(window).width();
  var x = 896;
  if (w > x) {
    $(function () {
      menuShowDelay($(".modal"), 0);
    });
  } else {
    $(".modal").off("mouseenter mouseleave");
  }
});

//リサイズが走った場合
$(window).on("resize", function () {
  projectBox();
});

$(window).on("load", function () {
  anchorFade();
});

//DOM生成後
$(function () {
  //******************
  // 共通処理
  //******************

  goToPageTopFunc();
  smoothScrollMoveFunc();
  tabContentFunc();
  scrollAnimFunc();
  spMenuOpenFunc();
  spBodyFixedFunc();
  headerAddEventFunc();
  projectBox();
  showAccordionFunc();

  //****************************
  // その他は要素の有無で個別で実装
  //****************************
  if ($(".className").length) {
  }
});

// --- tips -----------------------------------------------

//****************************
//背景が白のエリアでなんかする
//****************************

// if ($('.wht_area').length) {
// 	$(window).on('scroll', function () {
// 		whtArea = $('.wht_area').offset().top;
// 		whtHeight = $('.wht_area').outerHeight();
// 		whtBottom = whtArea + whtHeight;
// 		scr = $(window).scrollTop();
// 		if (scr < whtArea) {
// 			$(".header").removeClass("wht");
// 		} else if (scr > whtArea && scr < whtBottom) {
// 			$(".header").addClass("wht");
// 			$(".header").addClass("wht");
// 		} else if (scr > whtBottom) {
// 			$(".header").removeClass("wht");
// 		}
// 	});
// }

//****************************
//スクロール途中で全画面の背景固定
//****************************

// $(window).on('scroll', function () {
// 	scr = $(window).scrollTop();
// 	wrap = $('.fix_bg_wrap').offset().top;
// 	wrapHeight = $('.fix_bg_wrap').outerHeight();
// 	winHeight = $(window).outerHeight();

// 	if (scr > wrap + wrapHeight - winHeight) {
// 		$('.fix_bg').removeClass('fixed');
// 		$('.fix_bg').addClass('bottom');
// 	} else if (scr > wrap) {
// 		$('.fix_bg').addClass('fixed');
// 		$('.fix_bg').removeClass('bottom');
// 	} else if (scr < wrap) {
// 		$('.fix_bg').removeClass('fixed');
// 	}
// });

//****************************
//slickの基本処理（レスポンシブ）
//****************************

// $('#slider').slick({
// 	slidesToShow: 2.5,
// 	slidesToScroll: 1,
// 	autoplay: true,
// 	autoplaySpeed: 3000,
// 	//個別でarrowを追加
// 	prevArrow: '<div class="slick-prev slick-arrow ablt"><img src="../asset/img/....." alt=""></div>',
// 	nextArrow: '<div class="slick-next slick-arrow ablt"><img src="../asset/img/....." alt=""></div>',
// 	responsive: [
// 		{
// 			breakpoint: 896,
// 			settings: {
// 				slidesToShow: 1,
// 				centerMode: true
// 			}
// 		}
// 	]
// });

//****************************
//自動で流れるカルーセルスライダー
//****************************

// $('#carousel_slider').slick({
// 	arrows: false,
// 	autoplay: true,
// 	autoplaySpeed: 0,
// 	cssEase: 'linear',
// 	speed: 15000,
// 	slidesToShow: 3,
// 	slidesToScroll: 1,
// 	responsive: [
// 		{
// 			breakpoint: 896,
// 			settings: {
// 				slidesToShow: 2
// 			}
// 		}
// 	]
// });

//****************************
//スライドが動くのに連携して処理する
//****************************

// var slider = "#slider"; // スライダー
// var thumb = "#thumb_item"; // サムネイル画像アイテム

// // サムネイル画像アイテムに data-index でindex番号を付与
// $(thumb).each(function () {
// 	var index = $(thumb).index(this);
// 	$(this).attr("data-index", index);
// });

// // スライダー初期化後、カレントのサムネイル画像にクラス「thumbnail-current」を付ける
// // 「slickスライダー作成」の前にこの記述は書いてください。
// $(slider).on('init', function (slick) {
// 	var index = $(".slide-item.slick-slide.slick-current").attr("data-slick-index");
// 	$(thumb + '[data-index="' + index + '"]').addClass("thumb_current");
// });
// //slickスライダー初期化
// $(slider).slick({
// 	autoplay: true,
// 	arrows: false,
// 	fade: true,
// 	infinite: true
// });
// //サムネイル画像のカレントを切り替え
// $(slider).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
// 	$(thumb).each(function () {
// 		$(this).removeClass("thumb_current");
// 	});
// 	$(thumb + '[data-index="' + nextSlide + '"]').addClass("thumb_current");
// });

//****************************
//modal_openクリックでYouTubeポップアップ
//****************************

$(".modal_open").on("click", function () {
  $("#videoiframe").attr("src", "https://www.youtube.com/embed/REQqs9VAfnQ");
  $(".modal-overlay").fadeIn("slow");
  posCenter();
  $(window).on("resize", function () {
    posCenter();
  });
  function posCenter() {
    var w = $(window).width();
    var h = $(window).height();
    var ow = $(".modal-panel").outerWidth();
    var oh = $(".modal-panel").outerHeight();
    $(".modal-panel").css({
      left: (w - ow) / 2 + "px",
      top: (h - oh) / 2 + "px",
    });
  }
  $(".modal-close, .modal-overlay").on("click", function () {
    $(".modal-overlay").fadeOut("slow");
    $("#videoiframe").attr("src", "");
  });
});

//****************************
//$count要素のカウントアップを開始する
//****************************

// function CountUp($count) {
// 	var countMax = $count.attr('data-num');
// 	var countNext = 0;
// 	var countTimer;
// 	function timer() {
// 		countTimer = setInterval(function () {
// 			if (countNext < countMax) {
// 				countNext = countNext + Math.round((countMax - countNext) / 2);
// 				$count.text(countNext);
// 			} else if (countNext == countMax) {
// 				clearInterval(countTimer);
// 			}
// 		}, 40);
// 	}
// 	timer();
// }
// function detectCountElement($counts) {
// 	$.each($counts, function (i, countElement) {
// 		var $count = $(countElement);
// 		if ($count.attr("data-isLaunched")) {
// 			return;
// 		}
// 		var $window = $(window);
// 		var scr = $window.scrollTop();
// 		var winHeight = $window.innerHeight();
// 		var offset = $count.offset().top;
// 		if (scr > offset - winHeight + winHeight / 4) {
// 			CountUp($count);
// 			$count.attr("data-isLaunched", true);
// 		}
// 	});
// }
// $(function () {
// 	var $counts = $(".count");
// 	detectCountElement($counts);
// 	$(window).scroll(detectCountElement.bind(window, $counts));
// });

//****************************
//マウス追従
//****************************

//ie以外
// var userAgent = window.navigator.userAgent.toLowerCase();
// if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || userAgent.indexOf('msie') != -1 || userAgent.indexOf('edge') != -1 || userAgent.indexOf('trident/7') != -1) {
// 	$('#pointer').remove();
// } else {
// 	//特定の要素にマウスオーバーで何らかの処理
// 	$('').mouseenter(function () {
// 		$('#pointer').addClass("hvr");
// 	}).mouseleave(function () {
// 		$('#pointer').removeClass("hvr");
// 	});
// 	//追従処理
// 	var xMousePos = 0;
// 	var yMousePos = 0;
// 	$(window).on('mousemove', function (event) {
// 		xMousePos = event.clientX;
// 		yMousePos = event.clientY;
// 	});
// 	window.requestAnimationFrame(function PointerMove() {
// 		$("#pointer").css('transform', 'matrix(1, 0, 0, 1, ' + xMousePos + ',  ' + yMousePos + ')');
// 		window.requestAnimationFrame(PointerMove);
// 	});
// }
// window.onpageshow = function (event) {
// 	if (event.persisted) {
// 		window.location.reload();
// 	}
// };

// #pointer{
// 	//カーソル位置を合わす
// 	margin-top:-10px;
// 	margin-left:-10px;
// 	position:fixed;
// 	top:0;
// 	left:0;
// 	z-index: 9998;
// 	pointer-events:none;
// 	transform-origin: center center;
// 	transition: all 0.15s ease-out;
// }

//****************************
//スクロールで画像パララックス
//****************************

// $(window).on('scroll', function () {
// 	scr = $(window).scrollTop();
// 	winhig = $(window).outerHeight();
// 	var bgPosition = scr / 250;
// 	//画像自体
// 	if (bgPosition) {
// 		$('').css('transform', 'translateX(' + bgPosition + '%)');
// 		$('').css('transform', 'translateX(-' + bgPosition + '%)');
// 		$('').css('transform', 'translateY(' + bgPosition + '%)');
// 		$('').css('transform', 'translateY(-' + bgPosition + '%)');
// 	}
// 	//背景画像
// 	if (bgPosition) {
// 		$('').css('background-position', + bgPosition + 'px');
// 		$('').css('background-position', '-' + bgPosition + 'px');
// 	}
// });

// .para_wrap {
//   overflow: hidden;
//   height: 100%;
//   .para_box {
//     width: 130%;
//     transition: ease;
//     transform: translateX(0%);
//     transform: translateY(0%);
//   }
// }
