define(["jquery",'jquery-cookie'],function(){
    function goodsmsg(){
        $(function(){
            // 点击预览图事件
            $('.preview a').click(function(ev){
                ev.preventDefault();
                var x = $(this).index();
                $('.zoomPad').find('img').css('display','none');
                $('.zoomPad').find('img').eq(x).css('display','block');
                $('.zoomWindow').find('img').css('display','none');
                $('.zoomWindow').find('img').eq(x).css('display','block');
            })
            // 放大镜
            $('.zoomPad').mouseover(function(ev){
                var x = ev.pageX-$(this).offset().left;
                var y = ev.pageY-$(this).offset().top;
                $('.zoomPup').css('display','block');
                $('.zoomPup').css('top',`${y}px`);
                $('.zoomPup').css('left',`${x}px`);
                if($('.zoomPup').position().left <= 28){
                    $('.zoomPup').css('left','28px');
                };if($('.zoomPup').position().top <=71){
                    $('.zoomPup').css('top','71px');
                };if($('.zoomPup').position().left >= 422){
                    $('.zoomPup').css('left','422px');
                };if($('.zoomPup').position().top >= 378){
                    $('.zoomPup').css('top','378px');
                }
                $('.zoomWindow').css('display','block')
            })
            $('.zoomPad').mousemove(function(ev){
                var x = ev.pageX-$('.zoomPad').offset().left;
                var y = ev.pageY-$('.zoomPad').offset().top;
                var percentX = ($('.zoomPup').position().left -28) / 450;
                var percentY = ($('.zoomPup').position().top - 71) / 450;
                var plusX = percentX * 1600;
                var plusY = percentY * 1600;
                $('.zoomWindow img').css('top',`-${plusY}px`);
                $('.zoomWindow img').css('left',`-${plusX}px`);
                $('.zoomPup').css('top',`${y}px`);
                $('.zoomPup').css('left',`${x}px`);
                if($('.zoomPup').position().left <= 28){
                    $('.zoomPup').css('left','28px');
                };if($('.zoomPup').position().top <=71){
                    $('.zoomPup').css('top','71px');
                };if($('.zoomPup').position().left >= 422){
                    $('.zoomPup').css('left','422px');
                    $('.zoomWindow img').css('right','0');
                };if($('.zoomPup').position().top >= 378){
                    $('.zoomPup').css('top','378px');
                    $('.zoomWindow img').css('bottom','0');
                };
            })
            $('.zoomPad').mouseout(function(){
                $('.zoomPup').css('display','none');
                $('.zoomWindow').css('display','none')
            })
            // 预览图点击改变边框特效
            $('.preview a').click(function(){
                $('.preview a').attr('class','');
                $(this).attr('class','on');
            })
            // 分享弹出
            $('.share').click(function(){
                if($('.share').height() > 30){
                    $('.share').stop().animate({height:30},500);
                }else{
                    $('.share').stop().animate({height:155},500);
                }
            })
            // 颜色选择
            $('.choosecolor a').click(function(ev){
                ev.preventDefault();
                $('.choosecolor a').attr('class','');
                $(this).attr('class','on');
            })
            // 尺码选择
            $('#sizepull').change(function(){
                $('#showsize').html($(this).find('option:selected').html());
            })
            // 数量选择
            $('#add').click(function(){
                var x = $('#shownum').val();
                x = parseInt(x) + 1;
                $('#shownum').val(x);
            })
            $('#reduce').click(function(){
                var x = $('#shownum').val();
                x = parseInt(x) - 1;
                if(x < 1){
                    x = 1;
                }
                $('#shownum').val(x);
            })
            // 数量验证
            $('#shownum').blur(function(){
                var x = $('#shownum').val();
                x = parseInt(x);
                if(/\D/.test(x)){
                    $('#wrong').css('display','block');
                }else if(!x){
                    $('#wrong').css('display','block');
                }else{
                    $('#wrong').css('display','none');
                }
            })
            // 加入购物车
            $('#addToCart').click(function(ev){
                var size = $('#sizepull option:selected').val();
                var num = parseInt($('#shownum').val());
                var price = parseInt($('#money').text());
                ev.preventDefault();
                if(size == 0){
                    $('#ssize').css('display','block');
                }else{
                    $('#ssize').css('display','none');
                    var id = $('.choosecolor').find('.on').attr('id');
                    var first = $.cookie("goods") == null ? true : false;
        			if(first){
        				$.cookie('goods', JSON.stringify([{id:id,num:num,size:size,price:price}]), {expires: 7,raw:true});
        			}else{
                        var str = $.cookie('goods');
        				var arr = eval(str);
        				var same = false; //假设没有相同的数据
        				for(var i = 0; i < arr.length; i++){
        					if(arr[i].id == id && arr[i].size == size){
        						//之前添加过
        						arr[i].num +=num;
        						var cookieStr = JSON.stringify(arr);
        						$.cookie('goods', cookieStr, {expires: 7,raw:true});
        						same = true;
        						break;
        					}
        				}
                        if(!same){
        					//之前没添加过
                            var id = $('.choosecolor').find('.on').attr('id');
        					var obj = {id: id, num:num,size:size,price:price};
        					arr.push(obj);
        					var cookieStr = JSON.stringify(arr);
        					$.cookie('goods', cookieStr, {expires: 7,raw:true});
        				}
                    }
                    sc_car();
                }
            })
            function sc_car(){
    			var str = $.cookie("goods");
    			if(str){
    				var arr = eval(str);
    				var sum = 0;
    				for(var i = 0; i < arr.length; i++){
    					sum += arr[i].num;
    				}
    				$("#pdtsNum div").text(sum);
    			}
    		}
        })
    }
    return{
        goodsmsg:goodsmsg
    }
})
