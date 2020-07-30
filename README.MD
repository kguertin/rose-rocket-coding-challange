# Rose Rocket Coding Challange 2020 - Dispatch Task Manager

### How to Start App
In order to use the dispatch task manager application you just have to run the following in the terminal.
First install all dependencies by running: 
```
npm install 
```
Then the user can run the application by running the following in the terminal
```
npm start
```
### Application Usage
##### Add Task
Users can add a task by clicking Add Task and filling in the task information for the desired driver. The app will then redirect to the week with the new task. If a user attempts to add a task that conflicts with an existing task for that driver the user will be prompted to comfirm that they want to remove the exisitng task.

##### View Driver Schedule
Users can select a driver and week and see existing tasks for that week.

###### Download CSV file
Users can select a drive and the days by which the breakdown is grouped and then generate a csv file on the server. 

### Technologies
node v12.18.0  
express v4.17.1  
ejs v3.1.3  
moment v2.27.0  
moment-range v4.0.2  
csv-writer v1.6.0  
body-parser v1.19.0  





