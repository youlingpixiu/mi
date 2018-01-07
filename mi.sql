SET NAMES 'utf8';
DROP DATABASE IF EXISTS mi;
CREATE DATABASE mi CHARSET=UTF8;
USE mi;

CREATE TABLE mi_user(
   user_id int(11) PRIMARY KEY  AUTO_INCREMENT,
   user_name varchar(100),
   user_pwd varchar(100)
);
INSERT INTO mi_user VALUES(NULL, 'SDY', '19911221');