$(function () {
    var scrollTop = {
        toScrollTop: function () {
            // 创建元素
            $(`<div class="fy-scrollTop">
            <i class="iconfont icon-top"></i>
        </div>`).appendTo($('body'));

            //显示和隐藏元素
            $(window).on('scroll', function () {
                var scrollTop = $(this).scrollTop();
                if (scrollTop >= 300) {
                    $('.fy-scrollTop').fadeIn(600);
                } else {
                    $('.fy-scrollTop').fadeOut(600);
                }
            })
            // 元素点击的时候返回顶部
            $('.fy-scrollTop').click(function () {
                $('html,body').animate({
                    scrollTop: 0
                }, 1000)
            })
        }
    }
    // 最简单的把函数内部的属性赋值给全局的变量
    window.scrollTop = scrollTop;
})