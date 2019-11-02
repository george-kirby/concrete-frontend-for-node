import React, { useState, useEffect } from "react"
import "../stylesheets/NewTaskForm.css"

const NewTaskForm = () => {
  const [casualDate, setCasualDate] = useState(null)
  const [calendarDate, setCalendarDate] = useState(null)
  const [casualTime, setCasualTime] = useState("morning")
  const [preciseTime, setPreciseTime] = useState(null)

  const handleSubmit = event => {
    event.preventDefault()
    console.log("form submitted!")
  }

  const currentDateTime = new Date()

  useEffect(() => {
    setCasualDate(casualDateOptions()[0])
  }, []);

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
        extras = [{ value: "thisAfternoon", display: "This afternoon" }, ...extras]
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
        <input name="title" type="text" placeholder="Task name..." required />
        <br />
        <label>
          What's a concrete first step?
          <br />
          <input
            name="step_act"
            type="text"
            placeholder={`eg sit at desk with laptop`}
            required
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
              className={casualDate !== "tonight" ? "visible" : `hidden`}
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
            required
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
