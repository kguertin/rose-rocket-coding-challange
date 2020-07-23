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
    const {driver, task, week, day, startTime, endTime, location, description} = req.body;

    if (endTime <= startTime) {
        return res.render('schedule', {
        error: "Task end time should be after start time",
        weeklySchedule: []
        })

    }


    if (scheduleData[driver][week]) {
    scheduleData[driver][week].push({
        day: parseInt(day),
        startTimeBlock: parseInt(startTime) +1,
        endTimeBlock: parseInt(endTime) + 1,
        task,
        location,
        description
        })
 } else {
        scheduleData[driver][week] = [{
            day: parseInt(day),
            startTimeBlock: parseInt(startTime) + 1,
            endTimeBlock: parseInt(endTime) + 1,
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