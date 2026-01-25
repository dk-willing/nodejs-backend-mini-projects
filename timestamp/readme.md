# ⏳ Timestamp Microservice API

A robust, RESTful API microservice built with **Node.js** and **Express**.
This service parses time strings or Unix timestamps and converts them into JSON objects containing both the Unix timestamp and the UTC string representation.

![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)
![Express](https://img.shields.io/badge/Express-v4.17+-blue.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## 🚀 Features

- **Universal Parsing:** Accepts both standard date strings (e.g., `2026-01-25`) and Unix timestamps (e.g., `1451001600000`).
- **Current Time Support:** Returns the current time if no parameter is provided.
- **Robust Error Handling:** Returns clear HTTP 400 JSON responses for invalid dates.
- **Microservice Architecture:** Designed to be stateless and easily deployable.

## 🛠️ API Endpoints

### 1. Get Current Time

Returns the current Unix timestamp and UTC string.

- **URL:** `/api`
- **Method:** `GET`
- **Success Response:**
  ```json
  {
    "unix": 1769356394000,
    "utc": "Sun, 25 Jan 2026 15:53:14 GMT"
  }
  **Parse Date String**
  ```

Parses a human-readable date string.

URL: /api/:date

Example: /api/2025-12-25

Success Response:

JSON

{

"unix": 1766620800000,

"utc": "Thu, 25 Dec 2025 00:00:00 GMT"

}

**Parse Unix Timestamp**

Parses a Unix millisecond timestamp.

URL: /api/:timestamp

Example: /api/1451001600000

Success Response:

JSON
{

"unix": 1451001600000,

"utc": "Fri, 25 Dec 2015 00:00:00 GMT"

}

**Error Response**

If the provided date string is invalid.

Code: 400 Bad Request

Content:

JSON
{

"error": "Invalid Date"

}

**_💻 Installation & Setup
Clone the repository_**

git clone

-- Copy link and clone

Navigate to the project directory

cd into project-directory

Install dependencies

> > npm install

Start the server

Bash
node index.js

# Server runs on http://localhost:3000

📂 Project Structure
/timestamp-microservice
│
├── lib/
│ └── appError.js # Custom Error Class for operational errors
├── node_modules/ # Dependencies
├── index.js # Main application entry point & logic
├── package.json # Dependencies and scripts

└── README.md # Documentation
