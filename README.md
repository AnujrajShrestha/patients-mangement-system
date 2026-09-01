# 🏥 Patient Management System

A full-stack **Patient Management System** built with **FastAPI, React, Vite, Tailwind CSS, and JSON-based storage**.

The application provides a modern web interface for managing patient records while exposing a RESTful backend API for creating, viewing, updating, deleting, and sorting patient information.

The backend also uses **Pydantic validation** and automatically calculates each patient's **BMI and BMI health category** from their height and weight.

## 🚀 Live Demo

### Frontend

**Patient Management System**

[Open the Live Application](https://patients-mangement-system-1.onrender.com/)

### Backend API

**FastAPI Backend**

[Open Backend API](https://patients-mangement-system.onrender.com/)

### API Documentation

**Interactive Swagger UI**

[Open API Documentation](https://patients-mangement-system.onrender.com/docs)

The backend exposes interactive API documentation through FastAPI's Swagger UI at `/docs`. FastAPI automatically generates this documentation from the application's OpenAPI schema. ([FastAPI][3])

---

## 📌 Project Overview

The Patient Management System is designed as a practical full-stack backend/frontend project for managing structured patient records.

The application allows users to:

* View all patients
* Search/view an individual patient by ID
* Add new patients
* Edit existing patient information
* Delete patient records
* Sort patients by height, weight, or BMI
* Automatically calculate BMI
* Automatically determine BMI category
* Validate patient input using Pydantic
* Interact with the backend through REST APIs
* Use an interactive Swagger API interface for testing endpoints

The project follows a simple separation of concerns:

```text
Patient Management System
│
├── Frontend
│   ├── React
│   ├── Vite
│   ├── Tailwind CSS
│   └── Lucide React
│
├── Backend
│   ├── FastAPI
│   ├── Pydantic
│   ├── Uvicorn
│   └── REST API
│
└── Data Storage
    └── patients.json
```

The GitHub repository contains separate `frontend` and `backend` directories along with the shared `patients.json` data file. ([GitHub][1])

---

## ✨ Features

### 👤 Patient Management

The system supports complete CRUD operations:

* **Create** a patient
* **Read** patient records
* **Update** patient information
* **Delete** a patient

Each patient record contains:

* Patient ID
* Name
* City
* Age
* Gender
* Height
* Weight
* BMI
* BMI verdict

---

### 🧮 Automatic BMI Calculation

BMI is calculated automatically using:

```text
BMI = Weight / Height²
```

where:

* Weight is measured in kilograms
* Height is measured in meters

For example:

```text
Weight = 70 kg
Height = 1.75 m

BMI = 70 / (1.75²)
    = 22.86
```

The backend uses a Pydantic `computed_field` to calculate BMI dynamically. ([GitHub][4])

---

### 📊 BMI Classification

The application categorizes BMI values as:

| BMI Range      | Category    |
| -------------- | ----------- |
| `< 18.5`       | Underweight |
| `18.5 – 24.99` | Normal      |
| `25 – 29.99`   | Overweight  |
| `≥ 30`         | Obese       |

These categories are implemented directly in the backend's `Patient` model. ([GitHub][4])

> **Note:** BMI is a general screening metric and should not be treated as a medical diagnosis.

---

### 🔍 Patient Lookup

Patients can be retrieved individually using their patient ID.

Example:

```http
GET /patient/P001
```

If the requested patient does not exist, the API returns a `404` response.

---

### 📈 Patient Sorting

Patients can be sorted using:

* Height
* Weight
* BMI

Supported orders:

* Ascending
* Descending

Example:

```http
GET /sort?sort_by=bmi&order=asc
```

The backend validates both the requested field and sort order before processing the request. ([GitHub][4])

---

### 🛡️ Data Validation

The backend uses **Pydantic models** to validate incoming patient data.

Examples of validation include:

* Age must be greater than `0` and less than `120`
* Height must be greater than `0`
* Weight must be greater than `0`
* Gender must be one of:

  * `male`
  * `female`
  * `others`

This prevents invalid data from being accepted by the API. ([GitHub][4])

---

## 🧰 Tech Stack

### Frontend

| Technology       | Purpose                            |
| ---------------- | ---------------------------------- |
| React            | User interface                     |
| Vite             | Frontend development/build tooling |
| Tailwind CSS     | Styling                            |
| Lucide React     | Icons                              |
| JavaScript / JSX | Frontend development               |

The frontend package configuration currently uses React, React DOM, Vite, Tailwind CSS, `@vitejs/plugin-react`, `@tailwindcss/vite`, and Lucide React. ([GitHub][2])

### Backend

| Technology | Purpose                      |
| ---------- | ---------------------------- |
| Python     | Backend programming language |
| FastAPI    | REST API framework           |
| Pydantic   | Data validation and modeling |
| Uvicorn    | ASGI server                  |
| JSON       | Data persistence             |

The backend's dependency file contains FastAPI, Uvicorn, and Pydantic. ([GitHub][5])

### Deployment

| Service     | Platform |
| ----------- | -------- |
| Frontend    | Render   |
| Backend     | Render   |
| Source Code | GitHub   |

Render supports deploying FastAPI applications using Python, with Uvicorn commonly used as the production ASGI server. ([Render][6])

---

## 🏗️ Project Structure

```text
patients-mangement-system/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── runtime.txt
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AnimatedBackground.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── PatientForm.jsx
│   │   │   └── PatientTable.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── patients.json
└── README.md
```

The repository currently contains dedicated `backend` and `frontend` directories and a root-level `patients.json` file. ([GitHub][1])

The frontend components include `AnimatedBackground`, `Modal`, `PatientForm`, and `PatientTable`. ([GitHub][7])

---

# 🔌 API Documentation

Base URL:

```text
https://patients-mangement-system.onrender.com
```

Interactive documentation:

```text
https://patients-mangement-system.onrender.com/docs
```

---

## API Endpoints

### 1. Home

```http
GET /
```

Returns a basic API status message.

Example response:

```json
{
  "message": "Patient Management System API"
}
```

---

### 2. About

```http
GET /about
```

Returns information about the API.

Example response:

```json
{
  "message": "A fully functional API to manage your patient records"
}
```

---

### 3. View All Patients

```http
GET /view
```

Returns all patient records stored in `patients.json`.

---

### 4. View One Patient

```http
GET /patient/{patient_id}
```

Example:

```http
GET /patient/P001
```

Returns the patient associated with the specified ID.

If the patient does not exist:

```text
404 - Patient not found
```

The endpoint is implemented using a path parameter named `patient_id`. ([GitHub][4])

---

### 5. Sort Patients

```http
GET /sort
```

Query parameters:

```text
sort_by
order
```

Supported `sort_by` values:

```text
height
weight
bmi
```

Supported `order` values:

```text
asc
desc
```

Example:

```http
GET /sort?sort_by=weight&order=desc
```

The API validates both parameters and returns a `400` error when an unsupported field or order is provided. ([GitHub][4])

---

### 6. Create Patient

```http
POST /create
```

Example request:

```json
{
  "id": "P101",
  "name": "John Doe",
  "city": "Butwal",
  "age": 25,
  "gender": "male",
  "height": 1.75,
  "weight": 70
}
```

The backend calculates BMI and the BMI verdict automatically.

Example calculated values:

```json
{
  "bmi": 22.86,
  "verdict": "Normal"
}
```

If the patient ID already exists, the API returns a `400` response instead of creating a duplicate record. ([GitHub][4])

---

### 7. Update Patient

```http
PUT /edit/{patient_id}
```

Example:

```http
PUT /edit/P101
```

Request body:

```json
{
  "weight": 75
}
```

Only the fields supplied in the request are updated.

The backend then recreates the Pydantic patient object so that the calculated BMI and verdict are updated as well. ([GitHub][4])

---

### 8. Delete Patient

```http
DELETE /delete/{patient_id}
```

Example:

```http
DELETE /delete/P101
```

The patient is removed from the JSON data store.

If the patient does not exist, the API returns:

```text
404 - Patient not found
```

The delete endpoint is implemented in the FastAPI backend and persists the modified dataset back to `patients.json`. ([GitHub][4])

---

# 🗃️ Data Storage

This project intentionally uses a simple JSON file instead of a relational or NoSQL database.

```text
patients.json
```

The backend resolves the JSON file relative to the project root and provides helper functions for loading and saving the data. ([GitHub][4])

The basic data flow is:

```text
Frontend
   │
   │ HTTP Request
   ▼
FastAPI Backend
   │
   ├── Pydantic Validation
   │
   ├── Business Logic
   │
   └── JSON Read/Write
           │
           ▼
     patients.json
```

### Why JSON?

For a learning project, JSON storage provides:

* Simple implementation
* No database server required
* Easy inspection of stored data
* Easy local development
* Minimal infrastructure

For a production healthcare application, however, a proper database, authentication, authorization, encryption, auditing, backups, and stronger data-protection controls would be necessary.

---

# 🧪 Running the Project Locally

## Prerequisites

Install:

* Python
* Node.js
* npm
* Git

The backend repository currently specifies Python `3.14.3` in `runtime.txt`. ([GitHub][8])

---

## 1. Clone the Repository

```bash
git clone https://github.com/AnujrajShrestha/patients-mangement-system.git
```

```bash
cd patients-mangement-system
```

---

# 🐍 Backend Setup

Move into the backend directory:

```bash
cd backend
```

Create a virtual environment:

### Windows

```powershell
python -m venv .venv
```

Activate it:

```powershell
.venv\Scripts\activate
```

### Linux / macOS

```bash
python3 -m venv .venv
```

```bash
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

The current backend dependency file contains:

```text
fastapi
uvicorn
pydantic
```

([GitHub][5])

---

## 2. Start the Backend

From the `backend` directory:

```bash
uvicorn main:app --reload
```

The API should then be available at:

```text
http://127.0.0.1:8000
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

ReDoc:

```text
http://127.0.0.1:8000/redoc
```

FastAPI provides Swagger UI at `/docs` and ReDoc at `/redoc` by default. ([FastAPI][3])

---

# ⚛️ Frontend Setup

Open another terminal.

Move to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

The frontend package includes React, React DOM, Vite, Tailwind CSS, Lucide React, and the Vite React/Tailwind integrations. ([GitHub][2])

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# 🔗 Frontend ↔ Backend Architecture

The application follows a client-server architecture:

```text
                 ┌─────────────────────┐
                 │      React UI       │
                 │   Vite + Tailwind   │
                 └──────────┬──────────┘
                            │
                     HTTP / REST API
                            │
                            ▼
                 ┌─────────────────────┐
                 │      FastAPI        │
                 │      Backend        │
                 └──────────┬──────────┘
                            │
                     Pydantic Models
                            │
                            ▼
                 ┌─────────────────────┐
                 │    patients.json    │
                 │    Data Storage     │
                 └─────────────────────┘
```

This separation allows the frontend and backend to be developed and deployed independently.

The backend also enables CORS middleware so that browser-based frontend requests can communicate with the API. ([GitHub][4])

---

# 🌐 Deployment

The project is deployed using **Render**.

There are two separately deployed services:

```text
Frontend
   │
   └── patients-mangement-system-1.onrender.com

Backend
   │
   └── patients-mangement-system.onrender.com
```

Render supports FastAPI web services and requires the application server to bind to an externally accessible host/port in deployment environments. ([Render][6])

### Backend deployment concept

A typical Render FastAPI deployment uses:

```text
Build Command:
pip install -r requirements.txt

Start Command:
uvicorn main:app --host 0.0.0.0 --port $PORT
```

This follows Render's documented FastAPI deployment pattern. ([Render][6])

---

# 🔐 Security Considerations

This project is primarily an educational/full-stack development project and should **not be considered production-ready for handling real confidential medical information**.

For a production healthcare system, additional controls would be required, including:

* Authentication
* Role-based access control
* HTTPS enforcement
* Database-backed persistence
* Encryption at rest
* Encryption in transit
* Audit logging
* Input sanitization
* Rate limiting
* Secure CORS configuration
* Backup and disaster recovery
* Access monitoring
* Privacy and regulatory compliance

In particular, the current backend uses a permissive CORS configuration:

```python
allow_origins=["*"]
```

This is convenient for development but should normally be restricted to known frontend origins in a production application. ([GitHub][4])

---

# 🧠 What This Project Demonstrates

This project demonstrates several important backend and full-stack development concepts:

### Backend Development

* FastAPI application structure
* REST API design
* HTTP methods
* Path parameters
* Query parameters
* HTTP status codes
* Exception handling
* Pydantic models
* Pydantic field validation
* Computed fields
* JSON persistence
* CRUD operations
* CORS middleware

### Frontend Development

* React component architecture
* JSX
* Vite
* Tailwind CSS
* Component-based UI
* API integration
* Form handling
* Table-based data presentation
* Modal interfaces
* Responsive UI

### Deployment

* GitHub repository management
* Separate frontend/backend deployments
* Render deployment
* Python runtime configuration
* Production ASGI server configuration

---

# 📚 API Quick Reference

| Method   | Endpoint                | Purpose           |
| -------- | ----------------------- | ----------------- |
| `GET`    | `/`                     | API home          |
| `GET`    | `/about`                | API information   |
| `GET`    | `/view`                 | View all patients |
| `GET`    | `/patient/{patient_id}` | View one patient  |
| `GET`    | `/sort`                 | Sort patients     |
| `POST`   | `/create`               | Create patient    |
| `PUT`    | `/edit/{patient_id}`    | Update patient    |
| `DELETE` | `/delete/{patient_id}`  | Delete patient    |

---

# 🛠️ Future Improvements

Possible improvements for future versions include:

* [ ] Replace JSON storage with PostgreSQL
* [ ] Add SQLAlchemy ORM
* [ ] Add user authentication
* [ ] Add JWT-based authorization
* [ ] Implement role-based access control
* [ ] Add patient search and filtering
* [ ] Add pagination
* [ ] Add database migrations
* [ ] Add automated tests
* [ ] Add API versioning
* [ ] Add Docker support
* [ ] Add CI/CD with GitHub Actions
* [ ] Add production-grade logging
* [ ] Restrict CORS origins
* [ ] Add database backups
* [ ] Add stronger healthcare-data security controls

---

# 📂 Repository

The complete source code is available on GitHub:

[View Source Code](https://github.com/AnujrajShrestha/patients-mangement-system)

Repository structure currently separates the application into frontend and backend code, with `patients.json` serving as the project's data store. ([GitHub][1])

---

# 👨‍💻 Author

**Anuj Shrestha**

Developer focused on Python, backend development, FastAPI, machine learning, and full-stack application development.

GitHub:

[AnujrajShrestha](https://github.com/AnujrajShrestha)

---

# 📄 License

This project is intended for educational and development purposes.

If you plan to adapt this project for real healthcare use, review and implement the appropriate security, privacy, compliance, and data-governance requirements before handling real patient information.

---

## ⭐ Project Links

| Resource         | Link                                                                           |
| ---------------- | ------------------------------------------------------------------------------ |
| 🌐 Live Frontend | [Patient Management System](https://patients-mangement-system-1.onrender.com/) |
| ⚡ Backend API    | [FastAPI Backend](https://patients-mangement-system.onrender.com/)             |
| 📖 Swagger Docs  | [API Documentation](https://patients-mangement-system.onrender.com/docs)       |
| 💻 GitHub        | [Source Code](https://github.com/AnujrajShrestha/patients-mangement-system)    |

---

**Built with ❤️ using Python, FastAPI, React, Vite, and Tailwind CSS!**

