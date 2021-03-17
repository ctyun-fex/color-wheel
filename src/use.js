var Color_Wheel = require('../dist/color');
// var Color_Wheel = require('./color');

var colorWheel = new Color_Wheel({
    wraper:document.getElementById('stage'),
    onChangeColor: (changeInfo)=>{
        // 返回一个信息对象
        // changeInfo = {
        //     color: 16位色值
        //     status: 色值变化状态 （touchStart | touchMove | confirm<此值表示手势离开，确认色值>）
        // }

        document.getElementById('ft').style.backgroundColor = changeInfo.color;
        if(changeInfo.status === "confirm"){
            document.getElementById('submit').style.backgroundColor = changeInfo.color;            
        }
    }
});

// 实例化后调用此方法初始颜色
colorWheel.setColor('#efe');

setTimeout(() => {
    // 重置颜色
    colorWheel.setColor('#ffffff');
}, 3000);


