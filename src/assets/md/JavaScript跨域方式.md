# 前言

> 在前后端分离和SPA单页面应用盛行的今天，前后端数据交互经常会碰到请求跨域的问题，我这里就不赘述跨域的原理了，单刀直入，解决跨域三种普遍方式。

# jsonp

> Jsonp利用了`script`标签无跨域资源的限制条件，网页得到从其他来源动态产生的JSON数据。JSONP 请求需要前后端协调`callback`关键字才可以

如果你看不到你上面的tips,没关系，大致的意思是创建一个script从而拿到服务器接口的返回值，但是你会发现好像只有JQ的请求库`$.ajax`才支持jsonp~~
其实JQ请求库也是自己封装一个这样的创建script标签的方法来完成这样的实现，下面列举两个方法实现jsonp

## JQ

> JQ实现方法比较简单，因为他本身封装号了jsonp的实现，直接上代码

``` js
$.ajax({
    url: url, //这里参数填写请求接口url
    method: 'POST', // 就算是是写POST 实际jsonp只能是GET方式请求
    data: data,  // 请求参数
    dataType: 'jsonp', // 请求方式，务必是jsonp
    jsonpCallback: 'callback', // 与后端协定的关键字
    success (rel) {
        console.log(rel) // 接口成功返回
    }
})
```

## jsonp封装
> 你会发现原生`XMLHttpRequest`和知名请求库`axios`并不支持jsonp的请求方式(因为他们完全是两种不一样的东西)，这时候可以自己封装个方法~
``` js
jsonp (obj) {
    // 定义一个处理Jsonp返回数据的回调函数
    window['callback'] = function (object) {
    obj.success(object)
    }
    var script = document.createElement('script')
    // 组合请求URL
    script.src = obj.url + '?callback=callback'
    for (let key in obj.data) {
    script.src += '&' + key + '=' + obj.data[key]
    }
    // 将创建的新节点添加到BOM树上
    document.getElementsByTagName('body')[0].appendChild(script)
},
```
使用时候可以直接调用jsonp,然后传入对象，如：
``` js
this.jsonp({
    url: url,
    data: data,
    success: function (obj) {
        console.log(obj)
    }
})
```

## 后端协调
> 这时候你开心的完成上面的步骤后发现，事情没有那么简单~
![image](http://img.mgblog.cn/662b8f2be5757adfa874e8269d99ebad.png)
> 报错了，还记得我之前说的吗？jsonp需要前后端协调`callback`关键字才可以,这时候你就要请后端大佬喝一杯冰阔落，让他加上关键字返回，JQ默认关键字是`callback`,自己封装的可以自行调整哦~

下面列出PHP后端调整代码

``` php
header("Content-type:application/json;charset=utf-8");
function success($data=array('message'=>'')){
    // 返回成功json使用
    $callback = isset($_GET['callback']) ? trim($_GET['callback']) : ''; // 接收前端jsonp回调参数
    $arrayName = array(
        'type' => 'success',
        'body'=>$data
    );
    $tmp= stripslashes(json_encode($arrayName,JSON_UNESCAPED_UNICODE));
    echo $callback . '(' . $tmp .')';  //返回格式需要callback关键字在最前面
}
success(array('message'=>'this is jsonp'));
```

实际前端在开发者工具中的`Network`中查看请求是这样的
![image](http://img.mgblog.cn/d5d30735b0e63836e1f350cc938360e1.png)
但是直接获取到的返回，是对象哦~~~
![image](http://img.mgblog.cn/c2dd56831da4fec08e587b1b6202d976.png)

# Proxy
> Proxy实际上就是利用服务器，进行接口的代理转发请求，他不需要后端人员配合，只需要配置服务器开启代理转发的相应参数即可。在vue-cli中我们可以使用node.js服务器的便利，设置`proxyTable`相应参数，轻松达到接口转发功能。
``` js
proxyTable: {
    '/api': {
        target: 'http://www.api.com',
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/'
        }
    }
}
```
使用时，我们可以直接`/api/***.php`即可
``` js
let url = '/api/api.php' // 实际上等于请求http://www.api.com/api.php
let data= {}
this.$http.post(url, data).then(rel => {
    console.log(rel)
}).catch(err => {
    console.log(err)
})
```
## 运维协调
> 在不管是在vue-cli中还是还是普通开发环境下，接口的代理转发都是依赖服务器来进行，所以当项目打包上线后项目将脱离node的环境，没有node的服务到一个新的服务器中运行，这时候如果不在新服务环境中配置代理转发，接口将会是404。


# CORS
> 跨域资源共享(CORS) 是一种机制，它使用额外的 HTTP 头来告诉浏览器  让运行在一个 origin (domain) 上的Web应用被准许访问来自不同源服务器上的指定的资源。当一个资源从与该资源本身所在的服务器不同的域、协议或端口请求一个资源时，资源会发起一个跨域 HTTP 请求。

简单的来说就算让后端的接口中添加几个请求头，允许前端跨域访问。如以下PHP添加的请求头：
``` php
header('Access-Control-Allow-Origin: *'); // *代表允许任何网址请求,也可以直接设置域名，如：
// header('Access-Control-Allow-Origin: http://www.el.com');
header('Access-Control-Allow-Methods:POST,GET,OPTIONS,DELETE'); // 允许请求的类型
header('Access-Control-Allow-Credentials: true'); // 设置是否允许发送 cookies
header('Access-Control-Allow-Headers: Content-Type,Content-Length,Accept-Encoding,X-Requested-with, Origin'); // 设置允许自定义请求头的字段
```
这种方式虽然有点不安全，但是方便、简洁、有效的解决的跨域带来的困扰