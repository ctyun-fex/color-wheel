var imageData = require('./pic');

function Color_Wheel(config) {
    this.wraper = config.wraper;
    // 为wraper写定位关系，用以定位鼠标点
    this.wraper.style.position = 'relative';

    this.onChangeColor = config.onChangeColor;

    var canvas_width = this.wraper.clientWidth;
    var canvas_height = this.wraper.clientHeight;

    // 创建舞台canvas
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width = canvas_width || 400;
    this.canvas.height = this.height = canvas_height || 400;
    this.canvas.innerHTML = '浏览器不支持Canvas,请升级或改用其它浏览器！';
    this.ctx = this.canvas.getContext('2d')

    // 插入canvas
    var wrap = this.wraper || document.body;
    wrap.appendChild(this.canvas);



    // 创建点击小圆点
    this.touchPoint = document.createElement('div');
    this.touchPoint.style.width = '16px';
    this.touchPoint.style.height = '16px';
    this.touchPoint.style.backgroundColor = '#fff';
    this.touchPoint.style.position = 'absolute';
    this.touchPoint.style.zIndex = 10;
    this.touchPoint.style.left = '0';
    this.touchPoint.style.top = '0';
    this.touchPoint.style.borderRadius = '100%';
    this.touchPoint.style.border = '1px solid #ccc';
    this.touchPoint.style.visibility = 'hidden';
    this.touchPoint.style.pointerEvents = 'none';    
    this.touchPoint.style.opacity = '0.8';    
    wrap.appendChild(this.touchPoint);


    // 绘制色盘
    this.drawCle();


    this.devicePixelRatio = window.devicePixelRatio || 1;

    // 绑定事件
    this.bindEvent();




}

// 填充色盘图片
Color_Wheel.prototype.drawCle = function () {
    var img = new Image();
    img.src = imageData;

    img.onload = () => {
        this.ctx.drawImage(img, 0, 0, this.width, this.height);
    }

}




Color_Wheel.prototype.bindEvent = function () {
    var self = this;
    this.canvas.addEventListener("touchstart", function (e) {
        e.preventDefault(); // 某些android 的 touchmove不宜触发 所以增加此行代码

        // 点击是否在有效区（圆内部）
        var bePosValid = self.bePosValid(e) || false;
        if (!bePosValid) {
            // 在有效区外
            // console.log('有效区外')
            return;
        }

        self.validHandler(e);
    }, false);
    this.canvas.addEventListener("touchmove", function (e) {
        // 点击是否在有效区（圆内部）
        var bePosValid = self.bePosValid(e) || false;

        if (!bePosValid) {
            // 在有效区外
            // console.log('有效区外')
            return;
        }

        self.validHandler(e);
    }, false);
    this.canvas.addEventListener("touchend", function (e) {
        self.validHandler(e);
    }, false);
}

// 是否在有效区内部
Color_Wheel.prototype.bePosValid = function (e) {
    var self = this;

    // 圆心坐标
    var cirCenter = {
        x: self.width / 2,
        y: self.height / 2
    };

    // 触摸坐标
    var touchXY = self.getTouchXY(e);

    // 与圆心的距离
    var distance = Math.sqrt(Math.pow(touchXY.x - cirCenter.x, 2) + Math.pow(touchXY.y - cirCenter.y, 2));

    // 缩小有效区（修正）
    return distance < (self.width / 2 - 5);
}


// 在有效区内的操作
Color_Wheel.prototype.validHandler = function (e) {
    var self = this;

    // 向外传递的色值
    var color = "#000";

    // 根据触摸事件向外传递status
    var status = 'unknown';

    switch (e.type) {
        case "touchstart":
            status = 'touchstart'
            color = self.getPosColor(e);
            self.color = color;
            self.movePoint(self.getTouchXY(e));
            break;
        case "touchend":
            status = 'confirm'
            break;
        case "touchmove":
            status = 'touchmove';
            color = self.getPosColor(e);
            self.color = color;
            self.movePoint(self.getTouchXY(e));
            break;
    }

    // 向外传递点击信息
    self.onChangeColor({
        color: self.color,
        status: status
    });
}


// 移动触摸点位置
Color_Wheel.prototype.movePoint = function (pos) {
    var self = this;
    var pointStyle = self.touchPoint.style;
    if (pointStyle.visibility === 'hidden') {
        pointStyle.visibility = 'visible';
    }

    var moveX = (pos.x - self.touchPoint.clientWidth / 2) + 'px';
    var moveY = (pos.y - self.touchPoint.clientHeight / 2) + 'px';

    pointStyle.transform = 'translate3d(' + moveX + ', ' + moveY + ',0)';
}


// 获取触碰位置的颜色hex
Color_Wheel.prototype.getPosColor = function (e) {
    var self = this;
    var po = self.getPosition(e);
    var c = self.ctx.getImageData(po.x, po.y, 1, 1).data;
    var red = c[0];
    var green = c[1];
    var blue = c[2];
    return Color.rgb(red, green, blue).hex();
}

// 获取canvas上触摸的坐标
Color_Wheel.prototype.getTouchXY = function (e) {
    var self = this;

    // touch的坐标
    var pageX = e.touches[0].clientX;
    var pageY = e.touches[0].clientY;

    // canvas的坐标系统
    var box = self.canvas.getBoundingClientRect();
    // canvas内坐标
    var touchX = pageX - box.left;
    var touchY = pageY - box.top;

    // console.log(touchX + '--' + touchY);

    return {
        x: touchX,
        y: touchY
    };



}



// 获取touch点相对于canvas的坐标
Color_Wheel.prototype.getPosition = function (e) {
    var rect = e.currentTarget.getBoundingClientRect();

    var po = {
        x: (e.touches[0].clientX - rect.left),
        y: (e.touches[0].clientY - rect.top)
    };
    return po;
}


// 设置颜色
Color_Wheel.prototype.setColor = function (color) {
    // 目前未实现根据颜色定位，所以统一为重置触摸点
    if(color){
        this.touchPoint.style.visibility = 'hidden';
    }

}



module.exports = Color_Wheel;