// 课程的详情的打开和关闭
// 首页课程详情
function show(obj){
    obj.style.display = 'block';
 }
 function hide(obj){
    obj.style.display = 'none';
 }
(function () {
    var oCourseWraper = document.getElementById('coursetitle');
    var oBtn = oCourseWraper.getElementsByClassName('fy-button');
    var oCourseInfoWraper = document.getElementById('courseInfoWraper');
    var oCourseInfo = oCourseInfoWraper.getElementsByClassName('fy-course-wraper');
    var oBtnClose = oCourseInfoWraper.getElementsByClassName('fy-course-close');
    var oBtnListen = oCourseInfoWraper.getElementsByClassName('fy-course-button');
    var oListenMask = document.getElementById('listenMask');
    // 初始化
    var len = oBtn.length;
    var num = 0;
     
    hide(oCourseInfoWraper);
    for (var i = 0; i < len; i++) {
        hide(oCourseInfo[i]);
    }
    console.log(len);

    // 多个按钮做同一件事情
    for (var i = 0; i < len; i++) {
        oBtn[i].index = i;
        // 点击按钮打开对应的面板
        oBtn[i].onclick = function () {
            num = this.index;
            console.log(num);

            show(oCourseInfoWraper);
            show(oCourseInfo[num]);
            return false;
        }
        // 点击关闭按钮，关闭对应的面板
        oBtnClose[i].onclick = function () {
            hide(oCourseInfoWraper);
            hide(urseInfo[num]);
        }

    }
    for (var i = 0; i < oBtnListen.length; i++) {
        oBtnListen[i].onclick=function(){
            show(oListenMask);
        }
        
    }

})();

tab('artcourse','onmouseover');




