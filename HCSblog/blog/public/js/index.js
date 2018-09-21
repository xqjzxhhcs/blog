$(function(){
    var $loginBox=$("#loginBox");
    var $resBox=$("#registerBox");
    var $userBox=$("#userInfo");

    $loginBox.find("a.colMint").on("click",function(){
        $loginBox.hide();
        $resBox.show();
    });

    $resBox.find("a.colMint").on("click",function(){
        $resBox.hide();
        $loginBox.show();
    });


    //注册
    $resBox.find('button').on('click',function(){
        //属性选择器
        var uname=$resBox.find('[name="username"]').val();
        var pwd=$resBox.find('[name=password]').val();
        var repwd=$resBox.find('[name=repassword]').val();
        if(uname==""||uname==null||pwd==""||pwd==null){
            alert("用户名或密码不能为空");
            return;
        }
        if(pwd!=repwd){
            alert("输入的两次密码不一致");
            return;
        }

        //通过ajax提交请求
        $.ajax({
            type:'post',
            url:'/api/user/register',
            data:{
                username:$resBox.find('[name="username"]').val(),
                password:$resBox.find('[name="password"]').val()
            },
            dataType:'json',
            success:function(result){
                $resBox.find('.colWarning').html(result.message);

                if(result.code==2){
                    //注册成功
                    setTimeout(function(){
                        $loginBox.show();
                        $resBox.hide();
                    },1000);
                }
            }
        })
    })

//登录
    $loginBox.find('button').on('click',function(){
        var uname=$loginBox.find('[name="username"]').val();
        var pwd=$loginBox.find('[name=password]').val();
        if(uname==""||uname==null||pwd==""||pwd==null){
            alert("用户名或密码不能为空");
            return;
        }
        //通过ajax提交请求
        $.ajax({
            type:'post',
            url:'/api/user/login',
            data:{
                username:$loginBox.find('[name="username"]').val(),
                password:$loginBox.find('[name="password"]').val()
            },
            dataType:'json',
            success:function(result){
                $loginBox.find('.colWarning').html(result.message);

                if(result.code==2){
                    //登录成功
                    // $loginBox.hide();
                    // $userBox.show();
                    // //判断是管理员 还是 普通用户
                    // if(result.info.isAdmin==0){
                    //     //普通用户
                    //     $userBox.find("p.userName span").html(result.info.uname);
                    //     $userBox.find("p.adminInfo").hide();
                    // }else if(result.info.isAdmin==1){
                    //     //管理员
                    //     $userBox.find("p.userName span").html(result.info.uname);
                    //     $userBox.find("p.adminInfo").show();
                    // }

                    //重新加载页面
                    window.location.reload();
                }
            }
        })
    });

    // //退出
    $('#logout').on('click', function(){
        //通过ajax提交请求
        $.ajax({
            type: 'post',
            url: '/api/logout',
            success: function (result) {
                if(result=="0"){
                    // window.location.reload();
                    location.href="/";
                }
            }
        });
    });
});


var index=1;
var time;//定时器
var lisPic=document.getElementById("lisPic");
var lisPics=document.getElementById("lisPics");
time=setInterval("show()",3000);//定时器中show（）中没有参数，即参数为空
function show(id){
    if(Number(id)){
        index=id;
        //消除定时器
        clearInterval(time);
    }else{
        //定时器
        index++;
        if(index==6){
            index=1;//将第6张图片变成第一张图片
        }
    }
    //改变图片
    // console.log(lisPic)
    lisPic.src="/public/images/pict_"+index+".jpg";
    lisPics.src="/public/images/pc_"+index+".jpg";

    //改变文字颜色
    //var lis=document.getElementById("pagination-bottom").getElementsByTagName("li");
    var lis=document.querySelectorAll("#pagination-bottom li")
    var as=document.querySelectorAll(".adBtn a")
    for(var i=0;i<lis.length;i++){
        lis[i].setAttribute("class","pagination-bottom_out");//移出的时候，将所有的颜色设为白色
        if(i==(index-1)){//因为index是从1开始的，所以当i=0是，对应的图片是第一张，第一张图片的索引是1(0==i-1)
            lis[i].setAttribute("class","pagination-bottom_over");//当鼠标移到相应的i的时候，当前颜色设为橘色
        }
    }
    for(var i=0;i<as.length;i++){
        as[i].setAttribute("class","pagination-bottom_out");//移出的时候，将所有的颜色设为白色
        if(i==(index-1)){//因为index是从1开始的，所以当i=0是，对应的图片是第一张，第一张图片的索引是1(0==i-1)
            as[i].setAttribute("class","pagination-bottom_over");//当鼠标移到相应的i的时候，当前颜色设为橘色
        }
    }
}
function start(){
    time=setInterval("show()",3000);
}
