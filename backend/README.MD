# Blog Post Applicaton
## Notes
- this project is run on jdk-17
- if you're using postman. Exported postman  collection and environment can be found on root folder.
- if you're not using postman. here's the list of endpoint:
    - [POST] http://0.0.0.0:8080/api/v1/auth/register
    - [POST] http://0.0.0.0:8080/api/v1/auth/authenticate
    - [GET] http://0.0.0.0:8080/api/v1/blog-posts?limit=2&offset=0
    - [GET] http://0.0.0.0:8080/api/v1/blog-posts/1
    - [DELETE] http://0.0.0.0:8080/api/v1/blog-posts/1
    - [POST] http://0.0.0.0:8080/api/v1/blog-posts
    - [PUT] http://0.0.0.0:8080/api/v1/blog-posts/1

## Command
### Using Docker
- use `docker build -t spring-boot-blog-post .` to build docker container
- use `docker run -p 8080:8080 spring-boot-blog-post` to run docker container
### Manual Run
- use `./gradlew bootRun` to run spring boot projects
- use `./gradlew test` to run all test
- use `./gradlew jaccocoTestReport` to generate test coverage

## Registration & Authentication flow
- After the service is running, register new user. The endpoint will return a token that will be use as a authorization header of other endpoint 
![image](https://github.com/jacksonfernando/CIMBNiagaTakeHomeTest/blob/master/images/authenticate.png)
- If you already had user registered, use authentication endpoint. The endpoint will return a token that will be use as a authorizaton header of other endpoint.
![image](https://github.com/jacksonfernando/CIMBNiagaTakeHomeTest/blob/master/images/authenticate.png)
- After you get the token, make sure to include token in authorization header when hitting an endpoint
![image](https://github.com/jacksonfernando/CIMBNiagaTakeHomeTest/blob/master/images/after_token.png)
