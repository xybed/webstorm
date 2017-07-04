/**
 * Created by Administrator on 2017/3/15.
 */
/*
无缝滚动js
 */
// window.onload = function () {
//     var area = document.getElementById('moocBox');
//     var con1 = document.getElementById('con1');
//     var con2 = document.getElementById('con2');
//     con2.innerHTML = con1.innerHTML;
//     area.scrollTop = 0;
//
//     function inc() {
//         if(area.scrollTop >= con1.offsetHeight){
//             area.scrollTop = 0;
//         }else {
//             area.scrollTop++;
//         }
//     }
//     var myScroll = setInterval(inc, 50);
//
//     area.onmouseover = function () {
//         clearInterval(myScroll);
//     }
//     area.onmouseout = function () {
//         myScroll = setInterval(inc, 50);
//     }
// };


/*
间歇性滚动js
 */
window.onload = function () {
    var area = document.getElementById('moocBox');
    area.innerHTML += area.innerHTML;
    var speed = 50;
    var delay = 1000;
    var lineHeight = 24;
    var myScroll;
    
    function startMove() {
        area.scrollTop++;
        myScroll = setInterval(inc, speed);
    }

    function inc() {
        if(area.scrollTop % lineHeight == 0){
            clearInterval(myScroll);
            setTimeout(startMove, delay);
        }else{
            area.scrollTop++;
            if(area.scrollTop >= area.scrollHeight/2){
                area.scrollTop = 0;
            }
        }
    }

    setTimeout(startMove, delay);
}