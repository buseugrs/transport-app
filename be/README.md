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
3) db.js dosyasında ilgili tanımlamalar yapılır (Eğer yapıldıysa direkt)
4) USE transport_db; komutu ile ilgili database'e geçilir. 
5) Bu adımdan itibaren VSCode'da terminalde be klasörü altına gidilir  (cd be) ve npm start komutu çalıştırılır. (Backend çalıştığında tüm tablolar otomatik olarak boş bir şekilde oluşur.)
5) MySQL command line'a geçilerek SHOW TABLES; komutu ile seçilen database'deki tüm tablolara bakılabilir. 
6) MySQL command line'da SELECT * FROM tablo_ismi; komutu ile herhangi bir tabloya select atılabilir. (tablo_ismi yerine  istenilen tablo ismi yazılmalıdır.)
7) MySQL command line'da DROP TABLE tablo_ismi; komutu ile herhangi bir tablo silinebilir. (tablo sildikten sonra tablonun otomatik bir şekilde tekrar oluşturulabilmesi için  backend projesi kapatılıp tekrardan ayağa kaldırılmalıdır.)

** Frontend akışı dışında manuel yapılabilecek kontroller için ;

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




