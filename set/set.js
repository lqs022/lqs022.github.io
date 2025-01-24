
// 等待页面加载
document.addEventListener("DOMContentLoaded",function()
{
    // 定义确认，返回按钮
    let confirmButton = document.getElementById('confirmButton');
    let backButton = document.getElementById('backButton');

    // 确认按钮点击事件
    confirmButton.addEventListener("click",function()
    {
        confirmButtonOnclick().then(res=>
        {
            if(res!="success")
            {
                alert(res);
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

    //填充表格
    setTable().then(res=>
    {
    });
});


async function setTable()
{
    //填充表格
    let table = document.getElementById("table");
    let datas = localStorage.getItem("spankChessDatas");
    if(datas==undefined)
    {
        //初始值
        datas = 
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
        datas = JSON.parse(datas);
    }

    for(let i=0;i<datas.length;i++)
    {
        let tbody = table.getElementsByTagName("tbody")[0];
        if (!tbody)
        {
            tbody = document.createElement("tbody");
            document.getElementById("table").appendChild(tbody);
        }
        let row = tbody.insertRow();
        let rowData = "";

        //工具名称
        let name = datas[i].name;
        rowData = rowData+
        `<td>
            <div class="name">
                <input type="text" name="工具名称" value=${name}>
            </div>
        </td>`;

        //附加刑
        let ex = datas[i].ex;
        if(ex==true)
        {
            rowData = rowData+
            `<td>
                <div class="ex">
                    <input type="radio" name="附加刑${i}" value="是" checked onclick="changeRadio()" /> 是
                    <input type="radio" name="附加刑${i}" value="否" onclick="changeRadio()" /> 否
                </div>
            </td>`;
        }
        else
        {
            rowData = rowData+
            `<td>
                <div class="ex">
                    <input type="radio" name="附加刑${i}" value="是" onclick="changeRadio()" /> 是
                    <input type="radio" name="附加刑${i}" value="否" checked onclick="changeRadio()" /> 否
                </div>
            </td>`;
        }

        //最小数量
        let min = datas[i].min;
        if(ex==true)
        {
            rowData = rowData+
            `<td>
                <div class="min">
                    <input type="number" name="最小数量" min="1" disabled>
                </div>
            </td>`;
        }
        else
        {
            rowData = rowData+
            `<td>
                <div class="min">
                    <input type="number" name="最小数量" min="1" value=${min}>
                </div>
            </td>`;
        }

        //最大数量
        let max = datas[i].max;
        if(ex==true)
        {
            rowData = rowData+
            `<td>
                <div class="max">
                    <input type="number" name="最大数量" min="1" disabled>
                </div>
            </td>`;
        }
        else
        {
            rowData = rowData+
            `<td>
                <div class="max">
                    <input type="number" name="最大数量" min="1" value=${max}>
                </div>
            </td>`;
        }

        //附加内容
        let desc = datas[i].desc;
        if(ex==true)
        {
            rowData = rowData+
            `<td>
                <div class="desc">
                    <input type="text" name="附加内容" value=${desc}>
                </div>
            </td>`;
        }
        else
        {
            rowData = rowData+
            `<td>
                <div class="desc">
                    <input type="text" name="附加内容" value="" disabled>
                </div>
            </td>`;
        }

        //操作
        rowData = rowData+
        `<td>
            <div class="tableButton">
                <button type="button" onclick="addRow()">+ 添加</button>
                <!-- <button type="button" onclick="deleteRow(this)">删除</button> -->
            </div>
        </td>`;

        row.innerHTML = rowData;
    }
}

function addRow()
{
    let table = document.getElementById("table");
    let tbody = table.getElementsByTagName("tbody")[0];
    if (!tbody) 
    {
        tbody = document.createElement("tbody");
        document.getElementById("table").appendChild(tbody);
    }
    let row = tbody.insertRow();
    let rowData = "";

    //工具名称
    rowData = rowData+
    `<td>
        <div class="name">
            <input type="text" name="工具名称" value="">
        </div>
    </td>`;

    //附加刑
    rowData = rowData+
    `<td>
        <div class="ex">
            <input type="radio" name="附加刑${tbody.rows.length+1}" value="是" onclick="changeRadio()" /> 是
            <input type="radio" name="附加刑${tbody.rows.length+1}" value="否" checked onclick="changeRadio()" /> 否
        </div>
    </td>`;

    //最小数量
    rowData = rowData+
    `<td>
        <div class="min">
            <input type="number" name="最小数量" min="1" value="">
        </div>
    </td>`;

    //最大数量
    rowData = rowData+
    `<td>
        <div class="max">
            <input type="number" name="最大数量" min="1" value="">
        </div>
    </td>`;

    //附加内容
    rowData = rowData+
    `<td>
        <div class="desc">
            <input type="text" name="附加内容" value="" disabled>
        </div>
    </td>`;

    //操作
    rowData = rowData+
    `<td>
        <div class="tableButton">
            <button type="button" onclick="addRow(this)">+ 添加</button>
            <!-- <button type="button" onclick="deleteRow(this)">删除</button> -->
        </div>
    </td>`;

    row.innerHTML = rowData;
}

function changeRadio()
{
    let table = document.getElementById("table");
    let rows = table.getElementsByTagName("tr");

    for(let i=0;i<rows.length;i++)
    {
        let row = rows[i];
        let cells = row.getElementsByTagName("td");

        let name = cells[0].getElementsByTagName("input")[0].value;
        let ex = cells[1].querySelector('input[type="radio"]:checked').value;
        let min = cells[2].getElementsByTagName("input")[0].value;
        let max = cells[3].getElementsByTagName("input")[0].value;
        let desc = cells[4].getElementsByTagName("input")[0].value;

        if(ex=="是")
        {
            cells[2].getElementsByTagName("input")[0].value = "";
            cells[3].getElementsByTagName("input")[0].value = "";
            cells[2].getElementsByTagName("input")[0].disabled = true;
            cells[3].getElementsByTagName("input")[0].disabled = true;
            cells[4].getElementsByTagName("input")[0].disabled = false;
        } 
        else if(ex=="否")
        {
            cells[4].getElementsByTagName("input")[0].value = "";
            cells[4].getElementsByTagName("input")[0].disabled = true;
            cells[2].getElementsByTagName("input")[0].disabled = false;
            cells[3].getElementsByTagName("input")[0].disabled = false;
        }
    }
}


async function confirmButtonOnclick()
{
    // 执行确认逻辑

    //获取表格数据
    let setDatas = [];
    let table = document.getElementById("table");
    let rows = table.getElementsByTagName("tr");

    for(let i=0;i<rows.length;i++)
    {
        let row = rows[i];
        let cells = row.getElementsByTagName("td");

        let name = cells[0].getElementsByTagName("input")[0].value;
        let ex = cells[1].querySelector('input[type="radio"]:checked').value;
        let min = cells[2].getElementsByTagName("input")[0].value;
        let max = cells[3].getElementsByTagName("input")[0].value;
        let desc = cells[4].getElementsByTagName("input")[0].value;

        //判断输入数据是否合法
        if(name=="")
        {
            return "请填写工具名称"
        }
        if(ex=="是")
        {
            ex = true;
            if(desc=="")
            {
                return "请填写附加内容"
            }
        } 
        else if(ex=="否")
        {
            ex = false;
            if(min=="")
            {
                return "请填写最小数量"
            }
            else
            {
                min = Number(min);
                if(Number.isInteger(min)==true)
                {
                    //整数
                    if(min<1)
                    {
                        return "最小数量需≥1"
                    }
                }
                else
                {
                    //小数
                    return "最小数量请填写整数"
                }
            }

            if(max=="")
            {
                return "请填写最大数量"
            }
            else
            {
                max = Number(max);
                if(Number.isInteger(max)==true)
                {
                    //整数
                    if(max<1)
                    {
                        return "最大数量需≥1"
                    }
                    else
                    {
                        if(max<=min)
                        {
                            return "最大数量需>最小数量"
                        }
                    }
                }
                else
                {
                    //小数
                    return "最大数量请填写整数"
                }
            }
        }
        else
        {
            return "附加刑不合法"
        }

        let setData = 
        {
            "name":name,
            "min":min,
            "max":max,
            "ex":ex,
            "desc":desc,
        };
        setDatas.push(setData);
    }
    
    localStorage.setItem("spankChessDatas",JSON.stringify(setDatas));

    alert("设置成功");

    // 跳转index页面
    window.location.href = "../index.html";
    return "success"
}

async function backButtonOnclick()
{
    // 跳转index页面
    window.location.href = "../index.html";
    return "success"
}
