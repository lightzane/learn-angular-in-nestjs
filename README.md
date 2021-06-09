# Learn Angular in NestJs

This application consists of 3 Nodejs projects.

-   **Angular** (ui) - frontend
-   **NestJs** (rest-api) - server
-   **Angular & NestJs** (app) - server with a frontend
-   [BONUS] Standalone (index.html) - offline mode

## Getting Started

1. Go to any folder: `ui`, `rest-api`, `app`
2. Run `npm install` and `npm run start`

## Steps to Create an App from scratch (Angular in NestJs)

Below are steps on how to develop an Angular in NestJs

1. You must have Angular and NestJs installed

```
npm install -g @angular/cli
npm install -g @nestjs/cli
```

2. Create a blank folder where you will develop your project
3. Open `cmd` or any command line interface
4. `ng new <angular-project-name>`
5. `nest new <nestjs-project-name>`
6. Start developing your frontend using Angular
7. Start developing your server or rest-api using NestJs
8. Create a `proxy.conf.json` in Angular root directory and talk with NestJs server

**proxy.conf.json**

```json
{
    "/api": {
        "target": "http://localhost:3000",
        "secure": false
    }
}
```

9. Modify/Add the `start` and `build` of Angular `"scripts"` in `package.json`

**package.json** (Angular)

```json
"scripts": {
    "start": "ng serve --proxy-config proxy.conf.json",
    "build": "ng build --output-hashing=none",
}
```

10. When done development in Angular, run `npm run build`
11. In the `dist`, copy the generated `index.html` and other sibling files
12. Create a `public` folder in the root of NestJs project directory
13. `Paste` the copied files in that folder
14. Add `NestExpressApplication` and `app.useStaticAssests()` in `main.ts` of NestJs

**main.ts** (NestJs)

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useStaticAssets('public');
    await app.listen(3000);
}
bootstrap();
```

15. When done development in NestJs, run `npm run build`
16. Create another seperate project folder `app`
17. Copy/Paste the `public` folder in `app`
18. Copy all the `dist` folder from NestJs project directory
19. Run `npm init -y` and also install the dependencies:

```json
npm install @nestjs/core @nestjs/platform-express @nestjs/config
```

20. Finally, modify/add "start" in the `package.json` script
    **package.json** (app)

```json
"scripts": {
    "start": "node main",
}
```

_Note: The `main` is your entry `.js`_

## What's Next ?

### NestJs Course

Looking for more NestJs features?<br>
This includes Angular, NestJs, MongoDb.

-   https://github.com/lightzane/nestjs-course

This has connection to the database, has cookies, Authorization and Authentication, Middleware, Guards, etc.
