define(["jquery",'jquery-cookie'],function($){
    function goods(){
        $(function(){
            // 筛选条件展开事件
            $('.conditions dl').on('click','dt',function(){
                if($(this).parent().innerHeight() > 48){
                    $(this).parent().attr('class','');
                }else{
                    $('.conditions dl').attr('class','');
                    $(this).parent().attr('class','unfold');
                }
            })
            //排序按钮点击事件
            $('.sorting a').click(function(ev){
                ev.preventDefault();
                $('.sorting a').attr('class','');
                $(this).attr('class','pitch');
            })
            // 商品列表商品引入
            $.ajax({
                url:'json/goodslist.json',
                type:'GET',
                async:false,
                success:function(res){
                    for(var i = 0;i < res.length;i++){
                        $(`<div class ='shots'><a href = ''><img src = ${res[i].img}><p>${res[i].title}</p><span>${res[i].price}</span></a></div>`).appendTo('.allpdts')
                    }
                },error:function(msg){
                    console.log(msg);
                }
            })
            // 商品hover特效
            $('.shots').hover(function(){
                $(this).css('padding-top','5px');
            },function(){
                $(this).css('padding-top','0');
            })
            //
        })
    }
    return{
        goods:goods
    }
})
