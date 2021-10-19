$(function(){
    var floor = {
        toFloor:function(){
            // 生成html结构
            $(`<div class="fy-floor">
            <ul class="fy-floor-ul">
                <li class="fy-floor-li">
                    <span class="fy-floor-icon"></span>
                    <span class="fy-floor-cate">图书</span>
                </li>
                <li class="fy-floor-li">
                    <span class="fy-floor-icon"></span>
                    <span class="fy-floor-cate">服装</span>
                </li>
                <li class="fy-floor-li">
                    <span class="fy-floor-icon"></span>
                    <span class="fy-floor-cate">户外</span>
                </li>
                <li class="fy-floor-li">
                    <span class="fy-floor-icon"></span>
                    <span class="fy-floor-cate">童装</span>
                </li>
                <li class="fy-floor-li">
                    <span class="fy-floor-icon"></span>
                    <span class="fy-floor-cate">家居</span>
                </li>
            </ul>
        </div>`).appendTo($('body'));
            // 点击楼层到对应的位置

            $('.fy-floor-li').on('click',function(){
                var index = $(this).index();
                // 对应的楼层的class名称是fy-floor-section
                var distance = $('.fy-floor-section').eq(index).offset().top;
                console.log(distance);
                $('html,body').stop().animate({
                    // 因为有固定的顶部搜索栏50px的高度
                    scrollTop:distance - 50
                },1000)
            })

        }

    }
    window.floor = floor;
})