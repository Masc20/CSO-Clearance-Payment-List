# CSO Clearance Payment List

This is a lightweight, local-storage based web application designed for ACLC College of Butuan's CSO (Community Service Organization) to manage student payments for clearance. It provides a simple student-facing form for submission and an administrative dashboard for managing records and application settings.

## Features

### Student Form
*   **Two-Step Submission:** Students first select their "Course & Section" from a dropdown.
*   **Student Information Input:** After section selection, students can input their First Name, Last Name, and Middle Name.
*   **Fixed Payment Amount:** A read-only field displays the payment amount, which is configurable by administrators.
*   **Rapid Entry:** After a successful submission, the form clears student details but keeps the section selected, allowing for quick consecutive entries for students from the same section.
*   **Validation:** Ensures all required fields are filled before submission.

### Admin Dashboard
*   **Student Records Table:** Displays a comprehensive list of all student submissions.
*   **Filtering:** Filter records by text search (name, section) and by a specific "Course & Section" dropdown.
*   **Export to Excel:** Export the *filtered* student records to an `.xlsx` file for easy reporting.
*   **Manage Application Settings:**
    *   **Course & Section Management (CRUD):** Administrators can add new course-section combinations or remove existing ones, directly affecting the options available in the student form.
    *   **Payment Amount Configuration:** Administrators can update the default payment amount.
*   **Edit Student Details:** Allows administrators to correct student information for any submitted record.
*   **Delete Records:** Permanently remove individual student records.

### Technology Stack
*   **Frontend Framework:** React (with TypeScript)
*   **Build Tool:** Vite
*   **Routing:** React Router DOM
*   **State Management:** React's `useState` and `useEffect` hooks.
*   **Data Persistence:** Browser's `localStorage` (no backend required).
*   **Excel Export:** SheetJS (`xlsx` library).
*   **Icons:** Lucide React.
*   **Styling:** Pure CSS (for a lightweight and clean design).

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

You need to have Node.js and npm (or yarn/pnpm) installed on your system.
*   [Node.js (includes npm)](https://nodejs.org/en/download/)

### Installation

1.  **Clone the repository (or extract the project files):**
    If you're starting from scratch, you would typically clone a repository. Since this project was created interactively, you likely have a directory named `cso-clearance-payment-list`. Ensure you are in the parent directory of this project.

2.  **Navigate into the project directory:**
    ```bash
    cd cso-clearance-payment-list
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Copy Logo Files:**
    Ensure `aclc-20logo.png` and `cso-logo.png` are present in the `public/` directory of the project. If they are in the parent directory, copy them:
    ```bash
    # From the parent directory (e.g., C:\Users\Documents\CSO\)
    copy aclc-20logo.png cso-clearance-payment-list\public\
    copy cso-logo.png cso-clearance-payment-list\public\
    ```
    *(Note: Use `cp` instead of `copy` on Linux/macOS, or `Copy-Item` in PowerShell.)*

### Running the Application

To start the development server:
```bash
npm run dev
```
The application will usually be available at `http://localhost:5173/`. Open this URL in your web browser.

## Usage

### Student Form
1.  Navigate to the root URL (e.g., `http://localhost:5173/`).
2.  **Step 1:** Use the dropdown to select the "Course & Section" (e.g., "BSIT - 1A"). You must select a section to proceed.
3.  **Step 2:** Enter the student's First Name, Last Name, and Middle Name.
4.  The payment amount will be pre-filled as read-only.
5.  Click "Submit Payment".
6.  Upon successful submission, the student's name fields will clear, allowing you to quickly enter another student for the *same* section. You can click "Change Section" to go back to Step 1.

### Admin Dashboard
1.  Navigate to the `/admin` route (e.g., `http://localhost:5173/admin`).
2.  **View Records:** All submitted student payments are displayed in a table.
3.  **Filtering:**
    *   Use the text input to search by student name (first, last, middle) or section.
    *   Use the "All Sections" dropdown to filter by a specific Course & Section.
4.  **Export to Excel:** Click the "Export Filtered" button to download an Excel file (`CSO_Clearance_Payments.xlsx`) containing only the currently visible (filtered) data.
5.  **Manage Settings:**
    *   Click "Manage Settings" to expand the settings panel.
    *   **Default Payment Amount:** Enter a new amount and click "Save" to update it. This will affect future submissions.
    *   **Manage Courses & Sections:**
        *   To add a new section, type it in the input field (e.g., "BSIS - 1A") and click the "+" button.
        *   To remove a section, click the "X" button next to its tag.
6.  **Edit Student Details:** Click the "Edit" (pencil) icon next to a student record to open a modal where you can modify their details. Save changes to update the record.
7.  **Delete Records:** Click the "Delete" (trash can) icon next to a student record to permanently remove it.

## Data Storage

All application data (student submissions, application settings) is stored directly in your browser's `localStorage`. This means:
*   No backend server or database is required.
*   Data is specific to the browser and device you are using.
*   Clearing your browser's cache or local storage will delete all application data.

---

Feel free to extend or modify this application as needed!