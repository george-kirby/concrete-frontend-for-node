# Concrete

Concrete is a task-management app which guides the user to define their tasks vividly, rather than vaguely, making follow-through more likely. 

On task creation, the user enters a date, time, cue and precise, concrete steps. 

## Site

http://concrete-frontend.herokuapp.com

(You don't have to enter a real email address.)

## Demo

![demo gif](./src/demo/concreteMinimalDemo.gif)

## Using the app

### Navigation

**HOT** - your most urgent task

**TASKS** - a list of all your outstanding tasks, ordered by action time
* the progress bar shows how many of your existing tasks you have completed
* click on a task's card to view it in more detail

**NEW** - create a new task

### Task creation

Click **NEW**, then enter a value in each field. (Tags are optional.)

For guidance, click the question mark (?) icon next to each field, or the blue 'Tutorial' button in the top right. 

### Editing a task

From **TASKS**, click on the task's card to view it in more detail, then click 'Edit task'. Here you can edit any part of a task, or delete it entirely. 

### Completing a task

There are two ways to do this:
* step-by-step: on a single task's detail page, click 'Tick off' next to the relevant step.
* whole task: on the **TASKS** page, click and hold on a task's card, then drag it to the progress bar on the left and drop it in!

## Future development

There are a number of potential improvements to be made to the app:
- the **progress bar** currently shows the number of tasks completed out of all existing tasks. After a while it wouldn't be very interesting, with only a tiny unnoticeable increase if, say, the user completed task 925 out of 1000 total tasks. A better progress bar might be refreshed every Monday, so the user would gain satisfaction from seeing it gradually rise over the week.
- better **styling** for use on a **phone** (and more interesting styling in general!)
- **reordering tasks** through drag-and-drop on the tasks page. 
- **sending a notification** to the user's computer or phone at a task's action time to remind them to do it. 

Feel free to write some code towards these improvements, or suggest more features! :)

## Built with

Frontend: [React](https://reactjs.org/)

[Backend](https://github.com/george-kirby/concrete-backend): [Rails](https://rubyonrails.org/)

Styling: [Semantic UI React](https://react.semantic-ui.com/)

## Author

George Kirby

## License

[None](https://choosealicense.com/no-permission/) - default copyright laws apply.

## Acknowledgements

This app was inspired by a passage in [Mindset](https://www.amazon.co.uk/Mindset-How-Fulfil-Your-Potential/dp/1780332009) by Carol Dweck (following [research](https://pdfs.semanticscholar.org/4c21/6c0ceeef2e2745d113c77a417133c2084dd9.pdf) by Peter Gollwitzer). When it comes to setting goals, "vowing, even intense vowing, is often useless...What works is making a vivid, concrete plan" (pg. 228).