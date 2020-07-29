const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const handleInterval2 = (driverSchedule) => {
    console.log(driverSchedule)
    const csvWriter = createCsvWriter({
        path: '../CSV_file/schedule.csv',
        header: [
            {id: 'timeFrame', title: 'TIME FRAME'},
            {id: 'pickup', title: 'PICK UP'},
            {id: 'dropoff', title: 'DROP OFF'},
            {id: 'other', title: 'OTHER'}
        ]
    })

    let dayCounter = 0;
    let day = 1;
    const ScheduleData = [];
    let timeFrame; 
    let pickup = 0; 
    let dropoff = 0; 
    let other = 0;

    Object.keys(driverSchedule).forEach(i => {
        for(let x = 1; x <= 7; x++){   
            driverSchedule[i].forEach(task => {
                if (dayCounter === 0) {
                    timeFrame = `day ${day} - day ${day + 1}`;
                }
                if (day === parseInt(task.day)) {
                    if (task.task === 'pickup') pickup += 1;
                    if (task.task === 'dropoff') dropoff += 1;
                    if (task.task === 'other') dropoff += 1;
                }
            });
            day += 1;
            dayCounter += 1;
            if (dayCounter === 2) {
                ScheduleData.push({
                    timeFrame,
                    pickup,
                    dropoff,
                    other
                })
                console.log(ScheduleData);
                dayCounter = 0;
                pickup = 0;
                dropoff = 0;
                other = 0;
            }
        }
    });

    console.log('FINAL: ', ScheduleData);

}

module.exports = {
    handleInterval2
}