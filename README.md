
# Social App Demo

Social App Demo createating for learning porpose using react - tailwindcss - node js - express js



## Demo

[Socail App Demo](https://social-app-svtv.onrender.com/)


## Features
- Light/dark mode
- Create Posts with image only
- Add/Remove Friends
- Add Comments - Likes
- Authentication
- Upload user avatar
## Pages
- Login Page
- Sign up
- User Profile
- Home Page
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

#### Backend section

`DB_CONNECTION`

`PORT`

`JWT_PRIVATE_KEY`

#### Frontend section

`REACT_APP_BACKEND_API`
## Run Locally

Clone the project

```bash
  git clone https://github.com/Hossam-alahmad/social-app.git
```

Go to the project directory

```bash
  cd my-project
```

You will see two section frontend and backend


#### Front end

Go to the frontend directory

```bash
  cd frontend
```
install dependences

```bash
  npm install
```
Start React 

```bash
  npm start
```

#### Backend end

Go to the backend directory

```bash
  cd backend
```
install dependences

```bash
  npm install
```
Start Server 

```bash
  npm run dev || npm start
```
## API Reference

#### Create new user

```http
  POST /api/auth/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `firstName` | `string` | **Required** |
| `lastName` | `string` | **Required** |
| `password` | `string` | **Required** |
| `email` | `string` | **Required** Unique |
| `location` | `string` | **Required** |
| `occupation` | `string` | **Required** |


#### Get login info

```http
  POST /api/auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required** |
| `password`      | `string` | **Required**|



#### Create new post

```http
  POST /api/posts/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `string` | **Required** |
| `description` | `string` | **Required** |
| `picturePath` | `binary` | **Not Required** |


#### Get feed posts

```http
  GET /api/posts/
```

#### Get user posts

```http
  GET /api/posts/:userId/posts
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `string` | **Required** |


#### Add/Remove likes

```http
  PATCH /api/posts/:id/like
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required** |
| `userId` | `string` | **Required** |


#### Add comment in post
```http
  POST /api/posts/:id/comment
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required** |
| `userId` | `string` | **Required** |
| `comment` | `object` | **Required** |



#### Get user
```http
  GET /api/users/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required** |

#### Get user friends
```http
  GET /api/users/:id/friends
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required** |

#### Upload user image
```http
  POST /api/users/upload-image-profile
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required** |
| `file` | `binary` | **Required** |


#### Add/Remove friend
```http
  PATCH /api/users/:id/:friendId
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required** |
| `friendId` | `string` | **Required** |
