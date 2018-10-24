<?php
    header("Content-type:text/html;charset=utf-8");
    $link = mysql_connect("localhost", 'root', '123456');
    if(!$link){
        echo "链接数据库失败";
        exit; //退出当前程序。
    }
    mysql_set_charset("utf8");
    mysql_select_db("converse");
    $type = $_GET["type"];
    if($type == "login"){
        $password = $_POST['password'];
        $email = $_POST['email'];
        $phonenum = $_POST['phonenum'];

        if($email == ''){
            $sql = "select * from users where phonenum='{$phonenum}' AND password='{$password}'";
        }else{
            $sql = "SELECT * from users where email='{$email}' AND password='{$password}'";
        }
        $res = mysql_query($sql);
        $row = mysql_fetch_assoc($res);
		if($row){
			echo "登陆成功";
			exit;
		}else{
			echo "登陆失败";
			exit;
		}
    }else{
        $password = $_POST['password'];
        $email = $_POST['email'];
        $phonename = $_POST['phonenum'];
        $sex = $_POST['sex'];
        $sql = "SELECT * FROM users WHERE phonenum='{$phonename}' AND email='{$email}'";
		$res = mysql_query($sql);
		$row = mysql_fetch_assoc($res);
		if($row){
			echo "该用户已被注册";
			exit;
		};
        $sql = "INSERT INTO users(phonenum,email,sex,password) VALUES('{$phonename}','{$email}','{$sex}','{$password}')";
        $res = mysql_query($sql);
		if($res){
			echo "注册成功";
			exit;
		}else{
			echo "注册失败";
			exit;
		}
    }
    mysql_close($link);
 ?>
