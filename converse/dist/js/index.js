define(["jquery",'jquery-cookie'],function($){
    function main(){
        $(function(){
            // 登陆注册搜索下拉事件
            pullDown('#login_1',"#login_box");
            pullDown('#login_2',"#login_box");
            pullDown('#register','#register_box');
            pullDown('#search','#search_box');
            pullDown('#go_register','#register_box');
            pullDown('#closebtn','#search_box');
            // 给生日下拉框添加年份
            for(var i = 2018;i >= 1918;i--){
                var $node = $('<option value = '+i+'>'+i+'</option>');
                $('#birthYears').append($node);
            }
            var oYear = $('.selectYear').html();
            var leapYear = false;
            $('#birthYears').change(function(){
                $('.selectYear').html($(this).find('option:selected').val());
                oYear = $('.selectYear').html();
                if((oYear%4==0 && oYear%100!=0) || oYear%400==0){
                    leapYear = true;
                }else{
                    leapYear = false;
                };
            })
            // 给生日下拉框添加月份
            var oMonth = $('.selectMonth').html();
            var oDay = null;
            for(var i = 1;i <= 12;i++){
                var $node = $('<option value = '+i+'>'+i+'</option>');
                $('#birthMonths').append($node);
            }
            $('#birthMonths').change(function(){
                $('.selectMonth').html($(this).find('option:selected').val());
                oMonth = $('.selectMonth').html();
                switch(oMonth){
                    case '1':
                    case '3':
                    case '5':
                    case '7':
                    case '8':
                    case '10':
                    case '12':
                    oDay = 31;
                    addDay(oDay);
                    break;
                    case '4':
                    case '6':
                    case '9':
                    case '11':
                    oDay = 30;
                    addDay(oDay)
                    break
                    case '2':
                    if(leapYear){
                         oDay = 29;
                         addDay(oDay);
                    }else{
                         oDay = 28;
                         addDay(oDay);
                    };
                    break;
                    default:
                        break;
                }
            })
            // 给生日下拉框添加日期
            function addDay(Day){
                oYear = $(this).find('option:selected').val();
                $('#birthDays').empty();
                for(var i = 1;i <= Day;i++){
                    var $node = $('<option value = '+i+'>'+i+'</option>');
                    $('#birthDays').append($node);
                }
            }
            addDay(31);
            $('#birthDays').change(function(){
                $('.selectDay').html($(this).find('option:selected').val());
            })
            // 注册界面性别选择勾选框样式变化事件
            $('#male').click(function(){
                $('#sexBox').find('div').attr('class','');
                $(this).find('div').attr('class','checked');
            })
            $('#female').click(function(){
                $('#sexBox').find('div').attr('class','');
                $(this).find('div').attr('class','checked');
            })
            // 搜索框添加点击事件
            $('#searchValue').click(function(){
                $('#searchTxt').fadeOut();
            })
            $('#searchInput').blur(function(){
                $('#searchTxt').fadeIn();
            })
            // 登陆注册界面切换验证码事件
            $('#checkbox').html(textCode(4));
            $('#change').click(function(ev){
                $('#checkbox').html(textCode(4));
                ev.preventDefault();
            })
            $('#regCheckcode').html(textCode(4));
            $('#changeCode').click(function(ev){
                $('#regCheckcode').html(textCode(4));
                ev.preventDefault();
            })
            // banner加载图片
            $.ajax({
                url:'json/banner.json',
                type:'GET',
                async:false,
                success:function(res){
                    for(var i = 0;i < res.length;i++){
                        $(`<div><a href=""><img src=${res[i].img} alt=""></a></div>`).css('z-index','5'-i).appendTo($('#bannerPic'));
                    }
                },
                error:function(msg){
                    alert(msg);
                }
            })
            // banner图片自动滚动
            var aLis = $('#bannerTitle').find('li');
            var aBs = $('#bannerPic').find('div');
            var iNow = 0;
            var timer = null;
            $('#bannerPic').hover(function(){
                clearInterval(timer);
            },function(){
                timer = setInterval(timerInner,3000);
            });
            timer = setInterval(timerInner,3000);
            function timerInner(){
                iNow++;
                tab();
            }
            aLis.hover(function(){
                iNow = $(this).index();
                tab();
                clearInterval(timer);
            },function(){
                timer = setInterval(timerInner,3000);
            })
            $('#lastBanner').click(function(){
                iNow -= 1;
                clearInterval(timer);
                tab();
                timer = setInterval(timerInner,3000);
            })
            $('#nextBanner').click(function(){
                iNow += 1;
                clearInterval(timer);
                tab();
                timer = setInterval(timerInner,3000);
            })
            function tab(){
                aLis.attr('class','').eq(iNow).attr('class','select');
                if(iNow > aLis.size()-1){
                    aLis.eq(0).attr('class','select');
                    iNow = 0;
                }
                aBs.stop().animate({opacity:0},1000);
                aBs.eq(iNow).stop().animate({opacity:1},1000,function(){
                    if(iNow > aBs.size()-1){
                        aBs.eq(iNow).stop().animate({opacity:0},1000);
                        aBs.eq(0).stop().animate({opacity:1},1000);
                    }
                })
            }
            // 导航栏滚动位置固定
            $(document).scroll(function(){
                if($(document).scrollTop() >= $('#stickHeader').height()){
                    $('#stickHeader').css('position','fixed');
                    $('#stickHeader').css('top','0');
                    $('#stickHeader').css('z-index','301');
                    $('.bodyBox').css('margin-top','260px');
                    $('.pagecontent').css('margin-top','260px')
                }else{
                    $('#stickHeader').css('position','relative');
                    $('#bodyBox').css('margin-top','0');
                    $('.pagecontent').css('margin-top','0');
                }
            })
            // 热门商品数据加载
            $.ajax({
                url:'json/hotPdts.json',
                type:'GET',
                async:false,
                success:function(res){
                    for(var i = 0;i < res.length;i++){
                        $(`<div class = 'category-hot'><a href=""><p>${res[i].title}</p><img src=${res[i].img} alt=""></a></div>`).appendTo($('#hotPdts .category'));
                    }
                },
                error:function(msg){
                    alert(msg);
                }
            })
            // 热卖商品菜单特效
            $('.category-hot').mouseover(function(){
                var x = ($('.category-hot').index(this));
                var x1 =25*(x+1);
                var xNow = x1 - 13+`%`;
                $('.brand-menu').stop().animate({left:xNow},500);
                $('.hotbox').css('display','none');
                $('.hotbox').css('opacity','0');
                $('.hotbox').eq(x).css('display','block').stop().animate({opacity:1},500)
            })
            $('.hotbox').find('div').hover(function(){
                $(this).attr('class','selectPdt');
            },function(){
                $(this).attr('class','');
            })
            // 热卖男鞋
            $.ajax({
                url:'json/manhotshot.json',
                type:'GET',
                async:false,
                success:function(res){
                    for(var i = 0;i < res.length;i++){
                        $(`<div><a href=""><img src=${res[i].img} alt=""><p>${res[i].title}</p><span>${res[i].price}</span></a></div>`).appendTo($('#manshot'));
                    }
                },
                error:function(msg){
                    alert(msg);
                }
            })
            // 热卖女鞋
            $.ajax({
                url:'json/girlhotshot.json',
                type:'GET',
                async:false,
                success:function(res){
                    for(var i = 0;i < res.length;i++){
                        $(`<div><a href=""><img src=${res[i].img} alt=""><p>${res[i].title}</p><span>${res[i].price}</span></a></div>`).appendTo($('#famaleshot'));
                    }
                },
                error:function(msg){
                    alert(msg);
                }
            })
            // 热卖衣服
            $.ajax({
                url:'json/hotclothes.json',
                type:'GET',
                async:false,
                success:function(res){
                    for(var i = 0;i < res.length;i++){
                        $(`<div><a href=""><img src=${res[i].img} alt=""><p>${res[i].title}</p><span>${res[i].price}</span></a></div>`).appendTo($('#clothes'));
                    }
                },
                error:function(msg){
                    alert(msg);
                }
            })
            // 热卖配饰
            $.ajax({
                url:'json/hotbag.json',
                type:'GET',
                async:false,
                success:function(res){
                    for(var i = 0;i < res.length;i++){
                        $(`<div><a href=""><img src=${res[i].img} alt=""><p>${res[i].title}</p><span>${res[i].price}</span></a></div>`).appendTo($('#bag'));
                    }
                },
                error:function(msg){
                    alert(msg);
                }
            })
            // 新品数据
            $.ajax({
                url:'json/newPdts.json',
                type:'GET',
                async:false,
                success:function(res){
                    for(var i = 0;i < res.length;i++){
                        $(`<div><a href=""><img src=${res[i].img} alt=""><p>${res[i].title}</p><span>${res[i].price}</span></a></div>`).appendTo($('#newbox'));
                    }
                },
                error:function(msg){
                    alert(msg);
                }
            })
            // 导航栏男 数据
            $.ajax({
                url:'json/navman.json',
                type:'GET',
                async:false,
                success:function(res){
                    for(var i = 0;i < res.length;i++){
                        $(`<div><a href=""><img src=${res[i].img} alt=""><p>${res[i].title}</p></a></div>`).appendTo($('#manbox'));
                    }
                },
                error:function(msg){
                    alert(msg);
                }
            })
            // 导航栏女 数据
            $.ajax({
                url:'json/navwoman.json',
                type:'GET',
                async:false,
                success:function(res){
                    for(var i = 0;i < res.length;i++){
                        $(`<div><a href=""><img src=${res[i].img} alt=""><p>${res[i].title}</p></a></div>`).appendTo($('#womanbox'));
                    }
                },
                error:function(msg){
                    alert(msg);
                }
            })
            // 导航栏儿童 数据
            $.ajax({
                url:'json/navchild.json',
                type:'GET',
                async:false,
                success:function(res){
                    for(var i = 0;i < res.length;i++){
                        $(`<div><a href=""><img src=${res[i].img} alt=""><p>${res[i].title}</p></a></div>`).appendTo($('#childbox'));
                    }
                },
                error:function(msg){
                    alert(msg);
                }
            })
            // 导航栏 hover事件
            $('nav ul').on('mouseenter','li',function(){
                var x =$(this).index();
                $('.categorybox').eq(x).css('display','block')
            })
            $('nav ul').on('mouseleave','li',function(){
                var x =$(this).index();
                $('.categorybox').eq(x).css('display','none')
            })
            $('nav').on('mouseenter','.categorybox',function(){

                $(this).css('display','block')
            })
            $('nav').on('mouseleave','.categorybox',function(){

                $(this).css('display','none')
            })
            // 注册验证
            // 手机号验证
            $('#mobileNum input').blur(function(){
                var x = $.trim($('#mobileNum input').val());
                $('#mobileNum input').val(x);
                x = parseInt(x);
                if(!/^1[34578]\d{9}$/.test(x)){
                    $('#mobileNum input').css('border-color','red');
                    $('#mobileNum span').html('请输入正确的手机号');
                    $('#mobileNum span').css('color','red');
                }else{
                    $('#mobileNum span').html(' ');
                    $('#mobileNum input').css('border-color','#989898');
                }
            })
            // 邮箱验证
            $('#email input').blur(function(){
                var x = $.trim($('#email input').val());
                $('#email input').val(x);
                if(!/\w+[@]{1}\w+[.]\w+/.test(x)){
                    $('#email input').css('border-color','red');
                    $('#email span').html('请输入正确的邮箱');
                    $('#email span').css('color','red');
                }else{
                    $('#email span').html(' ');
                    $('#email input').css('border-color','#989898');
                }
            })
            // 密码验证
            $('#regPwd input').blur(function(){
                var x = $.trim($('#regPwd input').val());
                $('#regPwd input').val(x);
                if(!/^\w{6,16}$/.test(x)){
                    $('#regPwd input').css('border-color','red');
                    $('#regPwd span').html('请输入正确的密码');
                    $('#regPwd span').css('color','red');
                }else{
                    $('#regPwd span').html(' ');
                    $('#regPwd input').css('border-color','#989898');
                }
            })
            // 确认密码验证
            $('#surePwd input').blur(function(){
                var x = $.trim($('#surePwd input').val());
                $('#surePwd input').val(x);
                var pwd = $('#regPwd input').val();
                if(x != pwd){
                    $('#surePwd input').css('border-color','red');
                    $('#surePwd span').html('两次密码不一致');
                    $('#surePwd span').css('color','red');
                }else{
                    $('#surePwd span').html(' ');
                    $('#surePwd input').css('border-color','#989898');
                }
            })
            // 注册验证码验证
            $('#regCheckBox input').blur(function(){
                var code = $.trim($('#regCheckBox input').val());
                $('#regCheckBox input').val(code);
                var checkCode = $('#regCheckcode').text();

                checkCode = checkCode.toLowerCase();
                if(code.toLowerCase() != checkCode){
                    $('#regCheck input').css('border-color','red');
                    $('#regCheck div span').html('验证码有误');
                    $('#regCheck div span').css('color','red');
                }else{
                    $('#regCheck div span').html(' ');
                    $('#regCheckBox input').css('border-color','#989898');
                }
            })
            // 登陆验证码验证
            $('#checkcode').blur(function(){
                var code = $.trim($('#checkcode').val());
                $('#checkcode').val(code);
                var checkCode = $('#checkbox').text().toLowerCase();
                if(code.toLowerCase() != checkCode){
                    $('#checkcode').css('border-color','red');
                    $('#checkerror').html('验证码有误');
                    $('#checkerror').css('color','red');
                }else{
                    $('#checkerror').html('');
                    $('#checkcode').css('border-color','#989898');
                }
            })
            // 获取短信验证码
            $('#getMobileCheck').click(function(){
                console.log(numCode(4));
            })
            // 登陆用户名验证
            $('#username').blur(function(){
                var username = $.trim($('#username').val());
                $('#username').val(username);
                if(!/\w+[@]{1}\w+[.]\w+/.test(username)&&!/^1[34578]\d{9}$/.test(username)){
                    $('#username').css('border-color','red');
                    alert('请输入正确的用户名!');
                }else{
                    $('#username').css('border-color','#989898');
                }
            })
            // 登陆注册数据库连接
            $('#goReg').click(function(){
                var str = `phonenum=${$('#mobileNum input').val()}&email=${$('#email input').val()}&sex=${$('#sexBox .checked').parent().text()}&password=${$('#regPwd input').val()}`;
                alert(str);
                $.ajax({
                    url:'login.php?type=register',
                    type:'post',
                    data:str,
                    success:function(data){
                        alert(data);
                    },error(msg){
                        alert(msg);
                    }
                })
            })
            $('#sure').click(function(){
                if(/\w+[@]{1}\w+[.]\w+/.test($('#username').val())){
                    var str = `email=${$('#username').val()}&phonenum=${''}&password=${$('#password').val()}`
                }else{
                    var str = `phonenum=${$('#username').val()}&email=${''}&password=${$('#password').val()}`
                }
                // alert(str);
                $.ajax({
                    url:'login.php?type=login',
                    type:'post',
                    data:str,
                    success:function(data){
                        alert(data);
                    },error:function(msg){
                        alert(msg);
                    }
                })
            })
        //主函数结束
        })
        }
        // 登陆注册搜索下拉函数
        function pullDown(node1,node2){
            $(node1).click(function(){
                var oTop = $(node2).position().top;
                if(oTop < 80){
                    $("#pull_down").find('.outBox').css('display','none');
                    $(node2).stop().animate({top:80},500).css('display','block').animate({opacity:1},500);
                    $('nav').stop().animate({top:$(node2).innerHeight()+80},500)
                }else{
                    $(node2).stop().animate({opacity:0},500).animate({top:-$(node2).height()},500).css('display','none');
                    $('nav').stop().animate({top:80},500);
                }
            })
        }
        // 随机验证码函数
        function textCode(n){
            var arr = [];
            for(i = 0;i < n;i++){
                var num = parseInt(Math.random() * 100);
                if(num >= 0 && num <= 9){
                    arr.push(num);
                }else if(num >=65 && num <= 90){
                    var str = String.fromCharCode(num);
                    arr.push(str);
                }else if(num >= 17 && num <= 42){
                    var str = String.fromCharCode(num + 80);
                    arr.push(str);
                }else{
                    i--;
                }
            }
            return arr.join("");
        }
        function numCode(n){
            var arr = [];
            for(i = 0;i < n;i++){
                var num = parseInt(Math.random()*10);
                arr.push(num);
            }
            return arr.join('');
        }
    return {
        main : main
    }
})
