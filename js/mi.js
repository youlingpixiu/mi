/*异步加载页头页脚*/
$("#top").load("include/header.html");
$("#page_footer").load("include/footer.html");
$(window).load(function(){
    /*top购物车鼠标移入功能*/
    $("#top ul.rf li.top_shopping>a").hover(
        function(){$(this).children(".shopping_box").slideDown();},
        function(){$(this).children(".shopping_box").slideUp();});
    /*导航菜单栏鼠标移入功能*/
    $("#nav_menue div.menue_right ul").hover(
        function(event){
            var eTarget=event.originalEvent.target;
            if($(eTarget).attr("class")=="drop_menue"){
                $(eTarget).siblings().children("div.nav_menue_box").hide();
                $(eTarget).find("div.nav_menue_box").slideDown();
                $("#nav_menue div.menue_right ul li.drop_menue").mousemove(function(event){
                    $(this).siblings().children("div.nav_menue_box").hide();
                    $(this).find("div.nav_menue_box").show();
                })
            }
        },
        function(event){
            var eTarget=event.originalEvent.target;
            $(this).children("li.drop_menue").children("div.nav_menue_box").slideUp();
        });
    $("#nav_menue div.menue_right ul li.drop_menue a").mouseover(
        function(event){$(this).next().find("ul").show()});
    /*搜索框功能*/
    $("#nav_menue form input[name='search']").focus(function(){
        $(this).addClass("input_focus").next().css("border-color","#ff6700");
        $(this).next().next("div").fadeOut("linear");
        $(this).parent().next("ol.data_list").show();
    })
    $("#nav_menue form input[name='search']").blur(function(){
        $(this).removeClass("input_focus").next().css("border-color","#e0e0e0");
        $(this).next().next("div").fadeIn("linear");
        $(this).parent().next("ol.data_list").hide();
    })

    /*banner侧边菜单栏鼠标移入功能*/
    $("#aside_banner ul li").hover(
        function(){$(this).children("div").show();},
        function(){$(this).children("div").hide();});

    /*小米明星单品功能*/
    var star_prev=$("#mi_star a.star_prev");
    var star_next=$("#mi_star a.star_next");
    $(star_next).removeClass().addClass("star_next_disabled");
    var star_count=-1;
    /*鼠标移入后清除定时器，移来之后再次启动计时器*/
    $("#mi_star ul.product li").hover(
        function(){clearInterval(auto_star)},
        function(){star_slide_Again()});
    var auto_star=setInterval(function(){check_slide()},3000);
    function star_slide_Again(){
        auto_star=setInterval(function(){check_slide()},2000)
    }
    /*检查滚动*/
    function check_slide(){
        if(star_count==-1){
            star_slide(star_count);
            $(star_prev).removeClass().addClass("star_prev_disabled");
            $(star_next).removeClass().addClass("star_next");
            star_count=0;
        }else{
            star_slide(star_count);
            $(star_next).removeClass().addClass("star_next_disabled");
            $(star_prev).removeClass().addClass("star_prev");
            star_count=-1;
        }
    }
    function star_slide(dis){
        $("#mi_star ul.product").animate({left:dis*1240+"px"},1000);
    }
    /*右上角a标签事件绑定*/
    $(star_prev).hover(
        function(){clearInterval(auto_star)},
        function(){star_slide_Again()});
    $(star_prev).click(function(event){
        event.preventDefault();
        check_slide();
    });
    $(star_next).hover(
        function(){clearInterval(auto_star)},
        function(){star_slide_Again()});
    $(star_next).click(function(event){
        event.preventDefault();
        check_slide();
    })

    /*广告轮播功能*/
    var liNum=$("#carousel ul.carsoule_content li");
    var curIndex=0;
    $(liNum[0]).show().siblings().hide();
    var carousel_prev=$("#carousel a.carousel_prev");
    var carousel_next=$("#carousel a.carousel_next");
    var liIdx=$("#carousel ul.carousel_idx li");
    /*启动定时器循环切换图片*/
    var autochange=setInterval(function(){
        curIndex++;
        if(curIndex<liNum.length){
            changeImg(curIndex);
        }else{
            curIndex=0;
            changeImg(curIndex);
        }
    },2500);
    /*再次启动定时器*/
    function autoChangeAgain(){
        autochange=setInterval(function(){
            curIndex++;
            if(curIndex<liNum.length){
                changeImg(curIndex);
            }else{
                curIndex=0;
                changeImg(curIndex);
            }
        },2500);
    }
    /*图片暂停*/
    $("#carousel ul.carsoule_content").hover(
        function(){clearInterval(autochange)},
        function(){autoChangeAgain()});
    /*图片切换*/
    function changeImg(curIndex){
        $(liNum[curIndex]).show("slow").siblings().hide("slow");
        $(liIdx[curIndex]).addClass("carsel_active").siblings().removeClass();
    }
    /*左右控件功能*/
    $(carousel_prev).hover(
        function(){clearInterval(autochange)},
        function(){autoChangeAgain()});
    $(carousel_prev).click(function(event){
        event.preventDefault();
        curIndex = (curIndex >0) ? (--curIndex) : (liNum.length-1);
        changeImg(curIndex);
    })
    $(carousel_next).hover(
        function(){clearInterval(autochange)},
        function(){autoChangeAgain()});
    $(carousel_next).click(function(){
        event.preventDefault();
        curIndex = (curIndex < liNum.length-1) ? (++curIndex) : 0;
        changeImg(curIndex);
    });
    /*右下角页码功能*/
    $.each(liIdx,function(i){
        $(liIdx[i]).hover(
            function(){
                clearInterval(autochange);
                changeImg(i);
            },
            function(){autoChangeAgain()});
    });

    /*主体内容搭配区域功能*/
   var dapei_a=$("#main_content div.dapei>h1.h1_font>ul>li>a");
   var dapei_ul=$("#main_content div.dapei>ul.product_right");
   $.each(dapei_a,function(){
       $(this).click(function(event){
           event.preventDefault();
           var event_idx=$(event.originalEvent.target).attr("data-toggle");
           var event_ul=dapei_ul[event_idx];
           $("#main_content div.dapei>h1.h1_font>ul>li>a.a_active").removeClass();
           $(this).addClass("a_active");
           $("#main_content div.dapei>ul.product_right").removeClass("current_active");
           $(event_ul).addClass("current_active");
       });
   })
    /*主体内容配件区域功能*/
    var peijian_a=$("#main_content div.peijian>h1.h1_font>ul>li>a");
    var peijian_ul=$("#main_content div.peijian>ul.product_right");
    $.each(peijian_a,function(){
        $(this).click(function(event){
            event.preventDefault();
            var event_idx=$(event.originalEvent.target).attr("data-toggle");
            var event_ul=peijian_ul[event_idx];
            $("#main_content div.peijian>h1.h1_font>ul>li>a.a_active").removeClass();
            $(this).addClass("a_active");
            $("#main_content div.peijian>ul.product_right").removeClass("current_active");
            $(event_ul).addClass("current_active");
        });
    })
    /*主体内容周边区域功能*/
    var zhoubian_a=$("#main_content div.zhoubian>h1.h1_font>ul>li>a");
    var zhoubian_ul=$("#main_content div.zhoubian>ul.product_right");
    $.each(zhoubian_a,function(){
        $(this).click(function(event){
            event.preventDefault();
            var event_idx=$(event.originalEvent.target).attr("data-toggle");
            var event_ul=zhoubian_ul[event_idx];
            $("#main_content div.zhoubian>h1.h1_font>ul>li>a.a_active").removeClass();
            $(this).addClass("a_active");
            $("#main_content div.zhoubian>ul.product_right").removeClass("current_active");
            $(event_ul).addClass("current_active");
        });
    })


    /*为您推荐图片滚动功能*/
    var recommend_prev=$("div.recommend_product h1 a.recommend_prev");
    var recommend_next=$("div.recommend_product h1 a.recommend_next");
    var recom_liList=$("div.recommend_product ul li");
    $(recommend_next).removeClass().addClass("recommend_next_disabled");
    var recom_idx=0,recom_count=1;
    $(recommend_prev).click(function(event){
        event.preventDefault();
        if(recom_idx>-3){
            recom_idx-=1;
            recom_count++;
            recom_slide(recom_idx);
            if(recom_count==4){
                $(recommend_prev).removeClass().addClass("recommend_prev_disabled");
            }else{$(recommend_next).removeClass().addClass("recommend_next");}
        }
    })
    $(recommend_next).click(function(event){
        event.preventDefault();
        if(recom_idx<0){
            recom_idx+=1;
            recom_slide(recom_idx);
            recom_count--;
            if(recom_count==1){
                $(recommend_next).removeClass().addClass("recommend_next_disabled");
            }else{$(recommend_prev).removeClass().addClass("recommend_prev");}
        }
    })
    function recom_slide(dis){
        $("#main_content div.recommend_product  ul").animate({left:dis*1240+"px"},1000);
    }
})
/***当用户点击“提交登录信息”时，进行服务器端验证****/
$('#login').click(function() {
    //获得用户的所有输入——表单序列化
    var requestData = $('#login_3').serialize();
	console.log(123);
	console.log(requestData);
    /**将用户输入异步提交给服务器，进行用户名和密码的验证**/
        //$.post()  $.ajax()
    //console.log(requestData);
    $.post("data/register.php", requestData, function (data){
        if (data.code !== 1) { //登录失败
            $('#login_3').html(data.msg);
        } else { //登录成功
            //$('#tihuan').load('index.html',function () {
            //    var uname = $('[name="user_name"]').val();
            //    $('#welcome').html('欢迎回来：' + uname);
            //})
            sessionStorage.setItem("uname",data.user_name);
            window.location.href="index.html";
        }
    })
})

