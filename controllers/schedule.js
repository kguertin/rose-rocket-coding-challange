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
    res.render('add-task');
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

}

exports.deleteTask = (req, res) => {

}