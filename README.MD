# Dynamic Complain App
## How to run
- Run frontend using `npm i` to install the necessary packages and `npm run dev` to run in development mode
- Run `docker-compose up --build` command to start the database and microservice using container
- After the service is up there's one user created for admin with the following credentials
```
username : admin
password : admin
```
## Menu
### Guest section
- This page is dedicated for guest to submit complain. Categories is fetched from the backend and guest also can add
multiple field using category dropdown by clicking which kind of input guest want.
#### Screenshot
![Guest Submit Complain](https://raw.githubusercontent.com/jacksonfernando/dynamic-complain-app/main/screenshot/Guest.png)
### Admin section
- This page is dedicated for admin to CRUD user, CRUD categories and submit remark in complains
### Screenshot
- This page is dedicated to CRUD user
![CRUD user](https://raw.githubusercontent.com/jacksonfernando/dynamic-complain-app/main/screenshot/userspng.png)
- This page is dedicated for user to CRUD categories that will  display on the categories dropdown at submit complain page.
![CRUD categories](https://raw.githubusercontent.com/jacksonfernando/dynamic-complain-app/main/screenshot/add_categories.png)
- This page is dedicated for  user see the complain. User can navigate to complain detail by clicking one of the row in the table.
![SEE complain](https://raw.githubusercontent.com/jacksonfernando/dynamic-complain-app/main/screenshot/complain_table.png)
- This page is dedicated for  user to see the detail of the complain and submit remarks. User will be redirected to this page when user clicked the row in complain table
![Complain detail](https://raw.githubusercontent.com/jacksonfernando/dynamic-complain-app/main/screenshot/submit_remarks.png)

