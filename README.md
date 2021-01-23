# User Application

A RESTful API that is used to store users details, which will have CRUD (Create, Read, Update, Delete) functions, allowing us to create a new user, get details of the
existing user, update details of existing user and delete an existing user.

1. Create POST /api/people Defines a unique URL to create a new person.
2. Read GET /api/people Defines a unique URL to read a collection of people.
3. Read GET /api/people/{user_id} Defines a unique URL to read a particular
person in the people collection.
4. Update PUT /api/people/{user_id} Defines a unique URL to update an existing
order.
5. Delete DELETE /api/remove/{user_id} Defines a unique URL to delete an
existing person.
6. Deploy on Heroku Server & Provide an active Link.
7. Make HTML View To Perform These Operation / Provide JSON Response with
respective operation.

### Prerequisites

Nodejs version: "14.15.3"

### Getting Started

* Clone the repository to your desired location on your local machine.
* Unpack the zip file and cd to the repository.
* Create a new .env file in the root directory, specifing the database connection url and port for the url e.g:
  DATABASE=mongodb://localhost:27017/db_name
  PORT=8000
* Run the following command to compile:
    ```
    npm install
    ```
* Running the following command will start the server:
    ```
    npm start
    ```
* Sever can be accessed on: http://localhost:8000

## Authors

* **Kshitij Bharde**
