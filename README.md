# RIMU (LaboralHistory) Project

**Project Description**

RIMU leverages **blockchain technology** to create a secure and transparent platform for managing and sharing **verified, immutable work histories**. This innovative approach addresses the need for trustworthy employment records, benefiting both companies and individuals.

By recording employment details on a distributed ledger, RIMU ensures data integrity and prevents unauthorized alterations, providing a single source of truth for professional backgrounds.

The application features distinct experiences for different user roles (Companies and Employees/Users) with dedicated dashboards, accessible after authentication.

**Key Features & Benefits:**

*   **For Companies:**
    *   **Immutable Record Creation:** Companies can securely document employee work details (positions, dates, responsibilities, achievements, skills) onto the blockchain, creating permanent and tamper-proof records.
    *   **Enhanced Verification:** Simplifies the background check process by providing access to blockchain-verified employment data, increasing trust and reducing verification time/costs.

*   **For Employees/Users:**
    *   **Ownership & Control:** Users gain control over their verified, blockchain-based work history, accessing data shared by past employers.
    *   **Trusted Sharing:** Enables individuals to confidently share their immutable employment history with prospective employers or institutions, backed by the inherent security and transparency of the blockchain.
    *   **Data Portability:** Facilitates easier movement of verified career data across different platforms or applications in the future.

The application combines a user-friendly React frontend with a robust Django backend API that interacts with the underlying blockchain infrastructure. This ensures both ease of use and the high level of security and data integrity required for managing sensitive career information.

---

This project utilizes a Python/Django backend and a React frontend. It supports running via local development servers using a Python script or through containerization with Docker.

## 🛠️ Technology Stack

*   **Backend:** Python, Django
*   **Frontend:** React, React Router (for navigation), Tailwind CSS (for styling)
*   **Development:** Node.js/npm (for frontend dependencies and running the dev server)
*   **Containerization:** Docker, Docker Compose
*   **Environment Variables:** Managed via `.env` file (see `.env.example` for required variables)

## ✨ Frontend Overview

*   **Modern UI:** Built with React and styled using Tailwind CSS, featuring gradients, animations, and a responsive design.
*   **Component-Based:** Structured with reusable components (e.g., `Testimonials`, `Features`, `Stats`, `FAQ`).
*   **Key Sections (Landing Page):** Includes sections for Features, Statistics, Testimonials, FAQ, and Call-to-Action to inform users.
*   **Authentication:** Implements token-based authentication with redirects to role-specific dashboards (`/company-dashboard`, `/user-dashboard`).


## 📂 Project Structure

```
.
├── backend/            # Django backend code
├── frontend/           # React frontend code
│   └── src/            # Frontend source likely here
├── .env.example        # Example environment variables
├── docker-compose.yml  # Docker Compose configuration
├── package.json        # Node.js dependencies (project root or frontend?)
├── package-lock.json   # Node.js dependency lock file
├── run_dev_server.py   # Script to run development servers (Optional: for development and deployment in local.)
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## ✅ Prerequisites

*   Python 3.x
*   Node.js and npm
*   Docker and Docker Compose (Optional, for containerized deployment/development)
*   Git

## 🚀 Setup and Installation

1.  **Clone the repository:**
    ```powershell
    git clone https://github.com/richardfox528/rimu.git
    cd rimu
    ```
    *(Note: Changed `cd LaboralHistory` to `cd rimu` based on the clone URL. Adjust if your local folder name is different.)*

2.  **Backend Setup (Python Virtual Environment):**
    ```powershell
    # Create and activate virtual environment
    python -m venv venv
    .\venv\Scripts\activate

    # Install Python dependencies (assuming requirements.txt is in ./backend)
    pip install -r backend/requirements.txt
    ```
    *Note: If `requirements.txt` is missing or elsewhere, update the path or create the file.*

3.  **Frontend Setup (Node Modules):**
    ```powershell
    # Navigate to the frontend directory
    cd frontend

    # Install Node.js dependencies
    npm install

    # Go back to the root directory
    cd ..
    ```
    *Note: This assumes `package.json` for the frontend is located within the `frontend` directory. If it's in the root, adjust accordingly.*

4.  **Environment Variables:**
    *   Copy `.env.example` to `.env`:
        ```powershell
        copy .env.example .env
        ```
    *   Edit the `.env` file and replace placeholder values with your actual configuration details (Django Secret Key, Email settings, reCAPTCHA keys).

## ▶️ Running the Application

### Development Mode (Local Servers)

This method uses the `run_dev_server.py` script to start both the Django backend and the React frontend development servers simultaneously.

1.  **Ensure the Python virtual environment is activated:**
    ```powershell
    .\venv\Scripts\activate
    ```

2.  **Run the script from the project root directory:**
    ```powershell
    python run_dev_server.py
    ```

    *   The Django backend will typically run on `http://localhost:8000`.
    *   The React frontend will typically run on `http://localhost:3000`.

3.  Press `Ctrl+C` in the terminal where the script is running to stop both servers.

### Using Docker Compose

This method builds and runs the application using Docker containers as defined in `docker-compose.yml`.

1.  **Ensure Docker Desktop is running.**

2.  **Build and start the services from the project root directory:**
    ```powershell
    docker-compose up --build
    ```
    *   Add `-d` to run in detached mode: `docker-compose up --build -d`

    *   The Django backend service (`web`) will be accessible on `http://localhost:8000`.
    *   The Frontend service (`frontend`) will be accessible on `http://localhost:3000`.

3.  **To stop the services:**
    ```powershell
    docker-compose down
    ```

## 🔑 Environment Variables Required

The following environment variables need to be set in the `.env` file for the application to run correctly:

*   `SECRET_KEY`: Your Django secret key.
*   `EMAIL_HOST`: SMTP server address.
*   `EMAIL_PORT`: SMTP server port.
*   `EMAIL_USE_TLS`: Whether to use TLS (True/False).
*   `EMAIL_HOST_USER`: Email account username.
*   `EMAIL_HOST_PASSWORD`: Email account password.
*   `RECAPTCHA_PUBLIC_KEY`: Google reCAPTCHA site key.
*   `RECAPTCHA_PRIVATE_KEY`: Google reCAPTCHA secret key.
*   `RECAPTCHA_REQUIRED_SCORE`: Minimum score for reCAPTCHA v3 validation (e.g., 0.85).

---

## ⚙️ Optional Sections

### Database Migrations

Instructions on how to apply Django database migrations. Run these commands from the project root directory:

1.  **Activate the Python virtual environment:**
    ```powershell
    .\venv\Scripts\activate
    ```

2.  **Navigate to the backend directory:**
    ```powershell
    cd backend
    ```

3.  **Create migration files:**
    ```powershell
    # Ensure python alias 'py' is available or use 'python'
    py manage.py makemigrations
    ```

4.  **Apply migrations to create/update the database:**
    ```powershell
    # Ensure python alias 'py' is available or use 'python'
    py manage.py migrate
    ```

5.  **Go back to the root directory:**
    ```powershell
    cd ..
    ```

### Testing

Instructions on how to run frontend tests:

1.  **Navigate to the frontend directory:**
    ```powershell
    cd frontend
    ```

2.  **Run tests:**
    ```powershell
    npm run test
    ```
    or to include coverage:
    ```powershell
    npm run test:coverage
    ```

3.  **Go back to the root directory:**
    ```powershell
    cd ..
    ```

---

## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ricardo-mu%C3%B1oz-hoyos/)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/rockislife_co/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/dmwgj97) 