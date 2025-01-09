
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
        });
    })

    // 返回按钮点击事件
    backButton.addEventListener("click",function()
    {
        backButtonOnclick().then(res=>
        {
        });
    })

});

async function confirmButtonOnclick()
{
    // 执行确认逻辑
    alert("设置功能暂未上线");
    return "error"
}

async function backButtonOnclick()
{
    // 跳转index页面
    window.location.href = "../index.html";
    return "success"
}