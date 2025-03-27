# College Chatbot

A modern chatbot application for college queries using Next.js frontend and Flask backend with ML/NLP capabilities.

## Features

- Modern UI with Next.js and Tailwind CSS
- Flask backend with ML-powered responses
- Real-time chat interface
- Responsive design
- College-specific information and queries

## Tech Stack

- Frontend: Next.js, Tailwind CSS, TypeScript
- Backend: Flask, Python
- ML/NLP: scikit-learn, NLTK, spaCy

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Start the backend server:
```bash
python app/main.py
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Enter your college-related queries in the search bar
3. The chatbot will provide relevant information about admissions, courses, and campus facilities

## API Endpoints

- `POST /api/chat`: Send queries to the chatbot
  - Request body: `{ "message": "your query" }`
  - Response: `{ "response": "chatbot response" }`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 