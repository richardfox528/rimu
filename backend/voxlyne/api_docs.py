# Define the descriptions for each API
API_DESCRIPTIONS = {
    "Accounts": """
    API for user management and authentication.
    
    This API allows:
    - User registration
    - Login
    - Profile management
    - JWT authentication
    - Custom dashboard
    """,
    "Employees": """
    API for employee management.
    
    This API allows:
    - Management of employee information
    - Assignment to companies
    - Department control
    - Management of roles and positions
    """,
    "Documents": """
    API for document management.
    
    This API allows:
    - Creation and management of documents
    - Version control
    - Digital signature
    - Authenticity validation
    """,
    "Documents_copies": """
    API for managing document copies.
    
    This API allows:
    - Control of authorized copies
    - Version tracking
    - Authenticity validation
    - Change logging
    """,
    "Companies": """
    API for company management.
    
    This API allows:
    - Company registration
    - Management of company information
    - Association with employees
    - Document control
    """,
    "Employment_history": """
    API for managing employment history.
    
    This API allows:
    - Recording of work experience
    - Control of dates and positions
    - Experience validation
    - Professional tracking
    """,
}

# API documentation settings configuration
API_DOCUMENTATION_SETTINGS = {
    "TITLE": "Voxlyne API",
    "DESCRIPTION": "Comprehensive system for managing employment histories and documentation",
    "VERSION": "1.0.0",
    "TERMS_OF_SERVICE": "#",
    "CONTACT": {
        "name": "Voxlyne Support",
        "email": "support@voxlyne.com",
    },
    "LICENSE": {
        "name": "BSD License",
    },
    "SPECS": [
        {
            "title": "Accounts API",
            "description": API_DESCRIPTIONS["Accounts"],
            "urlconf": "Accounts.urls",
        },
        {
            "title": "Employees API",
            "description": API_DESCRIPTIONS["Employees"],
            "urlconf": "Employees.urls",
        },
        {
            "title": "Documents API",
            "description": API_DESCRIPTIONS["Documents"],
            "urlconf": "Documents.urls",
        },
        {
            "title": "Documents Copies API",
            "description": API_DESCRIPTIONS["Documents_copies"],
            "urlconf": "Documents_copies.urls",
        },
        {
            "title": "Companies API",
            "description": API_DESCRIPTIONS["Companies"],
            "urlconf": "Companies.urls",
        },
        {
            "title": "Employment History API",
            "description": API_DESCRIPTIONS["Employment_history"],
            "urlconf": "Employment_history.urls",
        },
    ],
}
