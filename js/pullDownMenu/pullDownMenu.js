/**
 * Created by Administrator on 2017/1/12.
 */
window.onload = function () {
    var lis = document.getElementsByClassName('oneLi');

    for(var i=0;i<lis.length;i++){
        bind(i);
    }

    function bind(n) {
        lis[n].addEventListener('mouseover', function () {
            var subMenu = lis[n].getElementsByClassName('twoUl')[0];
            subMenu.style.display = 'block';
        });
        lis[n].addEventListener('mouseout', function () {
            var subMenu = lis[n].getElementsByClassName('twoUl')[0];
            subMenu.style.display = 'none';
        });
    }
};