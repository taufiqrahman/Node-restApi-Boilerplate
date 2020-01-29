<p align="center">
<h1 align="center">Nodejs Micro Service Template</h1>
    <br>
</p>

## **INSTALL**

```
$ npm install
$ sequelize db:migrate
$ node index.js 
```
## **USAGE**

### **Sign Up** new user

Methode : POST
URL :

```
http://localhost:3000/api/v1/user/signup
```

Payload JSON

```
{
	"username": "name",
	"password": "123456",
	"email":"name@gmail.com"
}
```

### **Sign In** user

Methode : POST
URL :

```
http://localhost:3000/api/v1/user/signin
```

Payload JSON

```
{
	"username": "name",
	"password": "123123"
}
```

### **Update User Password**

Methode : PUT
Bearer Token required
URL :

```
http://localhost:3000/api/v1/user/:id/:password
```

Payload in url e.g:

```
http://localhost:3000/api/v1/user/1/secret_password
```

### **Show User**

Methode : GET, Bearer Token required, URL:

```
http://localhost:3000/api/v1/user/showuser/:id

```

Payload in url e.g:

```
http://localhost:3000/api/v1/user/showuser/26
```
