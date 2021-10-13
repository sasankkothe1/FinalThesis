# Running the web application locally

The web is application developed with fronted as [React App](https://github.com/facebook/create-react-app) and backend on **python**, more specifically using [FLASK](https://flask.palletsprojects.com/en/2.0.x/quickstart/).

## Pre-Requisites

Please make sure that the following are pre-installed.
- [Git](https://git-scm.com/)
- [Node JS](https://nodejs.org/en/)
- [Python 3](https://www.python.org/) and 
- [MongoDB](https://www.mongodb.com/).

In addition to the above, you also need `filestore` to run the project locally. Due to privacy reasons, the file store it not included in the repository. Please contanct `Hendrik Weber` to get the `filestore` folder.

The intallation of above depends on the OS on which the application has to be run locally. Please follow the official docs and make sure everything is installed correctly.

## Clone the project

Open the terminal(or command prompt if windows) and navigate to the folder where the project has to be cloned. Please follow the following steps.

-Before cloning the project, create a `project` folder at the location where the repository has to be cloned.
- In terminal, navigate into the project folder.
- Copy the `filestore` folder inside the `project` folder.
- Make sure the `ssh_key` is added to your gitlab account.
- Make sure you have been added to the list of [project members](https://docs.gitlab.com/ee/user/project/members/) in gitlab.
- Clone the repository inside `project` folder.

```
git clone git@gitlab.lrz.de:ga53xil/psplib.git
```
- Unzip the downloaded folder `psplib`.

## Setting up the database.

Please refer to **Thesis Documentation** to setup the database. Please make sure to name the data base as `psplib2` as observed in the ~line 48~ in  **model/flaskServer.py** file. Otherwise, change database name in **flaskServer.py** accordingly to the same database name you wish to keep in mongodb.

## Running Frontend

- Navigate to `frontend` folder inside `psplib`.
- Install `dependencies`.
```
npm install
```
- To start the project, run the following srcript.
```
npm start
```
- Enter the URL `localhost:3000` in the browser.

To navigate through the functionlaity, backend (in this case, it is model) should be started.

Before running the model, please obeserve the comments in the file `frontend/src/services/backendConfig.js`. Uncomment lines 6-9 and comment lines 13-16. This points the backend to the local database instance.

## Running frontend

- Navigate to `model` folder inside `psplib`.
- Install **virtual environment** inside `model` folder.
```
python3 -m venv venv
```
A folder `venv` will be created inside `model`.
- To acitvate the virtual environment, please follow the [documentation](https://docs.python.org/3/library/venv.html#creating-virtual-environments).
- After virtual environment is activated, install python dependencies.
```
pip install -r requirements.txt
```
- Set environment variables for flask application to run.
```
export FLASK_APP=flaskServer.py
export FLASK_ENV=development
```
- Run the flask application using following command.
```
flask run
```
- Now, functionality of the website works!

## Login details

- To open `Admin UI`, please enter the following username and password in the login page.
```
Username: psplib-admin

Password: psplib-admin-password
```
- To open `user UI`, please enter the following username and passoword in the login page.
```
Username: psplib-secret-username

Password: psplib-secret-password
``` 

## Deploying in Virtual Environment/Server

Please refer to **Thesis Documentation** to host the website on a server.
