# Concrete

Concrete is a task-management app which guides the user to define their tasks vividly, rather than vaguely. 
The user enters a date, time, cue and precise, concrete steps. 

**demo gif**

## Getting started

## Online

Go to **web address**

Pending deployment

## On your local machine

### Prerequisites

[React](https://reactjs.org/)

## Using the app

Simply enter a Github username into the text-field and submit. 

Forked Tongue then sends a request to the [Github API](https://developer.github.com/v3/), to access data on 100 of that user's repositories, and counts the frequency of programming languages, based on which language is the main one for each repository. The most commonly used language is presented as probably being that user's favourite!

The demo gif above shows an example with george-kirby (me).

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