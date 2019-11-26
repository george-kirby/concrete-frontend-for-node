# Concrete

Concrete is a task-management app which guides the user to define their tasks vividly, rather than vaguely. 
The user enters a date, time, cue and precise, concrete steps. 

![demo gif](https://media.giphy.com/media/Suy1ezFMTqP8OVOcYT/giphy.gif)

## Getting started

### Online

Visit https://concrete-frontend.herokuapp.com/

You don't have to enter your real email address - fakename@email.com will be fine. 

## Using the app



## Future development

There are a number of potential improvements to be made to the app:
- tests! As a recent software engineering graduate, I am just starting to learn to implement tests in my apps. This app contains the first (very basic) test I have written, and there is a lot of room for improvement. 
- multiple requests, to get *all* of the user's repositories. At present Forked Tongue only looks at (up to) 100 repositories of each user, due to the structure of the Github API. 
- making the request with an appropriate Authorization header (see the [Github API documentation](https://developer.github.com/v3/#authentication)) would allow for 5,000 requests every hour, rather than just 60. 
- a more detailed breakdown of the count of each language (eg a chart to show the frequency of each language)

Feel free to write some code towards these improvements, or suggest more features! :)

## Built with

[React](https://reactjs.org/)
[Rails](https://rubyonrails.org/)
[Semantic UI React](https://react.semantic-ui.com/)

## Author

George Kirby

## License

[None](https://choosealicense.com/no-permission/) - default copyright laws apply.