const createScheduleData = () => {
    const data = {
        driver1: {},
        driver2: {},
        driver3: {}
    }

    Object.keys(data).forEach(key => {
        for(let week = 1; week <= 52; week++){
            data[key][week] = [];
        }
    })

    return data
}

module.exports = { createScheduleData }