$(function(){
    // header
    var decoleft=0;
    var menuWidth=0;
    //만약 body영역의 가로길이가 480px 이상이면
    if($(window).width() > 480){
        //pc버전
        $('nav').hover(function(){
            $('.deco').addClass('active');
        },
        function(){
            $('.deco').removeClass('active');
        });
    
        $('nav ul li a').hover(function(){
            decoleft=$(this).position().left;
            menuWidth=$(this).width()/2;
            var result=decoleft+menuWidth;
            $('.deco').css('left',result);
        });
    }else{
        //모바일버전
        $('header .menu').click(function(e){
            e.preventDefault();
            $('nav').animate({
                right:0
            });
        });
        $('header nav .mobile_close').click(function(e){
            e.preventDefault();
            $('nav').animate({
                right:'-100%'
            });
        });
    }
    //header ani
    function minimize_header() { 
        var $window = $(window); 
        var $header = $('header'); 
        var did_scroll = null;
        var current_scroll = 0; 
        var last_scroll = 0; 
        var move_scroll = 10; 
        $window.on('scroll', function() { 
            did_scroll = true; 
            if ($window.scrollTop() > $header.height()) { 
                $header.addClass('minimize'); 
            } else { 
                $header.removeClass('minimize'); 
            } 
        }); 
        setInterval(function() { 
            if (did_scroll && !$('body').hasClass('open-menu')) { 
                has_scrolled(); did_scroll = false; 
            } 
        }, 50); 
        function has_scrolled(){ 
            current_scroll = $(this).scrollTop(); 
            // Make sure they scroll more than move_scroll
        if(Math.abs(last_scroll - current_scroll) <= move_scroll) return;

        if(current_scroll > last_scroll){ // ScrollDown
            if(current_scroll > $(window).height()){
                gsap.to( $header, 0.4, { autoAlpha:0, y: -$header.outerHeight(), ease: Power3.easeOut });
            }
        }
        else { // ScrollUp
            gsap.to( $header, 0.4, { autoAlpha:1, y: 0, ease: Power3.easeOut });
        }

        last_scroll = current_scroll;
        }
    }

    minimize_header();

    //intro
    const left = document.getElementById("left-side");

    const handleMove = e => {
    left.style.width = `${e.clientX / window.innerWidth * 100}%`;}

    document.onmousemove = e => handleMove(e);

    document.ontouchmove = e => handleMove(e.touches[0]);

    // 메뉴 클릭 시 section 부드럽게 이동
    $('nav ul li a').click(function(e){
        e.preventDefault();
        var $anchor=$(this);
        $('html,body').stop().animate({
            scrollTop:$($anchor.attr('href')).offset().top
        },1000);
    });

    //swiper
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 50,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
         }
      });


    //   popup
    var img_num=0;
    var img_total=$('.swiper-slide').length;
    $('.popup').hide();
    $('.swiper-slide').click(function(e){
        e.preventDefault();
        //클릭한 이미지의 인덱스 번호를 img_num에 저장
        //인디덱스번호는 0부터 시작되고, 이미지의 번호는 1부터 시작하므로 고식에 1을 더해주어야 한다.
        img_num=$(this).index()+1;
        //클릭한 이미지의 a태그의 herf속성을 img_attr변수에 저장
        var img_attr=$(this).find('a').attr('href');
        var img_addr='<img src="'+img_attr+'">'
        // 클릭한 swiper-slide의 data 속성값을 txt_addr변수에 저장
        var txt_addr=$(this).attr('data');
        console.log(txt_addr);
        // txt_addr의 값을 쉽표(,)를 기준으로 잘라서 배욜로 만듬, 배열의 인덱스는 5개임(0,1,2,3,4)
        // str[0]=1
        // str[1]=Graphic Dsiner
        // str[2]=펩시 제로 슈거
        // str[3]=배너
        var str=txt_addr.split(',',7);
        var txt_str='<div class="slide_des"><div class="slide_title"><i>'+str[0]+'</i>'+str[1]+'</div><div class="slide_sub_title">제목</div><div class="slide_content">'+str[2]+'</div><div class="slide_sub_title">주제</div><div class="slide_content">'+str[3]+'</div><div class="slide_sub_title">스킬</div><div class="slide_content">'+str[4]+'</div><div class="slide_sub_title">주조색</div><div class="slide_content">'+str[5]+'</div><div class="slide_sub_title">보조색</div><div class="slide_content">'+str[6]+'</div></div>';
        
        $('.graphic').empty();
        $('.txt').empty();
        $('.graphic').append(img_addr);
        $('.txt').append(txt_str);
        $('.popup').show();
        $('html,body').css('overflow','hidden');
    });
    //팝업창 닫기
    $('.popup .close').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $('.popup').hide();
        $('html,body').css('overflow-y','visible');
    });
    //팝업창의 오른쪽버튼
        $('.popup .nextBtn').click(function(e){
            e.preventDefault();
            e.stopPropagation();
            img_num++; 
            if(img_num>img_total){
                img_num=1;
            }       
            var img_addr='<img src="img/graphic'+img_num+'.jpg">'
            var txt_addr=$('.swiper-slide').eq(img_num-1).attr('data');
            var str=txt_addr.split(',',7); 
            var txt_str='<div class="slide_des"><div class="slide_title"><i>'+str[0]+'</i>'+str[1]+'</div><div class="slide_sub_title">제목</div><div class="slide_content">'+str[2]+'</div><div class="slide_sub_title">스킬</div><div class="slide_content">'+str[3]+'</div><div class="slide_sub_title">컨셉</div><div class="slide_content">'+str[4]+'</div><div class="slide_sub_title">주조색</div><div class="slide_content">'+str[5]+'</div><div class="slide_sub_title">보조색</div><div class="slide_content">'+str[6]+'</div></div>';

            $('.graphic').empty();
            $('.txt').empty();
            $('.graphic').append(img_addr);
            $('.txt').append(txt_str);
            $('.popup').show();
            $('html,body').css('overflow-y','hidden');     
        });
        //팝업창의 왼쪽 버튼
        $('.popup .prevBtn').click(function(e){
            e.preventDefault();
            e.stopPropagation();
            img_num--;
            if(img_num<=0){
                img_num=img_total;
            }   
            var img_addr='<img src="img/graphic'+img_num+'.jpg ">'
            var txt_addr=$('.swiper-slide').eq(img_num-1).attr('data');
            var str=txt_addr.split(',',7); 
            var txt_str='<div class="slide_des"><div class="slide_title"><i>'+str[0]+'</i>'+str[1]+'</div><div class="slide_sub_title">제목</div><div class="slide_content">'+str[2]+'</div><div class="slide_sub_title">스킬</div><div class="slide_content">'+str[3]+'</div><div class="slide_sub_title">컨셉</div><div class="slide_content">'+str[4]+'</div><div class="slide_sub_title">주조색</div><div class="slide_content">'+str[5]+'</div><div class="slide_sub_title">보조색</div><div class="slide_content">'+str[6]+'</div></div>';

            $('.graphic').empty();
            $('.txt').empty();
            $('.graphic').append(img_addr);
            $('.txt').append(txt_str);
            $('.popup').show();
            $('html,body').css('overflow-y','hidden');
        });



    //스킬바

    jQuery(document).ready(function(){
        jQuery('.skillbar').each(function(){
            jQuery(this).find('.skillbar-bar').animate({
                width:jQuery(this).attr('data-percent')
            }, 3000);
        });
    });
    
    jQuery('.Count').each(function () {
      var $this = $(this);
      jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
        duration: 3000,
        easing: 'swing',
        step: function () {
          $this.text(Math.ceil(this.Counter));
        }
      });
    });


    //popup2
    $('.popup2').hide();
    $('.me').click(function(e){
        e.preventDefault();
        //popup영역 열기
        $('.popup2').show();
    });
    //.popup a에 클릭 이벤트 설정
    $('.popup2 .Bclose').click(function(e){
        e.preventDefault();
        $('.popup2').hide();
    });



    //contact 애니메이션
    var count=0;
            var image=document.getElementById('image');
            var frames=[
                'img/a1.png',
                'img/a2.png',
                'img/a3.png',
                'img/a4.png',
                'img/a5.png',
                'img/a6.png',
                'img/a7.png',
                'img/a8.png',
                'img/a9.png',
                'img/a8.png',
                'img/a7.png',
                'img/a6.png',
                'img/a5.png',
                'img/a4.png',
                'img/a3.png',
                'img/a2.png',
            ];
            setInterval(function(){
                image.src=frames[count % frames.length];
                count=count+1;
            }, 85);


    //footer
    var footer_tl = gsap.timeline({repeat:-1, ease:Linear.easeNone});
    footer_tl.set('footer .bg', {y: -16,delay: .5})
            .set('footer .bg', {y: 0,delay: .5});



    //홈페이지 화면을 클릭할 때마다 다른 아이콘 나옴
    var arr=[
        'img/icon1.png',
        'img/icon2.png',
        'img/icon3.png',
        'img/icon4.png',
        'img/icon5.png',
        'img/icon6.png',
        'img/icon7.png',
        'img/icon8.png',
        'img/icon9.png'
    ];

    // var ran=Math.floor(Math.random()*arr.length);
    var ran=0;
    var mouseX=0;
    var mouseY=0;
    $('body').on('click',function(e){
        mouseX=e.pageX;
        mouseY=e.pageY;
        ran=Math.floor(Math.random()*arr.length);
        $('#icon').empty();
        $('#icon').append('<img src="'+arr[ran]+'">');
        $('#icon').css({'left':mouseX+10,'top':mouseY+10});
        gsap.from('#icon img',0.3, {
            width:'70%',
            height:'70%',
            opacity:0,
            rotattion:30,
            TransformOrigin:'center'
        });
        gsap.to('#icon img',0.3, {
            width:'100%',
            height:'100%',
            opacity:1,
            rotattion:-30,
            ease:Back.easeOut,
            TransformOrigin:'center',
            onComplete:onCom
        });
        function onCom(){
            gsap.to('#icon img',1, {
                width:'70%',
                height:'70%',
                opacity:0,
                rotattion:-30,
                delay:0.2,
                TransformOrigin:'center'
            });
        }
    });
    $('button').click(function(e){
        e.stopPropagation();
    });
    var _old = jQuery.Event.prototype.stopPropagation;

    jQuery.Event.prototype.stopPropagation = function() {
        this.target.nodeName !== 'SPAN' && _old.apply( this, arguments );
    };







    /* Scroll back to top */
	if($('.progress-wrap').length){
		var progressPath = document.querySelector('.progress-wrap path');
		var pathLength = progressPath.getTotalLength();
		progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
		progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
		progressPath.style.strokeDashoffset = pathLength;
		progressPath.getBoundingClientRect();
		progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';		
		var updateProgress = function () {
			var scroll = $(window).scrollTop();
			var height = $(document).height() - $(window).height();
			var progress = pathLength - (scroll * pathLength / height);
			progressPath.style.strokeDashoffset = progress;
		}
		updateProgress();
		$(window).scroll(updateProgress);	
		var offset = 50;
		var duration = 550;
		$(window).on('scroll', function() {
			if ($(this).scrollTop() > offset) {
				$('.progress-wrap').addClass('active-progress');
			} else {
				$('.progress-wrap').removeClass('active-progress');
			}
		});				
		$('.progress-wrap').on('click', function(event) {
			event.preventDefault();
			$('html, body').animate({scrollTop: 0}, duration);
			return false;
		})
	}
});