# transport-app backend
MySql Setup & MySQL Server Install

mySQL klasöründeki setup kurulur
- Config Type -> Development Computer
- TCP/IP Port 3306
- X Protocol Port 33060
- MySQL Root Password: Admin567*

1) MySQL Command Line çalıştırılır
2) Aşağıdaki komut ile DB oluşturulur:
   CREATE DATABASE transport_db;
3) db.js dosyasında ilgili tanımlamalar yapılır

Örnek çalıştırma:

Postman uygulaması indirilir.

Yeni bir istek atma sayfası açılır.

URL kısmına aşağıdaki URL girilir.

Aynı sayfada "raw" seçeneği seçilerek. "raw" seçeneğinin bulunduğu satırın en sağında JSON seçilir. 

Panele örnek request iletilir.
{
    "username": "test",
    "email" : "loremipsum@gmail.com",
    "password" : "lorem12345"
}

http://localhost:3000/users/create ile user create edildikten sonra aşağıdaki şekilde db'den oluşturulan user kaydı kontrol edilebilir.

-> SH

-> SHOW TABLES;

-> select * from Users;