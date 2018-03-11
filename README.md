# Recipes node.js server
========================

Run
```
git clone https://github.com/EugeniaM/recipes-server.git
```

Navigate to the folder which contains the project and run
```
npm install
```

Please follow the detailed instructions to configure the server to use your own Firebase project ([https://firebase.google.com/docs/admin/setup](https://firebase.google.com/docs/admin/setup))
1.  Sign up or sign in to Firebase [https://firebase.google.com/](https://firebase.google.com/)
2.  Go to [console](https://console.firebase.google.com/) ('ПЕРЕЙТИ К КОНСОЛИ'). Find the link in the upper right corner next to your user's settings
3.  Add new project. Press Add project (Добавить проект) button, specify project's name (whatever you want), select your country/region, press button Create project (Создать проект)
4.  Navigate to the [Service Accounts](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk) tab in your project's settings page. (Press settings button next to 'Project Overview' text, pick Project Settings option (Настройки проекта), go to Service Accounts (Сервисные аккаунты) tab)
5.  Click the Generate New Private Key (Создание закрытого ключа) button at the bottom of the Firebase Admin SDK section of the Service Accounts tab. After you click the button, a JSON file containing your service account's credentials will be downloaded.
6.  Put the downloaded JSON file to this project to *vendors/credentials* folder.
7.  Within this repository open *firebase-database.js* file which is in the root.
8.  Change the following line (5th line)

```
const serviceAccount = require('./vendors/credentials/recipes-app-388be-firebase-adminsdk-lkgp5-183657e3ee.json');
```

to point to the JSON file you have downloaded. It should be

```
const serviceAccount = require('./vendors/credentials/*name-of-your-file*.json');
```
9.  In  *firebase-database.js* file change the **databaseURL** property. It should contain the url of your database which you can find on Service Accounts tab in your Firebase project in 'Code fragment to configure Admin SDK' ('Фрагмент кода для настройки Admin SDK')
10. Go to [https://github.com/EugeniaM/recipes-fb-database-initial](https://github.com/EugeniaM/recipes-fb-database-initial) and follow the instructions to initialize database (this repository should be cloned into separate folder, not connected to the recipes-server project)

To run the server navigate to the folder which contains this project and run
```
npm start
```

To see the Swagger Recipes App navigate to **http://localhost:3000/api-docs/** in your browser