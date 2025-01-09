
// 等待页面加载
document.addEventListener("DOMContentLoaded",function()
{
    //定义开始，设置按钮
    let startButton = document.getElementById('startButton');
    let setButton = document.getElementById('setButton');

    //开始按钮点击事件
    startButton.addEventListener("click",function()
    {
        startButtonOnclick().then(res=>
        {
        });
    })

    //设置按钮点击事件
    setButton.addEventListener("click",function()
    {
        setButtonOnclick().then(res=>
        {
        });
    })

});

async function startButtonOnclick() 
{
    // 跳转play页面
    window.location.href = "play/play.html";
    return "success"
}

async function setButtonOnclick() 
{
    // 跳转set页面
    window.location.href = "set/set.html";
    return "success"
}