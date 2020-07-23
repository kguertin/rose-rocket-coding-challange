const scheduleData = {
    driver1: {

    },
    driver2: {

    },
    driver3: {

    }
}

exports.getSchedule = (req, res) => {
    res.render('schedule');
}

exports.addTask = (req, res) => {
    const {driver, task, week, day, startTime, endTime, location, description} = req.body;
    if (scheduleData[driver][week]) {
    scheduleData[driver][week].push({
        day,
        startTime,
        endTime,
        task,
        location,
        description
        })
 } else {
        scheduleData[driver][week] = [{
            day,
            startTime,
            endTime,
            task,
            location,
            description
        }]
    }
    const weeklySchedule = scheduleData[driver][week]
    res.render('schedule', {
        weeklySchedule
    });
}