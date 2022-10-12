# KK Images

KK Images is a free online service for photographers who want to showcase their works. There are no restrictions on the photographer's skills to register and post their works. Non photographers can also register to the site and follow the photographers. They can like and leave comments to the works posted by the photographers.

This platform also can be used to share photography experiences, techniques, looking for a photographer and general discussions. The registered photographers on this site can be contacted when they leave an email address in their profile page.

Click [here](https://kkimages.herokuapp.com/) to access the frontend of the live site.

*Screenshot - Mockup on KKImages App, generated from [Multi Device Website Mockup Generator](https://techsini.com/multi-mockup/index.php)*

![Screenshot on Mockup](readme/images/site-mockup.png)

---
## Table of Contents
* [Objectives](#objectives)
    * [Application Goals](#application-goals)
    * [User Goals](#user-goals)
* [Application Design](#application-design)
    * [React Application](#react-application)
    * [Initial Design](#initial-design)
        * [Wireframe Designs](#wireframe-designs)
    * [Design Approach](#design-approach)
        * [User Stories](#user-stories)
        * [Kanban Board](#kanban-board)
* [Project Requirements](#project-requirements)
* [Features](#features)
* [Future Features](#future-features)
* [Testing](#testing)
* [Bugs](#bugs)
* [Deployment](#deployment)
* [Tools](#tools)
* [Credits](#credits)
* [Acknowledgment](#acknowledgment)

---
### Objectives

The main objective of this site is to provide a platform for photographers to showcase their works online. The frontend and backend of this site has been built separately and use React and Django Rest Framework for the frontend to access the backend API.

The target audients are split into photographers and general users.

* Photographers – create and maintain photo albums
* General user – view photo albums, follow photographers, like and leave comments to photo albums

### Application Goals

* Create a community for photographers to share their works and potentially get hired to commission a job
* A platform that allows hobbyists to browse and get inspirations from the works posted by the photographers
* A platform that allows user to find and hire a photographer
* A platform to share expriences, photography techinques and general discussions.

### User Goals

* Any users can view posts on the site.
* Signup to create albums with photos.
* Registered users can maintain their personal profile and albums.
* Registered users can leave comments, like albums and follow other users.

*[Back to Contents](#table-of-contents)*

---
## Application Design

This part of the project is to design a frontend of to provide a user interface application for accessing the data from the backend. As mentioned in the objectives, the frontend application will be built using React.

### React Application

React is a powerful, open source JavaScript library used to create fast and interactive user interfaces. React applications are built by composed with small JavaScript components usually written in a special JavaScript syntax called JSX.

Individual components are completely independent of one another and each component act like a miniature web application. It has the ability to make HTTP requests, communicate with servers and APIs, communicate with one another, and update themselves in response to user interactions

React is responsible for the way the application looks and feels. Application user interface has multiple components and each component responsible small part of the user interface like a navigation menu, an individual tweet or post, a button, or a form. All components are completely independent of one another, and this means that individual parts of the user interface can update independently and in real time, without refreshing the page.

Components are also reusable, which means it can be reused over and over throughout the application.

By coupling it with a full stack framework like Django, you can build powerful full stack applications with interactive, asynchronous front ends capable of being completely disconnected and independent from the back end.

### Initial Design

This project will follow the React philosophy by building reusable components and coupling to the Django Rest Framework project https://kkimages-drf-api.herokuapp.com/

#### Wireframe Designs

The following are initial wireframe designs to meet the main objective.

*Wireframe - Home Page*

![Wireframe on Home Page](readme/images/wireframe-home-page.jpg)

*Wireframe - Example of an Album Detail Page with Photos*

![Wireframe on Album Detail with Photos Page](readme/images/wireframe-album-detail-page.jpg)

*Wireframe - Album Comments Page*

![Wireframe on Album Comments Page](readme/images/wireframe-album-comments-page.jpg)

*Wireframe - Albums by Profile Page*

![Wireframe on Albums by Profile Page](readme/images/wireframe-albums-by-profile-page.jpg)

### Design Approach

The development approach on this project is based on the Principles of Agile and use the common agile practices.

The design has broken down into User Stories and grouped into Epics. Each User Story has been allocated its priority, story point and set acceptance criteria and tasks. Timeboxing approach will be used to process the product backlog.

#### User Stories

There are 41 user stories identified for the frontend at the beginning of the project and they were grouped into 9 Epics as listed in the table below

**[User Stories Full Detailed Report (Click to view)](readme/user-stories/user-stories.md#user-stories)**

*Summary of Epics and User Stories*

![Summary of User Stories](readme/user-stories/frontend-user-stories-summary.jpg)

#### Kanban Board

In development, Kanban Board was used to schedule the execution of the user stories. This approach allows to allocating user stories by priority and monitoring each user story's progress.

The Kanban board below shows all the user stories were initially in the 'To Do' list column. Then at different stage of the development, each one is moved into 'In Progress' column and finally into 'Done' column when it has completed. All user stories that are not included in this iteration are moved into 'Out of Current Scope' column.

*Snapshot of the Kanban Board*

![Kanban Board](readme/images/kanban-board.png)

*[Back to Contents](#table-of-contents)*

---
## Features

*[Back to Contents](#table-of-contents)*

---
## Future Features

*[Back to Contents](#table-of-contents)*

---
## Testing

*[Back to Contents](#table-of-contents)*

---
## Bugs

*[Back to Contents](#table-of-contents)*

---
## Deployment

---
## Tools

*[Back to Contents](#table-of-contents)*

---
## Credits

*[Back to Contents](#table-of-contents)*

---
## Acknowledgment