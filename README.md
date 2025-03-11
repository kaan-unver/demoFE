
# Demo Frontend

Demo Frontend is the frontend of the Demo which is cloud based platform. 

## Technology
Nodejs, React, PrimeFace Atlantis Theme

## Installation

To run this project, there are some steps to be completed.

Go to project folder (same level with package.json)
```bash
  npm install
```

### Environment Variables

You will need to add the following environment variables to your .env file

`REACT_APP_Title`

Note: All variables in environment files should start with "REACT_APP_"

## Run

To start the project, you can use scripts in package.json under Scripts tag.

Each script runs the project with spesific environment file. So, when you would like to start the project with 'local' environment, run following;

```bash
  npm run start-local
```

If it's test, then run following one;
```bash
  npm run start-test
```


## Used Library
- https://github.com/Rajesh-Royal/vThumb.js
- [FabricJS] https://www.npmjs.com/package/fabric
