# Dental Checkup System (MERN Stack)

This project is a simple full-stack web application built using the **MERN** stack (MongoDB, Express.js, React.js, Node.js) to simulate a **Dental Checkup System**. It provides functionality for **patients** and **dentists** to interact with checkup requests, upload results, and generate PDF reports.

### Features

- **Patient Dashboard**
  - Register/Login as a patient.
  - View available dentists and request checkups.
  - View checkup results (images + notes).
  - Download checkup results as PDF.

- **Dentist Dashboard**
  - Register/Login as a dentist.
  - View checkup requests from patients.
  - Upload checkup images and add notes.
  - Provide results for patients.

### Technologies Used

- **Frontend**: React.js, Tailwind CSS (for styling)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Image Handling**: Multer (for image uploads)
- **PDF Generation**: jsPDF (for generating downloadable PDF files)
- **Authentication**: JWT (JSON Web Tokens)

---

## Setup and Installation

### Backend (API)

1. Clone the repository:
   ```bash
   git clone <repository-link>
   cd backend
