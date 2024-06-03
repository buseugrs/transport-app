# transport-app backend
MySql Setup & MySQL Server Install

mySQL klasöründeki setup kurulur
- Config Type -> Development Computer
- TCP/IP Port 3306
- X Protocol Port 33060
- MySQL Root Password: 123456

1) MySQL Command Line çalıştırılır
2) Aşağıdaki komut ile DB oluşturulur:
   CREATE DATABASE transport_db;
3) db.js dosyasında ilgili tanımlamalar yapılır

Örnek çalıştırma:

http://localhost:3000/users/create ile user create edildikten sonra aşağıdaki şekilde db'den oluşturulan user kaydı kontrol edilebilir

-> USE transport_db;

-> SHOW TABLES;

-> select * from users;