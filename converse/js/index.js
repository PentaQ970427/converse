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
                        $(`<div><img src=${res[i].img} alt=""></div>`).appendTo($('#bannerPic'));
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
            aLis.click(function(ev){
                iNow = $(this).index();
                ev.preventDefault();
            })
            timer = setInterval(function(){
                iNow++;
                console.log(iNow);
                aLis.attr('class','').eq(iNow).attr('class','select');
                if(iNow == aLis.size()-1){
                    aLis.eq(0).attr('class','select');
                    iNow ==0;
                }
                aBs.eq(iNow-1).stop().animate({opacity:0},1000);
                aBs.eq(iNow).stop().animate({opacity:1},1000,function(){
                    if(iNow == aBs.size()-1){
                        aBs.eq(iNow).css('opacity','0');
                        aBs.eq(0).stop().animate({opacity:1},1000);
                        iNow = 0;
                    }
                })
            },2000)
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
    return {
        main : main
    }
})
