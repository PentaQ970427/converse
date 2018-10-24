define(["jquery",'jquery-cookie'],function(){
    function shopcart(){
        $(function(){
            var cookie_arr = eval($.cookie('goods'));
            if(!$.cookie('goods')){
                $('.empty').css('display','block');
                $('#have').css('display','none');
            }else{
                $('.empty').css('display','none');
                $('#have').css('display','block');
                for(var i = 0;i < cookie_arr.length;i++){
                    var num = cookie_arr[i].num;
                    var price = cookie_arr[i].price;
                    var totalprice = num * price;
                    $(`<div class="listchild">
                        <div class='childtitle'>
                            <div class="nocheck"></div>
                            <div class="delete">删除</div>
                        </div>
                        <div class="childcontent">
                            <div class="pdtimg">
                                <img src="images/shopcart/goodpic.png" alt="">
                            </div>
                            <div class="pdtmsg">
                                <h4><a href="goodsmsg.html">【男女同款】Chuck Taylor All Star Core 常青款</a></h4>
                                <p>型号:101013600</p>
                                <p>颜色: <span class="color">${cookie_arr[i].id}</span></p>
                                <p>尺码: <span  class="size">${cookie_arr[i].size}</span></p>
                            </div>
                            <div class="totalprice">
                                <p>￥<span>${totalprice}</span>.00</p>
                                <div class="numOperate">
                                    <label>数量</label>
                                    <div class="add-reduce">
                                        <div class="add"></div>
                                        <div class="Num">${cookie_arr[i].num}</div>
                                        <div class="reduce"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`).appendTo('.shopcartlist')
                }
            }
        })
    }
    return {
        shopcart:shopcart
    }
})
