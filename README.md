# Prisma ORM API

A RESTful API built using Prisma ORM, PostgreSQL, Node.js, and Express.js. This project demonstrates Prisma data modeling, database relationships, CRUD operations, and pagination.

## Features

- Prisma ORM for database modeling and queries
- PostgreSQL support via `pg`
- Express.js REST API routes for users, posts, and comments
- Prisma migrations and generated client code
- Environment-based database configuration

## Project Structure

```text
Prisma ORM/
├── config/
│   └── db.js
├── controllers/
│   ├── CommentController.js
│   ├── PostController.js
│   └── user.controllers.js
├── generated/
│   └── prisma/
│       ├── browser.ts
│       ├── client.js
│       ├── client.ts
│       └── ...
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│       ├── 20260621195849_init/
│       ├── 20260622144022_added_post_and_comment_field/
│       └── 20260622185829_changed_commentcount_from_big_int_to_int/
├── routes/
│   ├── comment.routes.js
│   ├── post.routes.js
│   └── user.routes.js
├── prisma.config.ts
├── server.js
├── package.json
├── package-lock.json
└── .env
```

## Setup

1. Install dependencies:

```bash
cd "Prisma ORM"
npm install
```

2. Configure the database connection in `.env`.

3. Generate Prisma client and run migrations if needed:

```bash
npx prisma generate
npx prisma migrate deploy
```

## Run

```bash
npm start
```

The API starts in watch mode using `node --watch server.js`.

## API Routes

- `POST /api/user/add` - create a new user
- `PUT /api/user/update/:id` - update an existing user
- `GET /api/user/` - get all users
- `GET /api/user/:id` - get a user by ID
- `DELETE /api/user/delete/:id` - delete a user

- `POST /api/post/add` - create a new post
- `PUT /api/post/update/:id` - update an existing post
- `GET /api/post/` - get all posts
- `GET /api/post/search` - search posts
- `GET /api/post/:id` - get a post by ID
- `DELETE /api/post/delete/:id` - delete a post

- `POST /api/comment/add` - create a new comment
- `PUT /api/comment/update/:id` - update an existing comment
- `GET /api/comment/` - get all comments
- `GET /api/comment/search` - search comments
- `GET /api/comment/:id` - get a comment by ID
- `DELETE /api/comment/delete/:id` - delete a comment

## Notes

- API entrypoint: `server.js`
- Database config: `config/db.js`
- Prisma schema: `prisma/schema.prisma`
- Controllers: `controllers/`
- Routes: `routes/`

> This README includes the current project structure and usage information for the Prisma ORM API.
