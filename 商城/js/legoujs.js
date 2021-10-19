// 购物车加减数量的函数
function cartNum(obj){
    // 购物车产品的数量加减
    obj.find('.fy-pro-num-minus').click(function(){
        //点击的时候获取值，并且减1
        var val = $(this).next().val() - 1;
        // 如果值小于等于1，那么减按钮就不可用
        if(val <= 1){
            $(this).prop('disabled',true);
        }
        //再把值赋给input控件
        $(this).next().val(val);
        if($(this).next().next().prop('disabled')){
            $(this).next().next().prop('disabled',false);
        }
       
    })
    obj.find('.fy-pro-num-add').click(function(){
        var val = +$(this).prev().val() + 1;
        if(val >= 10){
            $(this).prop('disabled',true);
        }
        $(this).prev().val(val);
        if($(this).prev().prev().prop('disabled')){
            $(this).prev().prev().prop('disabled',false);
        }
        
    })
}