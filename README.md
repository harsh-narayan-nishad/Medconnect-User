src/
│
├── assets/                # Images, icons, logos
│
├── components/            # Reusable UI components (Buttons, Inputs, Dropdowns)
│   ├── common/            # Generic components used everywhere
│   ├── LoginSignup/       # Only Login/Signup specific UI
│   └── Layout/            # Navbar, Footer, Sidebar etc
│
├── pages/                 # Route level components
│   ├── Home.jsx
│   ├── DoctorSearch.jsx
│   ├── AppointmentSchedule.jsx
│   ├── UserDashboard.jsx
│   └── ...               
│
├── context/               # Context API Files (Global State)
│   ├── AuthContext.jsx
│   └── StateContext.jsx
│
├── constants/             # Static Data, Configs, Enums
│
├── services/              # API Calling functions (axios fetch calls)
│   └── userService.js
│
├── hooks/                 # Custom Hooks
│   └── useAuth.js
│
├── utils/                 # Helper functions, Formatters, Validators
│
├── App.jsx                # Root Component
├── main.jsx               # Entry Point
└── index.css              # Global CSS



