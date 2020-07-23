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

    if (endTime <= startTime) {
        return res.render('schedule', {
        error: "Task end time should be after start time",
        weeklySchedule: null
        })

    }


    if (scheduleData[driver][week]) {
    scheduleData[driver][week].push({
        day: parseInt(day),
        startTime,
        endTime,
        task,
        location,
        description
        })
 } else {
        scheduleData[driver][week] = [{
            day: parseInt(day),
            startTime,
            endTime,
            task,
            location,
            description
        }]
    }


    const weeklySchedule = scheduleData[driver][week]
    weeklySchedule.sort((a, b) => {
        return a.day - b.day
    });

    console.log(weeklySchedule)
    res.render('schedule', {
        error: null,
        weeklySchedule
    });
}