<?php
/**
接收客户端提交的user_name和user_pwd,
验证是否正确，返回验证结果，形如：
{"code":1,"msg":"用户名和密码都正确"}
或者
{"code":-2,"msg":"用户名和密码有错误"}
**/
header('Content-Type: application/json');

$user_name = $_REQUEST['user_name'];
$user_pwd = $_REQUEST['user_pwd'];

$conn = mysqli_connect('127.0.0.1','root','','mi',3306);

$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
//验证登录信息的SQL
$sql = "SELECT user_id FROM mi_user WHERE user_name='$user_name' AND user_pwd='$user_pwd'";
$result = mysqli_query($conn,$sql);

$output = ['code'=>0, 'msg'=>''];
if($result===FALSE){ //SQL语法错误
	$output['code'] = -1;
	$output['msg'] = '执行失败！请检查SQL：'.$sql;
}else {  //执行成功
	$row = mysqli_fetch_assoc($result);
	if($row===NULL){ //没有查询到记录
		$output['code'] = -2;
		$output['msg'] = '用户名或密码输入错误';
	}else { //查询到一行记录
		$output['code'] = 1;
        $output['user_name']=$user_name;
		$output['msg'] = '11用户名或密码均正确';
	}
}
echo json_encode($output);