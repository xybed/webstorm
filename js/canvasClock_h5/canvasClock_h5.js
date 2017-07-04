/**
 * Created by Administrator on 2017/3/19.
 */
window.onload = function () {
    //获得画布
    var canvas = document.getElementById('clock');
    //获得画布上下文，这个对象提供了用于在画布上绘图的方法和属性
    var context = canvas.getContext('2d');

    var width = context.canvas.width;
    var height = context.canvas.height;
    //定义圆的半径
    var r = width / 2;
    //比例，可支持时钟的放大缩小，以200px的画布为例，之后尺寸变化的大小的比例就为rem
    var rem = width / 200;

    function drawBackground() {
        context.save();
        //重新映射画布上的 (0,0) 位置
        context.translate(r, r);
        //开始一条路径，在画路径或图形之前都需要调此方法
        context.beginPath();
        context.lineWidth = 10 * rem;
        //因为重新映射了(0,0)位置，所以这里填(0,0)，最后一个参数false代表顺时针
        context.arc(0, 0, r-context.lineWidth/2, 0, 2*Math.PI, false);
        //绘制确切的路径
        context.stroke();

        var numberHours = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
        numberHours.forEach(function (number, i) {
            //计算每个数值的x、y坐标
            //每个数值之间隔的弧度，总弧度（弧长/半径）为2π
            var rad = 2*Math.PI / 12 * i;
            var x = Math.cos(rad) * (r - 30 * rem);
            var y = Math.sin(rad) * (r - 30 * rem);
            context.font = 16 * rem + 'px Arial';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(number, x, y);
        });

        for(var i=0;i<60;i++){
            //60个点
            var rad = 2*Math.PI / 60 * i;
            var x = Math.cos(rad) * (r - 18 * rem);
            var y = Math.sin(rad) * (r - 18 * rem);
            context.beginPath();
            if(i % 5 == 0){
                context.fillStyle = '#000';//默认也是黑色
                context.arc(x, y, 2 * rem, 0, 2*Math.PI, false);
            }else {
                context.fillStyle = '#ccc';
                context.arc(x, y, 2 * rem, 0, 2*Math.PI, false);
            }
            context.fill();
        }
    }

    function drawHour(hour, minute) {
        /*
         save() 保存当前环境的状态
         restore() 返回之前保存过的路径状态和属性
         因为这里操作了rotate，画布旋转了角度，要保存之前没旋转的环境留以后用
         */
        context.save();
        //要旋转的弧度
        var rad = 2*Math.PI / 12 * hour;
        //分钟引起的时针旋转的弧度
        var mrad = 2*Math.PI / 12 / 60 * minute;
        context.beginPath();
        context.rotate(rad + mrad);
        //设置线条样式，向线条的每个末端添加圆形线帽
        context.lineCap = 'round';
        context.lineWidth = '6' * rem;
        //设置起始点
        context.moveTo(0, 10 * rem);
        //设置终点
        context.lineTo(0, -r/2);
        context.stroke();
        context.restore();
    }

    function drawMinute(minute, second) {
        context.save();
        var rad = 2*Math.PI / 60 * minute;
        var srad = 2*Math.PI / 60 / 60 * second;
        context.beginPath();
        context.rotate(rad + srad);
        context.lineCap = 'round';
        context.lineWidth = '3' * rem;
        context.moveTo(0, 15 * rem);
        context.lineTo(0, -r + 30 * rem);
        context.stroke();
        context.restore();
    }

    function drawSecond(second) {
        context.save();
        var rad = 2*Math.PI / 60 * second;
        context.beginPath();
        context.rotate(rad);
        context.fillStyle = '#c14543';
        context.moveTo(-2 * rem, 20 * rem);
        context.lineTo(2 * rem, 20 * rem);
        context.lineTo(1, -r + 18 * rem);
        context.lineTo(-1, -r + 18 * rem);
        context.fill();
        context.restore();
    }

    function drawDot() {
        context.beginPath();
        context.fillStyle = '#fff';
        context.arc(0, 0, 3 * rem, 0, 2*Math.PI, false);
        context.fill();
    }

    function draw() {
        context.clearRect(0, 0, width, height);
        drawBackground();
        var date = new Date();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        drawHour(hour, minute);
        drawMinute(minute, second);
        drawSecond(second);
        drawDot();
        context.restore();
    }

    setInterval(draw, 1000);
};