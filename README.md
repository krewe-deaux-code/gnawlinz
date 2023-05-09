# gnawlinz

A choice based adventure game where the player wanders for 3 days through a zombie infested New Orleans.

# Steps for Forking and Cloning the Repo:

fork repo from org
grab repo URL --> green CODE button, URL should end with .git
git clone URL...git (in your terminal)
open project in VSCode
go back to organization repo
grab repo URL --> green CODE button
back in VSCode terminal: git remote add upstream <URLorganization.git>

# Steps to spin up

For WSL/Bash (follow `//` steps if first time)

```ts
$ sudo service postgresql start    /* <-- starts postgres 14 (you'll need this installed) */
// $ sudo -i -u postgres           /* <-- if you are installing, this will create user "postgres" */
// $ createdb gnawlinz             /* <-- creates database gnawlinz */
$ sudo -u postgres psql -c 'grant all privileges on gnawlinz test to postgres;'
/* above: connect into shell as "postgres", grants priveleges for <database> to <user>*/
/* below: inside psql shell */
postgres=# \c database  /* <-- use "gnawlinz" database */

/* new terminal: */
$ npm run build                    /* <-- compiles and distributes */

/* new terminal: */
$ npm run start                    /* <-- compiles and distributes */

/* browser */
connect to `http://localhost:8080/`
```

## Tech Stack

- Languages: Javascript & Typescript
- Deployment: AWS ES2 & Remote-SSH
- Front End: React w/ React Bootstrap
- HTTP Requests: Axios
- Server / Server Routing: Express
- Database: PostgreSQL / Sequelize Amazon RDS
- Auth: Passport-OAuth2
- Environment: Node.js
- Linting: ESLint / AirBnB?
- Front End Routing: React-Router
- React-Context
- React-Bootstrap
- React-Icons
- CSS Library: Styled Components
- Image Hosting: Cloudinary
- Version Control: Git-Hub
- Compiler: Babel
- Bundling: Webpack
- Project Management Software: Trello
- Day.js
- Socket-io
- Pixel editor: rx
- PixelIt -
- Animations: Framer
- Continuous Integration: Github Actions

## Game Assets Creator Credit

- "profile" icon by Bakunetsu Kaito from https://thenounproject.com/icon/profile-1094753/ CC BY 3.0
- "chat" icon by Bakunetsu Kaito from https://thenounproject.com/icon/chat-1094743/ CC BY 3.0
- "Death" icon by Bakunetsu Kaito from https://thenounproject.com/icon/death-1094768/ CC BY 3.0
- "Trophy" icon by Bakunetsu Kaito from https://thenounproject.com/icon/trophy-1097545/ CC BY 3.0
- "Heart pixel" by tulpahn from https://thenounproject.com/icon/heart-pixel-2651784/ CC BY 3.0
