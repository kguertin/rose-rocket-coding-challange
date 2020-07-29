const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);

// Schedule "Database"
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
        let existingTask, newTaskData;
        const existingSchedule = scheduleData[driver][week]
        existingSchedule.forEach(i => {
            const newStart = moment(startTime, "HH a");
            const newEnd = moment(endTime, 'HH a');
            const existingRange = moment.range(i.startTime, i.endTime);
            const newRange = moment.range(newStart, newEnd)

            if(i.day === parseInt(day) && (newRange.overlaps(existingRange) === true)){
                    newTaskData = {
                        day: parseInt(day),
                        startTimeBlock: parseInt(startTime) + 1,
                        endTimeBlock: parseInt(endTime) + 1,
                        task: task,
                        location,
                        description,
                        weekId: parseInt(week),
                        driverId: driver
                    },
                    existingTask = i
            }
        })

        if(newTaskData) {
            return res.render('confirm-new-task', {
                newTaskData,
                existingTask
            })
        }
    }

    if (scheduleData[driver][week]) {
        scheduleData[driver][week].push({
            taskId: Math.random(),
            day: parseInt(day),
            startTime: moment(startTime, 'HH a'),
            endTime: moment(endTime, "HH a"),
            startTimeBlock: parseInt(startTime) + 1,
            endTimeBlock: parseInt(endTime) + 1,
            task,
            location,
            description,
            weekId: parseInt(week),
            driverId: driver
            })
    } else {
        scheduleData[driver][week] = [{
            taskId: Math.random(),
            day: parseInt(day),
            startTime: moment(startTime, 'HH a'),
            endTime: moment(endTime, "HH a"),
            startTimeBlock: parseInt(startTime) + 1,
            endTimeBlock: parseInt(endTime) + 1,
            task,
            location,
            description,
            weekId: parseInt(week),
            driverId: driver
        }]
    }
    
    
    const weeklySchedule = scheduleData[driver][week]
    weeklySchedule.sort((a, b) => {
        return a.day - b.day
    });
    
    return res.render('schedule', {
        error: null,
        weeklySchedule
    });
}

exports.updateTask = (req, res) => {
    const { taskId, day, startTime, endTime, task, location, description, week, driverId } = req.body;
    let conflictingTask, itemToUpdate;

    scheduleData[driverId][week].forEach(task => {
        if (task.taskId === Number(taskId)) itemToUpdate = task;
    })
    const newSchedule = scheduleData[driverId][week].filter(task => task.taskId !== Number(taskId));
    
    const updatedTask = {
        taskId: taskId,
        day: parseInt(day),
        startTime: moment(startTime, 'HH a'),
        endTime: moment(endTime, "HH a"),
        startTimeBlock: parseInt(startTime) + 1,
        endTimeBlock: parseInt(endTime) + 1,
        task,
        location,
        description,
        weekId: parseInt(week),
        driverId: driverId
    }
    
    newSchedule.forEach(i => {
        const newStart = moment(startTime, "HH a");
        const newEnd = moment(endTime, 'HH a');
        const existingRange = moment.range(i.startTime, i.endTime);
        const newRange = moment.range(newStart, newEnd)

        if(i.day === parseInt(day) && (newRange.overlaps(existingRange) === true)){
            conflictingTask = i;
        }
    })
    if(conflictingTask){
        return res.render('confirm-update-task', {
            newTaskData: updatedTask,
            conflictingTask,
            itemToUpdate
        })
    }


    scheduleData[driverId][week] = newSchedule;
    newSchedule.push(updatedTask);

    return res.render('schedule', {
        weeklySchedule: newSchedule
    })
    
}

exports.viewSchedule = (req, res) => {
    const {driver, week} = req.body
    let weeklySchedule;
    scheduleData[driver][week] ? weeklySchedule = scheduleData[driver][week] : weeklySchedule = [];
    
    res.render('schedule', {
        weeklySchedule
    })
}

exports.editTask = (req, res) => {
    const {weekId, taskId, driverId} = req.body;
    const weeklySchedule = scheduleData[driverId][weekId];
    const taskData = weeklySchedule.filter(task => task.taskId === Number(taskId))[0];
    res.render('add-task', {
        edit: true,
        taskData
    })

}

exports.confirmNewTask = (req, res) => {
    const {driverId, weekId, existingTaskId, day, startTimeBlock, endTimeBlock, location, description, task} = req.body;

    const existingSchedule = scheduleData[driverId][parseInt(weekId)];
    const newSchedule = existingSchedule.filter(task =>  task.taskId !== Number(existingTaskId));
    scheduleData[driverId][parseInt(weekId)] = newSchedule;

    const newTask = {
        taskId: Math.random(),
        day: parseInt(day),
        startTime: moment(startTimeBlock - 1, "HH a"),
        endTime: moment(endTimeBlock - 1, "HH a"),
        startTimeBlock: parseInt(startTimeBlock),
        endTimeBlock: parseInt(endTimeBlock),
        task,
        location,
        description,
        weekId: parseInt(weekId),
        driverId: driverId
    };
    let newTaskData, existingTask;

    newSchedule.forEach(i => {
        const newStart = moment(newTask.startTime, "HH a");
        const newEnd = moment(newTask.endTime, 'HH a');
        const existingRange = moment.range(i.startTime, i.endTime);
        const newRange = moment.range(newStart, newEnd)
        if(i.day === parseInt(day) && (newRange.overlaps(existingRange) === true)){
            newTaskData = newTask;
            existingTask = i;
        }
    })

    if(newTaskData) {
        return res.render('confirm-new-task', {
            newTaskData,
            existingTask
        })
    }
    
    newSchedule.push(newTask);
    scheduleData[driverId][parseInt(weekId)] = newSchedule

    return res.render('schedule', {
        weeklySchedule: newSchedule
    })
}

exports.confirmUpdatedTask = (req, res) => {
    const { day, startTimeBlock, endTimeBlock, task, location, description, weekId, driverId, conflictingTaskId, existingTaskId } = req.body;
    let conflictingTask
    
    const existingSchedule = scheduleData[driverId][weekId];
    const removeExistingTask = existingSchedule.filter(task => task.taskId !== Number(existingTaskId));
    const newSchedule = removeExistingTask.filter(task => task.taskId !== Number(conflictingTaskId));
    scheduleData[driverId][weekId] = newSchedule;

    const updatedTask = {
        taskId: existingTaskId,
        day: parseInt(day),
        startTime: moment(startTimeBlock - 1, 'HH a'),
        endTime: moment(endTimeBlock - 1, "HH a"),
        startTimeBlock: startTimeBlock,
        endTimeBlock: endTimeBlock,
        task,
        location,
        description,
        weekId: parseInt(weekId),
        driverId: driverId
    }

    newSchedule.forEach(i => {
        const newStart = moment(updatedTask.startTime, "HH a");
        const newEnd = moment(updatedTask.endTime, 'HH a');
        const existingRange = moment.range(i.startTime, i.endTime);
        const newRange = moment.range(newStart, newEnd)

        if(i.day === parseInt(day) && (newRange.overlaps(existingRange) === true)){
            conflictingTask = i;
        }
    })
    if(conflictingTask){
        return res.render('confirm-update-task', {
            newTaskData: updatedTask,
            conflictingTask,
            itemToUpdate: updatedTask
        })
    }

    newSchedule.push(updatedTask);

    return res.render('schedule', {
        weeklySchedule: newSchedule 
    })  
}

exports.deleteTask = (req, res) => {
    const {weekId, taskId, driverId} = req.body

    const searchSchedule = scheduleData[driverId][weekId];
    const updatedTasks = searchSchedule.filter(task => Number(task.taskId) !== Number(taskId));
    scheduleData[driverId][weekId] = updatedTasks
    const weeklySchedule = scheduleData[driverId][weekId];
    res.render('schedule', {
        weeklySchedule
    })
}