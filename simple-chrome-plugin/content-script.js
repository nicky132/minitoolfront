(function () {
    console.log('这是 simple-chrome-plugin 的content-script！');
    let inputs = document.querySelector('.s_ipt');
    inputs.value = '大伟聊前端';
})();
