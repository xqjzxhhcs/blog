/**
 * Created by Administrator on 17-3-4.
 */
var express=require('express');
var cookieParser=require("cookie-parser");
var bodyParser=require("body-parser");
var session=require('express-session'); //session模块
var mysql=require("mysql"); //数据库模块
var fs=require('fs'); //文件操作

//引入模板引擎    模板引擎是前端一个划时代的技术点，有了他的存在，我们拼接字符串的枯燥日子，将不复存在
var swig=require("swig");


var app=express(); //创建web应用程序


//session的使用也需要配置
app.use(session({
    secret:'keyboard cat',
    resave:true,
    saveUninitialized:true,
    cookie:{maxAge:1000*60*60}   //最大时间为60秒
}));


//配置swig
app.engine("html",swig.renderFile);   //模板引擎的名称，用来强调后缀名    解析模板引擎的方法
app.set("views","./view");    //第一个参数固定，指的是设置模板引擎的页面在哪    页面位置
app.set("view engine","html");  //注册引擎，可以开始使用了
swig.setDefaults({cache:false});   //关闭缓存


app.use("/public",express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({extended: true}));



var pool=mysql.createPool({     //数据连接池
    host:'127.0.0.1',
    port:3306,
    database:'blog',
    user:'root',
    password:'a'
});

app.use("/",require("./routers/main"));   //所有的主模块，都在这里
app.use("/admin",require("./routers/admin"));  //所有的后台模块，都在这里
app.use("/api",require("./routers/api"));  //所有的前台逻辑模块，都在这里

app.get("/",function(req,res){
    pool.getConnection(function(err,conn){
        conn.query("select * from type order by tid",function(err,result){
            conn.release();
            //现在，数据有了result  问题是，如何将这个数据，传到网页里面去
            //网页路径    传到这个网页的模板引擎的参数
            res.render("main/index",{
                types:result
            })
        })
    })
    // res.sendFile(__dirname+"/view/main/index.html");
});

app.listen(8889,"127.0.0.1",function(err){
    if(err){
        console.log(err);
    }else{
        console.log("服务器启动成功");
    }
});

