# 色盘组件 DOM版
## 使用方法
功能： 实例化； 重置颜色

1. 安装 `npm i @fe/colorWheel`
2. 使用
        var Color_Wheel = require('../dist/color');

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




## 开发
. 调整 src/use.js 中 组件引用

        // var Color_Wheel = require('../dist/color');
        // var Color_Wheel = require('./color');

. 发布

1. 打包 npm run build
2. 修改 src/use.js 测试dist文件效果
3. 发布 np工具发布

## 注意点
dist内的图片要手动添加进去