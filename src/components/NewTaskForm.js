import React, { useState } from "react"
import "../stylesheets/NewTaskForm.css"

const NewTaskForm = () => {
  const [casualDate, setCasualDate] = useState("tonight")
  const [calendarDate, setCalendarDate] = useState(null)
  const [casualTime, setCasualTime] = useState(null)
  const [preciseTime, setPreciseTime] = useState(null)

  const handleSubmit = event => {
    event.preventDefault()
    console.log("form submitted!")
  }

  const handleCasualDateChange = event => setCasualDate(event.target.value)
  const handleCalendarDateChange = event => setCalendarDate(event.target.value)
  const handleCasualTimeChange = event => setCasualTime(event.target.value)
  const handlePreciseTimeChange = event => setPreciseTime(event.target.value)

  return (
    <div>
      <form action="" onSubmit={handleSubmit}></form>
      <input name="title" type="text" placeholder="Task name..." />
      <br />
      <label>
        What's a concrete first step?
        <br />
        <input
          name="step_act"
          type="text"
          placeholder={`eg sit at desk with laptop`}
        />
      </label>
      <br />
      <div>
          <select
            name="casualDate"
            onChange={handleCasualDateChange}
            value={casualDate}
          >
            {/* dynamically calculate if this morning/this afternoon would be appropriate to show */}
            <option value="tonight">Tonight</option>
            <option value="tomorrow">Tomorrow</option>
            {/* <option value="tomorrow">Day after tomorrow</option> for day after tomorrow, dynamically calculated */}
            <option value="later">Later</option>
            {/* <input type="date">Date</input> */}
          </select>
          <input
            className={
              casualDate === "later" ? "visible" : `hidden`
            }
            type="date"
            name="calendar"
            onChange={handleCalendarDateChange}
          />
      </div>
      <div>
          <select
            className={casualDate !== "tonight" ? "visible" : `hidden`}
            name="timeDetail"
            type="text"
            onChange={handleCasualTimeChange}
          >
            <option value="" disabled selected>
              Choose a time
            </option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
            <option value="preciseTime">Precise time</option>
          </select>
          <input
            className={
              casualTime === "preciseTime" ? "visible" : `hidden`
            }
            type="time"
            name="preciseTime"
            onChange={handlePreciseTimeChange}
          />
      </div>
      <input name="cue" type="text" placeholder="" />
    </div>
  )
}

export default NewTaskForm
