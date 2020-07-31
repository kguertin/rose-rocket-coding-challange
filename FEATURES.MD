# Application Features
  
  ## Existing Features

  ### Adding Tasks
  - Users can add tasks, with optional description and location data, within the confines of a single day.
  - If there is a conflicting task, the user will be prompted to override the existing task or return to the schedule page.

  ### Editing Tasks
  - Users can update existing taks for a given driver.
  - Users will be prompted to overide existing tasks if the edited task conflicts with an existing task.

  ### Delete Task
  - Users can delete an existing task for a given driver.

  ### CSV File 
  - Users can download an csv summary file of the breakdown of pick ups, drop offs and other tasks within a defined time interval spaning a 52 week period.

  ### General
  - Application is [deployed on heroku](https://rose-rocket-challange.herokuapp.com/), but currently the CSV file only is generated on the sever root and now downloaded through the browser on the client side.

  ## Future Features (What I couldn't finish)

  ### Front End
  - Add React front end for a cleaner user experience and reduce excess code used by EJS.
  - improve User Experience with better error handling.
  - Offer a driver view to just see existing schedule and have an admin login to add new task. Maybe have a driver submit a task to be approved by dispatcher, specifically with 'other tasks' which we can use to schedule breaks, delays, etc.
  - user can toggle through weeks regardless of if there is a task that week

  ### Editing and Adding Tasks
  - offer a new time slot for a task if there is a conflict with an existing task. I think this can be done using the moment-range plugin to find adjacent times for a given range. 

  ### Database
  - Move task data to MongoDB. Will be very simple to user MongoDB Atlas to use a cloud based DB.

  ### Hosting
  - Host application. 

  ### CSV File
 - As the application is now deployed then prompt the csv file to be downloaded through browser rather than generate csv on server. 

 ### General
 - refactor code. A lot of duplicate code can be trimed, especially in regards to confirming operations, this could be one route.
