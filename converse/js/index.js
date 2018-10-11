define(["jquery",'jquery-cookie'],function($){
    function main(){
        $(function(){
            pullDown('#login_1',"#login_box");
            pullDown('#login_2',"#login_box");
            pullDown('#register','#register_box');
            pullDown('#search','#search_box');
            // 给生日下拉框添加年份
            for(var i = 2018;i >= 1918;i--){
                var $node = $('<option value = '+i+'>'+i+'</option>');
                $('#birthYears').append($node);
            }
            var oYear = null;
            $('#birthYears').change(function(){
                $('.selectYear').html($(this).find('option:selected').val());
                oYear = $(this).find('option:selected').val();
            })
            // 给生日下拉框添加月份
            var oMonth = null;
            var oDay = null;
            for(var i = 1;i <= 12;i++){
                var $node = $('<option value = '+i+'>'+i+'</option>');
                $('#birthMonths').append($node);
            }
            $('#birthMonths').change(function(){
                $('.selectMonth').html($(this).find('option:selected').val());
                oMonth = $(this).find('option:selected').val();
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
                    if((oYear%4==0 && oYear%100!=0) || oYear%400==0){
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
            $('#male').click(function(){
                $('#sexBox').find('div').attr('class','');
                $(this).find('div').attr('class','checked');
            })
            $('#female').click(function(){
                $('#sexBox').find('div').attr('class','');
                $(this).find('div').attr('class','checked');
            })
        })
        }
        function pullDown(node1,node2){
            $(node1).click(function(){
                var oTop = $(node2).position().top;
                if(oTop < 80){
                    $("#pull_down").find('div').css('display','none')
                    $(node2).css('display','block').stop().animate({top:80},500).animate({opacity:1},500);
                    $('nav').stop().animate({top:$(node2).height()+80},500)
                }else{
                    $(node2).stop().animate({opacity:0},500).animate({top:-$(node2).height()},500).css('display','none');
                    $('nav').stop().animate({top:80},500);
                }
            })
        }
    return {
        main : main
    }
})
