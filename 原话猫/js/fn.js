function show(obj){
    obj.style.display = 'block';
 }
 function hide(obj){
    obj.style.display = 'none';
 }

 // 选项卡切换
function tab(id, ev) {
    var oTab = document.getElementById(id);
    var oTabTitle = oTab.getElementsByClassName('tabtitle');
    var oTabContent = oTab.getElementsByClassName('tabcontent');

    // 初始化
    var num = 0;
    var len = oTabTitle.length;

    // 判断ev形参参数是否有值传过来
    if (ev === undefined) {
        ev = 'onmouseover';
    }
    tabChange();




    // 鼠标经过 菜单切换
    for (var i = 0; i < len; i++) {
        oTabTitle[i].index = i;
        oTabTitle[i][ev] = function () {
            num = this.index;
            tabChange();
        }
    }
    // 切换的函数封装
    function tabChange() {
        for (var i = 0; i < len; i++) {
            oTabTitle[i].classList.remove('active');
            hide(oTabContent[i]);
        }
        oTabTitle[num].classList.add('active');
        show(oTabContent[num]);
    }
}

// 切换幻灯动画


function moveBanner(id, dWidth, navId) {
    var oPWraper = document.getElementById(id);
    var oUl = oPWraper.getElementsByClassName('ulBox')[0];
    var oLis = oUl.getElementsByTagName('li');
    var oL = oPWraper.getElementsByClassName('btnLeft')[0];
    var oR = oPWraper.getElementsByClassName('btnRight')[0];
    // 判断是否有小圆点
    if (navId !== undefined) {
        var oNavUl = document.getElementById(navId);
        var oNavLis = oNavUl.getElementsByTagName('li');
    }


    // 初始化
    var len = oLis.length;
    var num = 0;
    var tWidth = len * dWidth;
    oUl.style.cssText = 'position:relative;width:' + tWidth + 'px;left:0px';
    // 点击下一张
    oR.onclick = function () {
        num++;
        // 当num等于长度的时候，num回到起点，在回到起点的时候没有滑动动画
        if (num == len) {
            num = 0;
            oUl.style.transition = '0s';
        } else {
            oUl.style.transition = '0.2s';
        }
        oUl.style.left = -num * dWidth + 'px';
        if (navId !== undefined) {
            for (var i = 0; i < len; i++) {
                oNavLis[i].classList.remove('active');
            }
            oNavLis[num].classList.add('active');
        }

    }
    // 点击上一张
    oL.onclick = function () {
        num--;
        // 当num等于-1的时候，num回到最后一张，这时候没有滑动动画
        if (num == -1) {
            num = len - 1;
            oUl.style.transition = '0s';
        } else {
            oUl.style.transition = '0.2s';
        }
        oUl.style.left = -num * dWidth + 'px';
        if (navId !== undefined) {
            for (var i = 0; i < len; i++) {
                oNavLis[i].classList.remove('active');
            }
            oNavLis[num].classList.add('active');
        }
    }

    if (navId !== undefined) {
        for (var i = 0; i < len; i++) {
            oNavLis[i].index = i;
            oNavLis[i].onclick = function () {
                num = this.index;         
                oUl.style.transition = '0.2s';       
                oUl.style.left = -num * dWidth + 'px';
                for (var i = 0; i < len; i++) {
                    oNavLis[i].classList.remove('active');
                }
                oNavLis[num].classList.add('active');

            }
        }
    }
}

// 切换幻灯动画


function moveBanner(id, dWidth, navId) {
    var oPWraper = document.getElementById(id);
    var oUl = oPWraper.getElementsByClassName('ulBox')[0];
    var oLis = oUl.getElementsByTagName('li');
    var oL = oPWraper.getElementsByClassName('btnLeft')[0];
    var oR = oPWraper.getElementsByClassName('btnRight')[0];
    // 判断是否有小圆点
    if (navId !== undefined) {
        var oNavUl = document.getElementById(navId);
        var oNavLis = oNavUl.getElementsByTagName('li');
    }


    // 初始化
    var len = oLis.length;
    var num = 0;
    var tWidth = len * dWidth;
    oUl.style.cssText = 'position:relative;width:' + tWidth + 'px;left:0px';
    // 点击下一张
    oR.onclick = function () {
        num++;
        // 当num等于长度的时候，num回到起点，在回到起点的时候没有滑动动画
        if (num == len) {
            num = 0;
            oUl.style.transition = '0s';
        } else {
            oUl.style.transition = '0.2s';
        }
        oUl.style.left = -num * dWidth + 'px';
        if (navId !== undefined) {
            for (var i = 0; i < len; i++) {
                oNavLis[i].classList.remove('active');
            }
            oNavLis[num].classList.add('active');
        }

    }
    // 点击上一张
    oL.onclick = function () {
        num--;
        // 当num等于-1的时候，num回到最后一张，这时候没有滑动动画
        if (num == -1) {
            num = len - 1;
            oUl.style.transition = '0s';
        } else {
            oUl.style.transition = '0.2s';
        }
        oUl.style.left = -num * dWidth + 'px';
        if (navId !== undefined) {
            for (var i = 0; i < len; i++) {
                oNavLis[i].classList.remove('active');
            }
            oNavLis[num].classList.add('active');
        }
    }

    if (navId !== undefined) {
        for (var i = 0; i < len; i++) {
            oNavLis[i].index = i;
            oNavLis[i].onclick = function () {
                num = this.index;         
                oUl.style.transition = '0.2s';       
                oUl.style.left = -num * dWidth + 'px';
                for (var i = 0; i < len; i++) {
                    oNavLis[i].classList.remove('active');
                }
                oNavLis[num].classList.add('active');

            }
        }
    }
}