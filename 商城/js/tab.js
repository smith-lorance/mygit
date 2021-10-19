$(function(){
    var tab = {
        // 接收一个参数，是选项卡的id选择器
        changeTab:function(obj){

            var oTab = $(obj);
            oTab.find('.fy-tab-li').hover(function(){
                oTab.find('.fy-tab-li').removeClass('active');
                $(this).addClass('active');
                oTab.find('.fy-tab-content').addClass('none');
                oTab.find('.fy-tab-content').eq($(this).index()).removeClass('none');
            })
        }
    }
    window.tab = tab;
})