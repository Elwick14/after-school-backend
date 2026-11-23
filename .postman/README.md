# After School Classes - Back-End (Express.js)

REST API for the After School Classes web app (CST3144 coursework).
Built with Node.js, Express.js and the native MongoDB driver, with data stored in MongoDB Atlas.

## Links

- [Express.js App] GitHub repository: https://github.com/Elwick14/after-school-backend
- [Express.js App] render.com route that returns all the lessons: https://m01147721-after-school-backend.onrender.com/lessons
- [Vue.js App] GitHub repository: https://github.com/Elwick14/after-school-frontend
- [Vue.js App] GitHub Pages: https://elwick14.github.io/after-school-frontend/


## API routes

| Method | Route | What it does |
|--------|-------|--------------|
| GET | `/lessons` | Returns all lessons as JSON |
| POST | `/orders` | Saves a new order in the `order` collection |
| PUT | `/lessons/:id` | Updates any attribute of one lesson (e.g. the number of spaces) |
| GET | `/images/<file>` | Serves a lesson image, or returns an error message if it doesn't exist |

## Middleware

- **Logger:** prints the time, method and URL of every request to the server console.
- **Static files:** serves images from the `images` folder.

## Running locally

```
npm install
MONGO_URI="your-atlas-connection-string" node server.js
```