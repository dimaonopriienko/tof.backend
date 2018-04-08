This project was based on Express.js as router system.

There folder structure is like this:
- configs - files with defined constants for usage (most of them are from `process.env`)
- helpers - some singleton helpers which can be used to store some stateless methods
- initializers - folders with files, every file contain a module all of them will be run when the application starts up (server initializer, db initializer, etc.)
- models - slim models
- repositories - list of repositories, which will be used for crud operations on models/data
- routes - list of express routers