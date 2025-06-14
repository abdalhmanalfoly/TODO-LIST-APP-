# Smart Todo List
🧩 Overview
This project is a client-side React-based To-Do List web application that allows users to manage daily tasks while also displaying technical details 

🚀 Features
Feature	Description
✅ Add Tasks	Users can input and add new tasks.
✏️ Edit Tasks	Tasks can be edited via a prompt modal.
❌ Delete Tasks	Tasks can be removed from the list.
📌 Mark as Complete	Tasks can be marked as done using a checkbox.

⚙️ Technical Stack
React (Client Component in Next.js)

JavaScript (ES6+)

Tailwind CSS (for styling)

Browser localStorage (for task persistence)

navigator.userAgent for device detection

Fetch API for external IP retrieval

📂 File Structure (Simplified)
bash
Copy
Edit
📁 components
│   └── TodoForm.jsx  # Main component
│   └── ShowIP.jsx    # Reusable IP display component
🧠 Logic Breakdown
useEffect Hooks:
On initial load:

Load todos from localStorage

Fetch IP from https://api.ipify.org?format=json

On todos update:

Save the updated todo list to localStorage

🧑‍💻 Functions
addTodo(text) → Adds a new todo to the list

editTodo(id) → Opens prompt to edit selected task

deleteTodo(id) → Removes a task by ID

toggleComplete(id) → Toggles task completion status

setInfo({ deviceType, os, browser }) → Sets device/browser info

fetch(IP_API) → Gets public IP address using fetch

🎨 UI Overview
Dark theme with gradients from orange to black

Fully responsive design for mobile, tablet, and desktop

Uses Tailwind CSS for styling

Elegant, user-friendly task cards with status controls

📄 Example Screenshot
You can add screenshots here if you're preparing a GitHub README.md.

📦 API Used

GET https://api.ipify.org?format=json
