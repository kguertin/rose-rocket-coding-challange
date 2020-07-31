const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const handleInterval = (driverSchedule, scheduleInterval) => {
    const csvWriter = createCsvWriter({
        path: 'schedule.csv',
        header: [
            {id: 'timeFrame', title: 'TIME FRAME'},
            {id: 'pickup', title: 'PICK UP'},
            {id: 'dropoff', title: 'DROP OFF'},
            {id: 'other', title: 'OTHER'}
        ]
    })

    let dayCounter = 0;
    let totalDays = 1;
    const ScheduleData = [];
    let timeFrame; 
    let pickup = 0; 
    let dropoff = 0; 
    let other = 0;

    Object.keys(driverSchedule).forEach(i => {
        for(let day = 1; day <= 7; day++){   
            if (dayCounter === 0) {
                timeFrame = `day ${totalDays} - day ${totalDays + (scheduleInterval - 1)}`;
            }
            driverSchedule[i].forEach(task => {
                if (day === parseInt(task.day)) {
                    if (task.task === 'pickup') pickup += 1;
                    if (task.task === 'dropoff') dropoff += 1;
                    if (task.task === 'other') dropoff += 1;
                }
            });
            totalDays += 1;
            dayCounter += 1;
            if (dayCounter === scheduleInterval) {
                ScheduleData.push({
                    timeFrame,
                    pickup,
                    dropoff,
                    other
                })
                dayCounter = 0;
                pickup = 0;
                dropoff = 0;
                other = 0;
            }
        }
    });

    csvWriter.writeRecords(ScheduleData)
    .then(() => {
        console.log('Schedule Created');
    });

}

module.exports = {
    handleInterval,
}