import UserSettings from './UserSettings'

const prepareTimeData = () => {
    const date = prepareDate()
    const [time, display_time] = prepareTime()
    const actual_time = `${date} ${time}` 
    return [actual_time, display_time]
  }

  const prepareDate = () => {
    let date
    let todayOptions = ["tonight", "thisAfternoon", "thisMorning", ""]
    if (todayOptions.includes(casualDate)) {
      date = currentDateTime.toISOString().slice(0, 10)
    } else if (casualDate === "tomorrow") {
        let tomorrow = new Date()
        tomorrow.setDate(currentDateTime.getDate() + 1)
      date = tomorrow.toISOString().slice(0, 10)
    } else {
      date = calendarDate
    }
    return date
  }

  const prepareTime = () => {
    let time
    let display_time
    if (casualDate === "tonight" || casualTime === "evening") {
        display_time = "evening"
        time = UserSettings.evening
    } else if (casualDate === "thisAfternoon" || casualTime === "afternoon") {
        display_time = "afternoon"
        time = UserSettings.afternoon
    } else if (casualDate === "thisMorning" || casualTime === "morning") {
        display_time = "morning"
        time = UserSettings.morning
    } else {
        display_time = preciseTime
        time = preciseTime
    }
    return [time, display_time]
  }