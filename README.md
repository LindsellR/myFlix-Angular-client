#  MyFlixAngularClient

A responsive, single-page Angular application that allows users to explore a curated selection of classic movies. This is the Angular built front-end client for the [Movie-Geeks REST API](https://github.com/lindsellr/movie-geeks). There is also a React built front-end client you can find here https://movie-geeks-classics.netlify.app

[Live Demo](https://lindsellr.github.io/myFlix-Angular-Client/)

---

## Features

- User registration and login
- Browse a catalog of classic movies
- View detailed information about each film, director, and genre
- Add/remove movies to a list of personal favorites
- Update user profile and preferences
- Responsive design with Angular Material

---

## Tech Stack

- **Angular 19**
- **Angular Material**
- **TypeScript**
- **RxJS**
- **MongoDB, Express.js** (back-end API)

---

## Getting Started (Development)

Clone the project and install dependencies:

```bash
git clone https://github.com/lindsellr/myFlix-Angular-Client.git
cd myFlix-Angular-Client
npm install
````

Run the development server:

```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser. The app will auto-reload if you change any source files.

---

## Testing

### Run unit tests:

```bash
ng test
```

---

## Build for Production

To create a production build:

```bash
ng build --configuration production
```

This will compile the app into the `dist/myFlix-Angular-Client` folder, optimized for deployment.

---

## Deployment (GitHub Pages)

To deploy the app via `angular-cli-ghpages`:

```bash
npx angular-cli-ghpages --dir=dist/myFlix-Angular-Client/browser
```

Make sure your repository has a `gh-pages` branch and that GitHub Pages is set to deploy from `/ (root)` of that branch.


---

### AI Assistance Disclosure.   

Portions of this documentation were produced with the assistance of AI tools (e.g., OpenAI's ChatGPT). The final content has been reviewed and verified by the project developer for accuracy and alignment with the project.


