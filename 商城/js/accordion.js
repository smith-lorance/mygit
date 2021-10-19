$(function(){
    $('.fy-top-li').hover(function(){
        // 先把所有的标题都显示
        $('.fy-top-h4').removeClass('none');
        // 把所有的内容都隐藏
        $('.fy-top-info').addClass('none');
        // 标题隐藏
        $(this).find('.fy-top-h4').toggleClass('none');
        // 内容显示
        $(this).find('.fy-top-info').toggleClass('none');
    })
})