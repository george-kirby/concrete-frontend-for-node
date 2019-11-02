const orderTasks = tasks => {
    return tasks.sort((a, b) => {
        let initialReturn = jsDate(a.actual_time) - jsDate(b.actual_time)
        if (initialReturn !== 0) {
            return initialReturn
        } else {
            return a.position_at_time - b.position_at_time
        }
    })
}

const jsDate = dateFromDb => {
    return new Date(dateFromDb)
}

export default { orderTasks, jsDate }