import React, { useState, useEffect } from "react"
import UserSettings from '../helpers/UserSettings'
import "../stylesheets/NewTaskForm.css"
import userSettings from "../helpers/UserSettings"
import API from '../adapters/API'

const NewTaskForm = () => {
  const [casualDate, setCasualDate] = useState("")
  const [calendarDate, setCalendarDate] = useState(null)
  const [casualTime, setCasualTime] = useState("morning")
  const [preciseTime, setPreciseTime] = useState(null)

  const handleSubmit = event => {
    event.preventDefault()
    const [actual_time, display_time] = prepareTimeData()

  }

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
        time = userSettings.evening
    } else if (casualDate === "thisAfternoon" || casualTime === "afternoon") {
        display_time = "afternoon"
        time = userSettings.afternoon
    } else if (casualDate === "thisMorning" || casualTime === "morning") {
        display_time = "morning"
        time = userSettings.morning
    } else {
        display_time = preciseTime
        time = preciseTime
    }
    return [time, display_time]
  }

  const currentDateTime = new Date()

  useEffect(() => {
    setCasualDate(casualDateOptions()[0].value)
  }, [])

  const handleCasualDateChange = event => {
    setCasualDate(event.target.value)
    //   if (event.target.value)
  }
  const handleCalendarDateChange = event => setCalendarDate(event.target.value)
  const handleCasualTimeChange = event => setCasualTime(event.target.value)
  const handlePreciseTimeChange = event => setPreciseTime(event.target.value)

  const casualDateOptions = () => {
    let extras = []
    if (currentDateTime.getHours() < 16) {
      extras = [
        { value: "thisAfternoon", display: "This afternoon" },
        ...extras
      ]
    }
    if (currentDateTime.getHours() < 12) {
      extras = [{ value: "thisMorning", display: "This morning" }, ...extras]
    }
    // const dayAfterTomorrow = {
    //     value: , display: `${}`
    // }
    return [
      ...extras,
      { value: "tonight", display: "Tonight" },
      { value: "tomorrow", display: "Tomorrow" },
      //   dayAfterTomorrow,
      { value: "later", display: "Later" }
    ]
  }

  const casualTimeOptions = [
    { value: "morning", display: "Morning" },
    { value: "afternoon", display: "Afternoon" },
    { value: "evening", display: "Evening" },
    { value: "preciseTime", display: "Precise time" }
  ]

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          placeholder="Task name..."
          // required
        />
        <br />
        <label>
          What's a concrete first step?
          <br />
          <input
            name="step_act"
            type="text"
            placeholder={`eg sit at desk with laptop`}
            // required
          />
        </label>
        <br />
        <label>
          When will you do this? <br />
          <div>
            <select
              name="casualDate"
              onChange={handleCasualDateChange}
              value={casualDate}
              required
            >
              {casualDateOptions().map(option => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.display}
                  </option>
                )
              })}
              {/* dynamically calculate if this morning/this afternoon would be appropriate to show */}
              {/* <option value="tomorrow">Day after tomorrow</option> for day after tomorrow, dynamically calculated */}
              {/* <input type="date">Date</input> */}
            </select>
            <input
              className={casualDate === "later" ? "visible" : `hidden`}
              type="date"
              name="calendar"
              onChange={handleCalendarDateChange}
              required={casualDate === "later"}
            />
          </div>
          <div>
            <select
              className={
                casualDate === "tomorrow" || casualDate === "later"
                  ? "visible"
                  : `hidden`
              }
              name="timeDetail"
              type="text"
              onChange={handleCasualTimeChange}
              value={casualTime}
              required={casualDate !== "tonight"}
            >
              {casualTimeOptions.map(option => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.display}
                  </option>
                )
              })}
            </select>
            <input
              className={casualTime === "preciseTime" ? "visible" : `hidden`}
              type="time"
              name="preciseTime"
              onChange={handlePreciseTimeChange}
              required={casualTime === "preciseTime"}
            />
          </div>
        </label>
        <label>
          Task cue: <br />
          <input
            name="cue"
            type="text"
            placeholder="eg after dinner"
            // required
          />
          {/* ^ dynamically set placeholder based on time choice eg morning -> after breakfast, evening -> after dinner */}
        </label>
        <br />
        <input type="submit" value="Create Task" />
      </form>
    </div>
  )
}

export default NewTaskForm
