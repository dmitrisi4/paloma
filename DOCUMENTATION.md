# Human Paloma - Complete Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Architecture](#architecture)
3. [Installation and Setup](#installation-and-setup)
4. [Project Structure](#project-structure)
5. [Backend](#backend)
   - [API](#api)
   - [Database](#database)
   - [Content Generation](#content-generation)
   - [Cron Tasks](#cron-tasks)
6. [Frontend](#frontend)
   - [Components](#components)
   - [Pages](#pages)
   - [API Integration](#api-integration)
7. [Development Processes](#development-processes)
8. [Deployment](#deployment)
9. [Extending Functionality](#extending-functionality)

## Introduction

Human Paloma is an innovative project that uses artificial intelligence to generate content on behalf of historical figures based on current news. The system automatically retrieves news from RSS feeds, selects a random historical figure, generates a post in the style of that figure based on the news, and then creates comments from other historical figures, simulating a discussion between them.

### Project Goals

- Create unique content that imitates the style and thinking of famous historical figures
- Provide users with an interesting perspective on modern news through the lens of historical figures
- Demonstrate the capabilities of artificial intelligence in content generation
- Create a platform for virtual discussions between historical figures

## Architecture

The Human Paloma project is built on a monorepo containing both frontend and backend applications. The project architecture follows microservice principles, where each component is responsible for its own functionality.

### General Architecture

```
+----------------+     +----------------+     +----------------+
|                |     |                |     |                |
|  RSS Sources   +---->+    Backend     +---->+   Frontend     |
|                |     |                |     |                |
+----------------+     +-------+--------+     +----------------+
                               |
                               v
                       +-------+--------+     +----------------+
                       |                |     |                |
                       |   MongoDB      |     |   Gemini API   |
                       |                |     |                |
                       +----------------+     +----------------+
```

### System Components

1. **RSS Parser**
   - Retrieves news from various RSS sources
   - Filters and processes news
   - Saves news for further processing

2. **Personality Generator**
   - Manages the database of historical figures
   - Provides information about personalities for content generation
   - Ensures the selection of appropriate personalities for comments

3. **Neural Network Module**
   - Integrates with Gemini API
   - Generates content in the style of the selected personality
   - Creates comments from other personalities

4. **Backend**
   - Provides REST API for the frontend
   - Manages the database
   - Coordinates the work of all components
   - Runs cron tasks for automatic content generation

5. **Frontend**
   - Displays the feed of posts and comments
   - Provides an interface for viewing personality profiles
   - Ensures user interaction with the system

## Installation and Setup

### Requirements

- Node.js 18+
- MongoDB
- pnpm (recommended) or npm
- Access to Gemini API (API key)

### Installation Steps

1. **Clone the Repository**

```bash
git clone <repository-url>
cd humanpaloma
```

2. **Install Dependencies**

```bash
# In the root directory
cd apps/backend
pnpm install

cd ../frontend
pnpm install
```

3. **Environment Variables Setup**

Create a `.env` file in the `apps/backend` directory with the following variables:

```
DATABASE_URL="mongodb://localhost:27017/humanpaloma"
GEMINI_API_KEY="your-gemini-api-key"
PORT=4000
NODE_ENV=development
RSS_SOURCES="https://feeds.bbci.co.uk/news/rss.xml,https://feeds.bbci.co.uk/news/technology/rss.xml"
```

4. **Database Setup**

```bash
# In the backend directory
pnpm prisma db push
pnpm seed # Populate the database with initial data
```

### Development Mode Launch

1. **Start the Backend**

```bash
# In the backend directory
pnpm dev
```

2. **Start the Frontend**

```bash
# In the frontend directory
pnpm dev
```

3. **Access the Application**

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000/api

## Project Structure

```
humanpaloma/
├── apps/
│   ├── backend/       # Express.js server
│   │   ├── prisma/    # Prisma schema and seeds
│   │   │   ├── schema.prisma  # Database schema
│   │   │   └── seed.ts        # Script for populating the database
│   │   ├── src/       # Backend source code
│   │   │   ├── controllers/  # API controllers
│   │   │   │   ├── posts.controller.ts
│   │   │   │   ├── comments.controller.ts
│   │   │   │   └── personalities.controller.ts
│   │   │   ├── middleware/   # Middleware
│   │   │   │   ├── error.middleware.ts
│   │   │   │   └── auth.middleware.ts
│   │   │   ├── routes/       # API routes
│   │   │   │   ├── posts.routes.ts
│   │   │   │   ├── comments.routes.ts
│   │   │   │   └── personalities.routes.ts
│   │   │   ├── services/     # Services
│   │   │   │   ├── ai/       # Content generation service
│   │   │   │   │   └── gemini.service.ts
│   │   │   │   └── news/     # News retrieval service
│   │   │   │       └── rss.service.ts
│   │   │   └── utils/        # Utilities
│   │   │       ├── logger.ts
│   │   │       └── helpers.ts
│   │   ├── index.ts          # Backend entry point
│   │   └── package.json
│   ├── data/         # Project data
│   │   └── personalities.json # Personality data
│   └── frontend/     # Next.js application
│       ├── src/
│       │   ├── components/   # React components
│       │   │   ├── Post/
│       │   │   ├── Comment/
│       │   │   └── Profile/
│       │   ├── hooks/        # React hooks
│       │   │   ├── usePosts.ts
│       │   │   └── usePersonalities.ts
│       │   ├── pages/        # Next.js pages
│       │   │   ├── index.tsx
│       │   │   ├── personalities/[id].tsx
│       │   │   └── api/
│       │   ├── services/     # Services for working with API
│       │   │   └── api.ts
│       │   ├── styles/       # Styles
│       │   │   └── globals.css
│       │   ├── types/        # TypeScript types
│       │   │   └── index.ts
│       │   └── utils/        # Utilities
│       │       └── formatters.ts
│       └── package.json
├── DOCUMENTATION.md  # Complete documentation
└── README.md        # Brief project description
```

## Backend

The Human Paloma backend is built on Express.js using TypeScript. It provides a REST API for the frontend, manages the MongoDB database through Prisma ORM, coordinates the work of all system components, and runs cron tasks for automatic content generation.

### API

#### Posts

- `GET /api/posts` - Get all posts
  - Request parameters:
    - `limit` (optional): Number of posts (default 10)
    - `offset` (optional): Offset (default 0)
  - Example response:
    ```json
    {
      "posts": [
        {
          "id": "1",
          "content": "Post text",
          "createdAt": "2023-01-01T12:00:00Z",
          "personalityId": "1",
          "personality": {
            "id": "1",
            "name": "Albert Einstein",
            "era": "20th century",
            "description": "Theoretical physicist"
          },
          "comments": [
            {
              "id": "1",
              "content": "Comment text",
              "createdAt": "2023-01-01T12:30:00Z",
              "personalityId": "2",
              "personality": {
                "id": "2",
                "name": "Nikola Tesla",
                "era": "19-20th century",
                "description": "Inventor"
              }
            }
          ]
        }
      ],
      "total": 100
    }
    ```

- `GET /api/posts/:id` - Get post by ID
  - Path parameters:
    - `id`: Post ID
  - Example response:
    ```json
    {
      "id": "1",
      "content": "Post text",
      "createdAt": "2023-01-01T12:00:00Z",
      "personalityId": "1",
      "personality": {
        "id": "1",
        "name": "Albert Einstein",
        "era": "20th century",
        "description": "Theoretical physicist"
      },
      "comments": [
        {
          "id": "1",
          "content": "Comment text",
          "createdAt": "2023-01-01T12:30:00Z",
          "personalityId": "2",
          "personality": {
            "id": "2",
            "name": "Nikola Tesla",
            "era": "19-20th century",
            "description": "Inventor"
          }
        }
      ]
    }
    ```

- `POST /api/posts` - Create a new post
  - Request body:
    ```json
    {
      "content": "Post text",
      "personalityId": "1"
    }
    ```
  - Example response:
    ```json
    {
      "id": "1",
      "content": "Post text",
      "createdAt": "2023-01-01T12:00:00Z",
      "personalityId": "1"
    }
    ```

- `PUT /api/posts/:id` - Update a post
  - Path parameters:
    - `id`: Post ID
  - Request body:
    ```json
    {
      "content": "Updated post text"
    }
    ```
  - Example response:
    ```json
    {
      "id": "1",
      "content": "Updated post text",
      "createdAt": "2023-01-01T12:00:00Z",
      "personalityId": "1"
    }
    ```

- `DELETE /api/posts/:id` - Delete a post
  - Path parameters:
    - `id`: Post ID
  - Example response:
    ```json
    {
      "success": true
    }
    ```

#### Comments

- `GET /api/comments` - Get all comments
  - Request parameters:
    - `limit` (optional): Number of comments (default 10)
    - `offset` (optional): Offset (default 0)
  - Example response:
    ```json
    {
      "comments": [
        {
          "id": "1",
          "content": "Comment text",
          "createdAt": "2023-01-01T12:30:00Z",
          "personalityId": "2",
          "postId": "1",
          "personality": {
            "id": "2",
            "name": "Nikola Tesla",
            "era": "19-20th century",
            "description": "Inventor"
          }
        }
      ],
      "total": 50
    }
    ```

- `GET /api/comments/:id` - Get comment by ID
  - Path parameters:
    - `id`: Comment ID
  - Example response:
    ```json
    {
      "id": "1",
      "content": "Comment text",
      "createdAt": "2023-01-01T12:30:00Z",
      "personalityId": "2",
      "postId": "1",
      "personality": {
        "id": "2",
        "name": "Nikola Tesla",
        "era": "19-20th century",
        "description": "Inventor"
      }
    }
    ```

- `GET /api/posts/:id/comments` - Get comments for a post
  - Path parameters:
    - `id`: Post ID
  - Example response:
    ```json
    {
      "comments": [
        {
          "id": "1",
          "content": "Comment text",
          "createdAt": "2023-01-01T12:30:00Z",
          "personalityId": "2",
          "postId": "1",
          "personality": {
            "id": "2",
            "name": "Nikola Tesla",
            "era": "19-20th century",
            "description": "Inventor"
          }
        }
      ]
    }
    ```

- `POST /api/comments` - Create a new comment
  - Request body:
    ```json
    {
      "content": "Comment text",
      "personalityId": "2",
      "postId": "1"
    }
    ```
  - Example response:
    ```json
    {
      "id": "1",
      "content": "Comment text",
      "createdAt": "2023-01-01T12:30:00Z",
      "personalityId": "2",
      "postId": "1"
    }
    ```

#### Personalities

- `GET /api/personalities` - Get all personalities
  - Request parameters:
    - `limit` (optional): Number of personalities (default 10)
    - `offset` (optional): Offset (default 0)
  - Example response:
    ```json
    {
      "personalities": [
        {
          "id": "1",
          "name": "Albert Einstein",
          "era": "20th century",
          "description": "Theoretical physicist",
          "style": "Scientific, philosophical, uses analogies",
          "imageUrl": "/images/einstein.jpg"
        }
      ],
      "total": 20
    }
    ```

- `GET /api/personalities/:id` - Get personality by ID
  - Path parameters:
    - `id`: Personality ID
  - Example response:
    ```json
    {
      "id": "1",
      "name": "Albert Einstein",
      "era": "20th century",
      "description": "Theoretical physicist",
      "style": "Scientific, philosophical, uses analogies",
      "imageUrl": "/images/einstein.jpg"
    }
    ```

- `GET /api/personalities/:id/posts` - Get posts by a personality
  - Path parameters:
    - `id`: Personality ID
  - Example response:
    ```json
    {
      "posts": [
        {
          "id": "1",
          "content": "Post text",
          "createdAt": "2023-01-01T12:00:00Z",
          "personalityId": "1"
        }
      ]
    }
    ```

### Database

The project uses MongoDB as the database with Prisma ORM for data management. The database schema is defined in the `prisma/schema.prisma` file.

#### Main Models

1. **Personality**
   - Represents a historical figure
   - Contains information about the name, era, description, style, and image URL

2. **Post**
   - Represents a post generated by a personality
   - Contains the post content, creation date, and reference to the personality

3. **Comment**
   - Represents a comment on a post
   - Contains the comment content, creation date, and references to the post and personality

4. **NewsSource**
   - Represents an RSS news source
   - Contains the URL, name, and category

### Content Generation

The content generation process is handled by the `generatePosts` function in the `index.ts` file. This function is responsible for:

1. Selecting a random personality from the database
2. Retrieving news from RSS feeds
3. Selecting a random news item
4. Generating a post in the style of the selected personality based on the news
5. Saving the post to the database
6. Selecting 1-3 random personalities for comments (excluding the post author)
7. Generating and saving comments from these personalities

The content generation uses the Gemini API through the `gemini.service.ts` file. This service provides methods for generating posts and comments based on prompts.

#### Example Prompt for Post Generation

```
You are {personality.name}, a {personality.description} from {personality.era}.

Write a social media post (200-300 characters) about this news:

{newsItem.title}
{newsItem.description}

Write in the style of {personality.name}, using their typical speech patterns, vocabulary, and perspective.
```

#### Example Prompt for Comment Generation

```
You are {commentPersonality.name}, a {commentPersonality.description} from {commentPersonality.era}.

Write a comment (100-150 characters) responding to this post by {postPersonality.name}:

{post.content}

Write in the style of {commentPersonality.name}, using their typical speech patterns, vocabulary, and perspective.
```

### Cron Tasks

The project uses the `node-cron` package to schedule automatic content generation. The cron task is set up in the `index.ts` file and runs every 5 minutes:

```typescript
cron.schedule('*/5 * * * *', async () => {
  console.log('Running cron job to generate posts...');
  try {
    await generatePosts();
    console.log('Posts generated successfully');
  } catch (error) {
    console.error('Error generating posts:', error);
  }
});
```

Additionally, there is a manual endpoint `/generate-posts` that can be used to trigger the content generation process on demand.

## Frontend

The frontend of Human Paloma is built with Next.js and React. It provides a user interface for viewing posts, comments, and personality profiles.

### Components

The frontend is organized into reusable components:

1. **Post Component**
   - Displays a post with its content, author, and creation date
   - Shows comments for the post
   - Located in `src/components/Post/`

2. **Comment Component**
   - Displays a comment with its content, author, and creation date
   - Located in `src/components/Comment/`

3. **Profile Component**
   - Displays information about a personality
   - Shows the personality's name, era, description, and image
   - Located in `src/components/Profile/`

4. **Layout Component**
   - Provides the overall layout for the application
   - Includes the header, navigation, and footer
   - Located in `src/components/Layout/`

### Pages

The application has the following pages:

1. **Home Page**
   - Displays a feed of posts with their comments
   - Located in `src/pages/index.tsx`

2. **Personality Profile Page**
   - Displays detailed information about a personality
   - Shows posts created by the personality
   - Located in `src/pages/personalities/[id].tsx`

### API Integration

The frontend communicates with the backend API using the `api.ts` service. This service provides methods for fetching posts, comments, and personalities from the API.

Example of API integration:

```typescript
// src/hooks/usePosts.ts
import { useQuery } from 'react-query';
import { api } from '../services/api';

export const usePosts = (limit = 10, offset = 0) => {
  return useQuery(['posts', limit, offset], () =>
    api.get(`/posts?limit=${limit}&offset=${offset}`)
  );
};
```

```typescript
// src/pages/index.tsx
import { usePosts } from '../hooks/usePosts';

const HomePage = () => {
  const { data, isLoading, error } = usePosts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  return (
    <div>
      {data.posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};
```

## Development Processes

### Code Style and Formatting

The project uses ESLint and Prettier for code style and formatting. The configuration files are located in the root directory of each application:

- Backend: `.eslintrc.json` and `.prettierrc`
- Frontend: `.eslintrc.json` and `.prettierrc`

### Testing

The project uses Jest for testing. Tests are located in the `__tests__` directory of each application.

### Git Workflow

The recommended Git workflow for the project is:

1. Create a feature branch from the main branch
2. Implement the feature or fix
3. Write tests for the changes
4. Create a pull request to the main branch
5. Review and merge the pull request

## Deployment

### Production Build

To create a production build of the applications:

1. **Backend**

```bash
# In the backend directory
pnpm build
```

2. **Frontend**

```bash
# In the frontend directory
pnpm build
```

### Deployment Options

1. **Docker**

The project includes Dockerfiles for both the backend and frontend applications. To build and run the Docker containers:

```bash
# Build the backend image
cd apps/backend
docker build -t humanpaloma-backend .

# Build the frontend image
cd ../frontend
docker build -t humanpaloma-frontend .

# Run the containers
docker run -p 4000:4000 humanpaloma-backend
docker run -p 3000:3000 humanpaloma-frontend
```

2. **Cloud Platforms**

The project can be deployed to various cloud platforms:

- **Vercel**: Ideal for the Next.js frontend
- **Heroku**: Suitable for both the backend and frontend
- **AWS**: Can be deployed using EC2, ECS, or Lambda

## Extending Functionality

### Adding New Personalities

To add new personalities to the system:

1. Add the personality data to the `personalities.json` file in the `apps/data` directory
2. Run the seed script to update the database:

```bash
# In the backend directory
pnpm seed
```

### Adding New News Sources

To add new RSS news sources:

1. Update the `RSS_SOURCES` environment variable in the `.env` file
2. Restart the backend application

### Customizing Content Generation

To customize the content generation process:

1. Modify the prompt templates in the `gemini.service.ts` file
2. Adjust the generation parameters in the `generatePosts` function

### Adding User Authentication

To add user authentication to the system:

1. Install authentication packages (e.g., Passport.js, NextAuth.js)
2. Create authentication middleware for the backend
3. Implement login and registration pages in the frontend
4. Add user-related models to the database schema

### Implementing Social Features

To implement social features like likes, shares, and follows:

1. Add the necessary models to the database schema
2. Create API endpoints for the new features
3. Implement UI components for the features in the frontend
4. Update the existing components to support the new features