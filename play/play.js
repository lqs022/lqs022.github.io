
// 等待页面加载
document.addEventListener("DOMContentLoaded",function()
{
    // 定义行动，返回按钮
    let actButton = document.getElementById('actButton');
    let backButton = document.getElementById('backButton');

    //首格样式
    let mask = document.createElement('div');
    mask.classList.add('mask');
    let cells = document.querySelectorAll('.table .cell');
    cells[0].appendChild(mask);
    setTimeout(() => 
    {
        mask.style.opacity = 1;
    }, 10);
    cells[0].style["background-color"] = "#FF8F8F";
    cells[0].style["color"] = "#D91513";

    // 行动按钮点击事件
    actButton.addEventListener("click",function()
    {
        // 按钮禁用
        document.getElementById("actButton").disabled = true;

        actButtonOnclick().then(res=>
        {
            let text = res;

            // 定义遮罩
            let mask = document.createElement('div');
            mask.classList.add('mask');
            let dice1 = document.createElement('div');
            dice1.classList.add('dice1');
            let dice2 = document.createElement('div');
            dice2.classList.add('dice2');
            let dice3 = document.createElement('div');
            dice3.classList.add('dice3');
            let dice4 = document.createElement('div');
            dice4.classList.add('dice4');
            let dice5 = document.createElement('div');
            dice5.classList.add('dice5');
            let dice6 = document.createElement('div');
            dice6.classList.add('dice6');

            // 查询并移除遮罩
            let maskCells= [];
            let startNum = 0;
            let cells = document.querySelectorAll('.table .cell');
            cells.forEach((cell,i) => 
            {
                if (cell.querySelector('.mask')) 
                {
                    cell.querySelector('.mask').remove();
                    maskCells.push(cells[i]);
                    startNum = i;
                }
            });

            if(startNum==49)
            {
                //已到达终点
                // alert("end");
            }
            else
            {
                //获取随机数
                let num = Math.floor(Math.random()*(6-1+1))+1;
                let dice = dice1;
                if(num==1)
                {
                    dice = dice1;
                }
                else if(num==2)
                {
                    dice = dice2;
                }
                else if(num==3)
                {
                    dice = dice3;
                }
                else if(num==4)
                {
                    dice = dice4;
                }
                else if(num==5)
                {
                    dice = dice5;
                }
                else if(num==6)
                {
                    dice = dice6;
                }                            

                //显示骰子
                let table = document.querySelectorAll('.table');
                table[0].appendChild(dice);
                
                //更改遮罩透明度
                let diceStartOpacity = 0;
                let diceEndOpacity = 1;
                let diceOsteps = 500/16;

                function showDice()
                {
                    if(diceStartOpacity<1) 
                    {
                        //遮罩动画未执行完毕
                        diceStartOpacity = diceStartOpacity+(1/diceOsteps);
                        dice.style.opacity = diceStartOpacity;
                        requestAnimationFrame(showDice);
                    }
                    else
                    {
                        requestAnimationFrame(concealDice);
                    }
                };

                function concealDice()
                {
                    if(diceEndOpacity>0) 
                    {
                        //遮罩动画未执行完毕
                        diceEndOpacity = diceEndOpacity-(1/diceOsteps);
                        dice.style.opacity = diceEndOpacity;
                        requestAnimationFrame(concealDice);
                    }
                    else
                    {
                        table[0].removeChild(dice);
                    }
                };

                showDice();

                // 将遮罩添加到单元格
                for(let i=0;i<num;i++)
                {
                    setTimeout(()=>
                    {
                        // 添加遮罩
                        cells[startNum+i+1].appendChild(mask);

                        //改变单元格样式
                        mask.style.opacity = 1;
                        cells[startNum+i+1].style["background-color"] = "#FF8F8F";
                        cells[startNum+i+1].style["color"] = "#D91513";

                        //更改遮罩透明度
                        let opacity = 0;
                        let steps = 700/16;

                        function addMask()
                        {
                            if (opacity<1) 
                            {
                                //遮罩动画未执行完毕

                                opacity = opacity+(1/steps);
                                mask.style.opacity = opacity;
                                requestAnimationFrame(addMask);
                            }
                            else
                            {
                                //遮罩动画执行完毕

                                mask.style.opacity = 1;

                                /**
                                * 判断循环是否执行完成
                                * 条件1:startNum+i+1==49;  (到达终点)
                                * 条件2:i+1==num;          (前进次数与骰子点数相同)
                                **/

                                if(startNum+i+1==49)
                                {
                                    //到达终点

                                    // 显示文本
                                    overlayText.textContent = "到达终点，由主动指定任意惩罚";
                                    overlay.style.display = "flex";
                                }
                                else if(i+1==num)
                                {
                                    // 前进次数与骰子点数相同

                                    // 显示文本
                                    overlayText.textContent = text;
                                    overlay.style.display = "flex";
                                }
                            }
                        }
        
                        addMask();
                    },i*700)
                }
            }
        });
    })

    // 返回按钮点击事件
    backButton.addEventListener("click",function()
    {
        backButtonOnclick().then(res=>
        {
        });
    })

    // 遮罩点击事件
    overlay.addEventListener("click", function() 
    {
        // 隐藏遮罩
        overlay.style.display = "none";

        // 取消按钮禁用
        document.getElementById("actButton").disabled = false;
    });
});


async function actButtonOnclick()
{
    // 执行掷骰行动逻辑

    let setDatas = localStorage.getItem("spankChessDatas");
    if(setDatas==undefined)
    {
        //初始值
        setDatas = 
        [
            {
                "name":"巴掌",
                "min":20,
                "max":40,
                "ex":false,
                "desc":"",
            },
            {
                "name":"散鞭",
                "min":30,
                "max":50,
                "ex":false,
                "desc":"",
            },
            {
                "name":"木板",
                "min":15,
                "max":30,
                "ex":false,
                "desc":"",
            },
            {
                "name":"猫爪拍",
                "min":15,
                "max":30,
                "ex":false,
                "desc":"",
            },
            {
                "name":"皮拍",
                "min":30,
                "max":60,
                "ex":false,
                "desc":"",
            },
            {
                "name":"亚克力板",
                "min":5,
                "max":15,
                "ex":false,
                "desc":"",
            },
            {
                "name":"木戒尺",
                "min":20,
                "max":40,
                "ex":false,
                "desc":"",
            },
            {
                "name":"小红",
                "min":15,
                "max":30,
                "ex":false,
                "desc":"",
            },
            {
                "name":"皮戒尺",
                "min":20,
                "max":40,
                "ex":false,
                "desc":"",
            },
            {
                "name":"亚克力戒尺",
                "min":10,
                "max":30,
                "ex":false,
                "desc":"",
            },
            {
                "name":"藤条",
                "min":10,
                "max":20,
                "ex":false,
                "desc":"",
            },
            {
                "name":"树脂棍",
                "min":10,
                "max":20,
                "ex":false,
                "desc":"",
            },
            {
                "name":"马鞭",
                "min":30,
                "max":60,
                "ex":false,
                "desc":"",
            },
            {
                "name":"手铐",
                "min":0,
                "max":0,
                "ex":true,
                "desc":"佩戴手铐至游戏结束，若已佩戴手铐则由主动指定任意惩罚",
            },
            {
                "name":"项圈",
                "min":0,
                "max":0,
                "ex":true,
                "desc":"佩戴项圈至游戏结束，若已佩戴项圈则由主动指定任意惩罚",
            },
            {
                "name":"double",
                "min":0,
                "max":0,
                "ex":true,
                "desc":"接下来的2次惩罚数量翻倍",
            },
            {
                "name":"低温蜡烛",
                "min":0,
                "max":0,
                "ex":true,
                "desc":"滴蜡",
            },
            {
                "name":"罚跪",
                "min":0,
                "max":0,
                "ex":true,
                "desc":"罚跪5min",
            }
        ];
    }
    else
    {
        setDatas = JSON.parse(setDatas);
    }

    // 获取随机元素
    let idx = Math.floor(Math.random()*setDatas.length);
    let setData = setDatas[idx];
    let text = "";
    if(setData.ex)
    {
        //附加刑（仅获取描述）
        let desc = setData.desc;
        text = desc;
    }
    else
    {
        //常规惩罚（获取工具名称、上下限，计算出数量后进行拼接）
        let name = setData.name;
        let min = setData.min;
        let max = setData.max;

        // 获取随机数
        let num = Math.floor(Math.random()*(max-min+1)) + min;

        text = "使用"+name+"挨打"+num+"下";
    }
    
    return text
}

async function backButtonOnclick()
{
    // 跳转index页面
    window.location.href = "../index.html";
    return "success"
}
