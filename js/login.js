//验证码
/**Random Number**/
function rn(min,max){
    return Math.floor( Math.random()*(max-min)+min );
}
/**Random Color**/
function rc(min,max){
    var r = rn(min,max);
    var g = rn(min,max);
    var b = rn(min,max);
    return `rgb(${r},${g},${b})`;
}
draw();
c1.onclick = function(){
    draw();
}

/**绘制验证码图片**/
function draw(){
    var ctx = c1.getContext('2d');
    ctx.textBaseline = 'bottom';

    /**绘制背景色**/
    ctx.fillStyle = rc(180,240);
    ctx.fillRect(0,0,c1.width,c1.height);
    /**绘制文字**/
    var str = 'ABCEFGHJKLMNPQRSTWXY3456789';
    for(var i=0; i<5; i++){
        var txt = str[rn(0,str.length)];
        ctx.fillStyle = rc(50,160);
        ctx.font = rn(15,40)+'px SimHei';
        var x = 15+i*20;
        var y = rn(25,45);
        var deg = rn(-45, 45);
        //修改坐标原点和旋转角度
        ctx.translate(x,y);
        ctx.rotate(deg*Math.PI/180);
        ctx.fillText(txt, 0,0);
        //恢复坐标原点和旋转角度
        ctx.rotate(-deg*Math.PI/180);
        ctx.translate(-x,-y);
    }
    /**绘制干扰线**/
    for(var i=0; i<8; i++){
        ctx.strokeStyle = rc(40,180);
        ctx.beginPath();
        ctx.moveTo( rn(0,c1.width), rn(0,c1.height) );
        ctx.lineTo( rn(0,c1.width), rn(0,c1.height) );
        ctx.stroke();
    }
    /**绘制干扰点**/
    for(var i=0; i<100; i++){
        ctx.fillStyle = rc(0,255);
        ctx.beginPath();
        ctx.arc(rn(0,c1.width),rn(0,c1.height), 1, 0, 2*Math.PI);
        ctx.fill();
    }
}
