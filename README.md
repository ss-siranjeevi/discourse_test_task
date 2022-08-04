# README

This is Ruby on rails + React project.

## Getting Started
To run the Project:
- Clone the repository to the local
- Open the terminal
- Run `bundle install` to install the gem specified
- Run **rails db:create** to create the database
- Start Rails server using command **rails s**
- Run **rails db:migrate** to run the migration. It will create the required database tables.
- Run `yarn install` to install the npm packages
- To start webpack server run **bin/webpack-dev-server**
- Open the browser and go to http://localhost:3000/


## Project Overview
- As you log in for the first time sign up by clicking `Sign up` button.
- Register by providing name, email and password.
- Once you registered successfully login with that credentials, You will be redirected to `/posts` page where you can view all the posts.
- At the top of the page we display the name of the user who has logged in.
- You can create the posts by clicking **CREATE POST +** button.
- In every post we display the name of the user who created that post.
- We have made some validations to the functionalities.
  - User can edit only his/her posts. They cannot edit other's post.
  - If the post do not contain any comments then we do not open COMMENT MODAL. 
  - Any user can able to comment on other's post.
  - We display the name of the user who commented near their comment.
- If you have to sign out,click the **SIGN OUT** button at the top.
