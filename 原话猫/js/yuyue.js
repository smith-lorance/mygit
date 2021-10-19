// 预约试听

var oListen = document.getElementById('listenButton');
var oMask = document.getElementById('listenMask');
var oCloseButton = document.getElementById('btnClose');

oListen.onclick = function(){
    oMask.style.display = 'block';
}
oCloseButton.onclick = function(){
    oMask.style.display = 'none';
}