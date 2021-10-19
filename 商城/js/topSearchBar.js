$(function(){
    var topSearchBar = {
        // 创建html结构
        toggleSearchBar:function(){
            $(`<div class="fy-topSearchBar w100">
            <div class="fy-topSearchBar-wrapper w1200 hidden">
                <div class="fy-topSearchBar-logo fl">
                    <a href="index.html"><img src="images/toplogo.png" alt="乐购"></a>
                </div>
                <div class="fy-header-search-form hidden fl">
                    <form action="#" method="get" name="search">
                        <div class="fl">
                            <input type="text" name="keywords" id="fy-hs-keywords-input" placeholder="输入商品名称" autocomplete="off" class="fy-input">
                        </div>
                        <div class="fl">
                            <button type="submit" class="fy-button fy-hs-search-btn"><i class="iconfont icon-sousuo"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>`).appendTo($('body'));
        // 检测滚动条的高度
        $(window).on('scroll' , function(){
            var distance = $(this).scrollTop();
            // 如果滚动条高度大于等于300，则搜索条滑下
            // 如果滚动条高度小于300，则搜索条滑上
            // console.log(distance);
            if(distance >= 300){
                $('.fy-topSearchBar').slideDown();
            }else{
                $('.fy-topSearchBar').slideUp();
            }
        })
        }

    }
    window.topSearchBar = topSearchBar;
})