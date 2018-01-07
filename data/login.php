<?php
	/**添加新的用户信息**/
	//1 接收客户端提交的用户信息
		//VAR_DUMP($_REQUEST);
		$user_name=$_REQUEST['user_name'];
		$user_pwd=$_REQUEST['user_pwd'];
	//2 连接到MySQL服务器
		$conn=mysqli_connect('127.0.0.1','root','','mi',3306);
		//var_dump($conn);
	//3 提交SQL语句给MySQL服务器执行
		$sql='SET NAMES UTF8';
		mysqli_query($conn,$sql);
		$sql="INSERT INTO mi_user VALUES(NULL,'$user_name','$user_pwd')";
		//echo $sql;
		$result=mysqli_query($conn,$sql);
		/*
		mysqli_query函数返回值的特点 只要执行失败了 入SQL语法错误一律返回false
		*/
	//4 查看执行结果
	var_dump($result);
	if($result===FALSE){
		echo '执行失败！请检查SQL：'.$sql;
	}else{
		echo '执行成功！刚才的操作影响的记录行数：'.mysqli_affected_rows($conn);//被影响的行数
	}

?>