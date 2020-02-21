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

Note:

Because this project use sequelize, you need to install sequelize-first if you dont have one

```
npm install -g sequelize-cli
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

### **Sign Out** user

Methode : GET
Bearer Token required
URL :

```
http://localhost:3000/api/v1/user/signout
```

### **Update User Password**

Methode : PUT
Bearer Token required
URL :

```
http://localhost:3000/api/v1/user/:password
```

Payload in url e.g:

```
http://localhost:3000/api/v1/user/secret_password
```

### **Show User**

Methode : GET
Bearer Token required
URL:

```
http://localhost:3000/api/v1/user/showuser/

```

Payload in url e.g:

```
http://localhost:3000/api/v1/user/showuser/
```

## **FB Login Usage**

Fb login method is purposed to save and validate fb login from mobile and save to back end.
First, you need to register your app in (Facebook)[https://developers.facebook.com/docs/facebook-login/android]
Then, you will get App ID and App Secret.

In your app dashboard detail, copy your App Detail to UserController.js

```
// facebook app information
let app_token = "YOUT_APP_ID|YOUR_APP_SECRET";
let app_id = "YOUT_APP_ID";
let app_name = "YOUR_APP_NAME";
```
