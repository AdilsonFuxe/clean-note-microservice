[![Build Status](https://app.travis-ci.com/AdilsonFuxe/clean-note-microservice.svg?token=t2xw9a8wfNT3fQfP6P7A&branch=main)](https://app.travis-ci.com/AdilsonFuxe/clean-note-microservice)

<br />
<p align="center">
  <h1 align="center">Node.js Note Microservice</h1>

  <p align="center">
   A simple API built with Node.js that follows Clean Architecture + TDD + SOLID + DDD principles
    <br />
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Run With Docker](#run-with-docker)
- [Endpoints](#endpoints)
  - [Add Note](#add-note)
  - [Get One Note](#get-one-note)
  - [Delete Note](#delete-note)
  - [Get All Notes](#get-all-notes)

<!-- ABOUT THE PROJECT -->

## About The Project

### Built With

- [NodeJs](https://nodejs.org/)
- [Typescript](https://https://www.typescriptlang.org/)

<!-- GETTING STARTED -->

## Getting Started

to run the project you need to have npm installed on your machine and
the mongo DB

### Prerequisites

to get the npm https://www.npmjs.com/get-npm

### Installation

1. Clone the repo

```sh
git clone https://github.com/AdilsonFuxe/clean-note-microservice.git
```

2. Server configuration

Enter into the server folder

```sh
cd clean-note-microservice
```

3. inside the server folder run the following command to install all dependencies

```sh
npm install or yarn
```

4. to generate the build of the project run

```sh
npm run build or yarn build
```

5. to run the server

```sh
npm start or yarn start
```

6. to run the unit tests and the integration tests

```sh
npm test or yarn test
```

### Run With Docker

1. Enter into the server folder

```sh
cd clean-note-microservice
```

2. run the server

```sh
npm run up or yarn up
```

<br/>

## Endpoints

<br/>

### Add Note

**POST** `https:/localhost/api/v1/notes`

##### output example

```json
// POST https:/localhost/api/v1/notes

// Request Body
{
  "title": "any_title",
  "description": "any_name",
}

// Response Body
{
  "id": "any_id",
  "title": "any_title",
  "description": "any_name",
  "createdAt": "any_date",
  "updatedAt": "any_date",
}
```

<br/>

### Get One Note

**Get** `https:/localhost/api/v1/notes/id`

##### output example

```json
// https:/localhost/api/v1/notes/id

// Response Body
{
  "id": "any_id",
  "title": "any_title",
  "description": "any_name",
  "createdAt": "any_date",
  "updatedAt": "any_date"
}
```

<br/>

### Delete Note

**DELETE** `https:/localhost/api/v1/notes/id`

##### output example

#####

```json
// DELETE https:/localhost/api/v1/notes/id
```

<br/>

### Get all Notes

**GET** `https:/localhost/api/v1/notes`

##### output example

#####

```json
// GET https:/localhost/api/v1/notes

// response Body
[
  {
    "id": "any_id",
    "title": "any_title",
    "description": "any_name",
    "createdAt": "any_date",
    "updatedAt": "any_date"
  }
]
```
