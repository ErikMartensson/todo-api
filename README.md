### Thoughts and improvements
TypeORM isn't as fully featured as, for example, Sequelize. It's missing built-in support for soft deletes and easy transaction management. Ideally, I'd like to be sure that the Items aren't created or modified unless I can assure that the related Events are also created. But I couldn't find any simple examples on TypeORM transactions in Nest.js which are also easy to use in unit tests.

Input validation and error handling are lacking, to save time. Nest.js has some handy dandy input validation that can be used by just enforcing the DTOs. That helps a bit with validation but that doesn't solve all problems with error handling.

Errors that occur in the service should not return HTTP errors, I choose to that here to save time, but in general, I like to have specific internal exceptions that are later translated to HTTP errors at the controller level.

Most of the endpoints are pretty self explanatory, but some Swagger documentation wouldn't hurt.
