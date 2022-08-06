/**
 *   创建router类
 *   routes:路由集合对象，键名是路径，键值是回调函数
 *   currentUrl:当前url
 */
function router() {
    this.routes = {};
    this.currentUrl = "";
    this.init();
    
}

//完成事件监听，在hash值改变时和load事件完成时进行refresh刷新
router.prototype.init = function () {
    addEventListener('load', this.refresh.bind(this));
    addEventListener('hashchange', this.refresh.bind(this));
}

//refresh刷新，根据当前url获取this.rotes[currentUrl]的回调函数进行组件展示
router.prototype.refresh = function () {
    this.currentUrl = location.hash.slice(1);
    //load时，router-view不需要渲染任何组件
    if(location.hash==""){
        document.getElementById("router-view").innerHTML = "";
        return;
    }   
    if (this.routes[this.currentUrl]) {
        this.routes[this.currentUrl]();
    } else {
        document.getElementById("content").innerHTML = "404 Not Found";
    }
}

/**
 *  路由注册函数:进行路由注册
 *  @param {String} obj.path 注册的路径
 *  @param {function} obj.component 组件名称，根据组件名称将组件切换的方法绑定给routes[obj.path]
 */
router.prototype.register = function (obj) {
    this.routes[obj.path] = function() {
        changeComponent(obj.component)
    };
}

/**
 * 组件切换函数：根据组件名称进行切换
 * @param {String} name 组件名称
 */
function changeComponent(name) {
    for (let i = 0; i < components.length; i++) {
        if (components[i].name == name) {
            document.getElementById("router-view").innerHTML = components[i].component;
            break;
        }
        if (i == (components.length - 1)) {
            alert("没有该组件");
        }
    }

}
