const scheduleData = {
    driver1: {

    },
    driver2: {

    },
    driver3: {

    }
}

exports.getSchedule = (req, res) => {
    res.render('schedule', {
        weeklySchedule: []
    });
}

exports.addTask = (req, res) => {
    res.render('add-task', {
        edit: false,
        taskData: null
    });
}

exports.postTask = (req, res) => {
    const {driver, task, week, day, startTime, endTime, location, description} = req.body;

    if (endTime <= startTime) {
        return res.render('schedule', {
        error: "Task end time should be after start time",
        weeklySchedule: []
        })

    }

    if (scheduleData[driver][week]) {
    scheduleData[driver][week].push({
        taskId: scheduleData[driver][week].length + 1,
        day: parseInt(day),
        startTimeBlock: parseInt(startTime) + 1,
        endTimeBlock: parseInt(endTime) + 1,
        task,
        location,
        description,
        weekId: week,
        driverId: driver
        })
    } else {
        scheduleData[driver][week] = [{
            taskId: 1,
            day: parseInt(day),
            startTimeBlock: parseInt(startTime) + 1,
            endTimeBlock: parseInt(endTime) + 1,
            task,
            location,
            description,
            weekId: week,
            driverId: driver
        }]
    }


    const weeklySchedule = scheduleData[driver][week]
    console.log(weeklySchedule)
    weeklySchedule.sort((a, b) => {
        return a.day - b.day
    });

    res.render('schedule', {
        error: null,
        weeklySchedule
    });
}

exports.updateTask = (req, res) => {
    res.send('ok');
}

exports.viewSchedule = (req, res) => {
    const {driver, week} = req.body
    console.log(driver, week)
    let weeklySchedule;
    scheduleData[driver][week] ? weeklySchedule = scheduleData[driver][week] : weeklySchedule = [];
    console.log(weeklySchedule)
    
    res.render('schedule', {
        weeklySchedule
    })
}

exports.editTask = (req, res) => {
    const {weekId, taskId, driverId} = req.body;
    const weeklySchedule = scheduleData[driverId][weekId];
    const taskData = weeklySchedule.filter(task => task.taskId === parseInt(taskId))[0]
    console.log(taskData)
    res.render('add-task', {
        edit: true,
        taskData
    })

}

exports.deleteTask = (req, res) => {
    const {weekId, taskId, driverId} = req.body
    const searchSchedule = scheduleData[driverId][weekId];
    const updatedTasks = searchSchedule.filter(task => task.taskId !== parseInt(taskId));
    scheduleData[driverId][weekId] = updatedTasks
    const weeklySchedule = scheduleData[driverId][weekId];
    res.render('schedule', {
        weeklySchedule
    })
}