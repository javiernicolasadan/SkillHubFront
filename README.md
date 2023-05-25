# SkillHub FrontEnd

<br>

## Description

This is an app that let people teach their skills to other people, and learn from other people in the skills than are offered in the app.

## User Funcionalities

- **Signup:** As an anon I can sign up in the platform so that I can start creating and managing my skills and events
- **Login:** As a user I can login to the platform so that I can start creating and managing my skills and events
- **Logout:** As a user I can logout from the platform so no one else can modify my information
- **Toogle skills** As a user I can toogle between different types of skills
- **Toogle events** As a user I can toogle between different types of events
- **Add skills** As a user I can add skills to my skills
- **Add events** As a user I can add events to my events
- **Delete skills** As a user I can delete my skills
- **Delete events** As a user I can delete my events
- **Subscribe to events** As a user I can subscribe to events that im going to
- **Unsubscribe to events** As a user I can unsubscribe to events that im going to
- **Check profile** As a user I can check my profile, skills and events
- **Pictures** Can upload, change and delete pictures with all skill and events

## Backlog

- Adding links for remote events / place for in-person
- Don´t show subscribe to own events / subscribe directly to created events

<br>

# Client / Frontend

## React Router Routes (React App)

| Path                    | Component           | Permissions                | Behavior                                                      |
| ----------------------- | ------------------- | -------------------------- | ------------------------------------------------------------- |
| `/`                     | HomePage            | public `<Route>`           | Home page                                                     |
| `/signup`               | Signup              | public `<Route>`           | Signup form, link to login, navigate to login after signup    |
| `/login`                | Login               | public `<Route>`           | Login form, link to signup, navigate to profile after login   |
| `/profile`              | Profile             | user only `<PrivateRoute>` | Information about profile, my skills, events                  |
| `/allskills`            | AllSkills           | user only `<PrivateRoute>` | Shows all skills filtered by category                         |
| `/addskill`             | AddSkill            | user only `<PrivateRoute>` | Create a new skills                                           |
| `/updateskill/:skillid` | AddSkill isUpdating | user only `<PrivateRoute>` | Show skill details, update, delete, add event, events related |
| `/addevent/:skillid`    | AddEvent            | user only `<PrivateRoute>` | Form to create event                                          |
| `/skilldets/:skillid`   | SkillDetails        | user only `<PrivateRoute>` | Show skill Details, link to update, delete, add event         |
| `/eventdets/:eventId`   | EventDetails        | user only `<PrivateRoute>` | Show event Details, link to update, delete, subs, unsubs      |
| `/updateevent/:eventId` | UpdateEvent         | user only `<PrivateRoute>` | Check profile with stat information                           |
| `/allevents`            | AllEvents           | user only `<PrivateRoute>` | Shows all tv series finished                                  |

## Components

- HomePage

- Signup

- Login

- Profile

- AllSkills

- AddSkill

- AddSkill isUpdating

- AddEvent

- SkillDetails

- EventDetails

- UpdateEvent

- AllEvents

## Services

- Auth Service

  - auth.login(user)
  - auth.signup(user)
  - auth.logout()

- Extra Services
  - extra.filter(date) // for different events upcoming or past
  - extra.detail(id)
  - extra.add(id)
  - extra.delete(id)
  - extra.update(id)

<br>

# Server / Backend

## Models

User model

```javascript
{
  username: {type: String, trim: true, required: true, unique: true},
  email: {type: String, required: true, unique: true, lowercase: true, trim: true},
  passwordHash: {type: String, required: true},
  skills: [{type: Schema.Types.ObjectId,ref:'Skill'}]
  subscribedEvents: [{type: Schema.Types.ObjectId,ref:'Event'}]
  createdEvents: [{type: Schema.Types.ObjectId,ref:'Event'}]
}
```

Skill model

```javascript
 {
   category: {type: String, required: true,  enum: ['Music', 'Photography', 'Coding', 'Cooking', 'Gardening', 'Beauty', 'Domestic-Skills', 'Languages', 'Other' ], default: "Other"},
   title: {type: String, required: true},
   details: {type: String, required: true, maxLength: 2000},
   events: {type: Schema.Types.ObjectId, ref:'Event'},
   createdBy: {type: String}
   imageUrl: {type: String}
}
```

Event model

```javascript
 {
   title: {type: String, required: true,  unique: true, trim: true},
   description: {type: String, required: true},
   date: {type: String, required: true},
   locationType: {type: String, enum: ['online', 'in-person'], default: 'online'},
   createdBy: {type: Schema.Types.ObjectId, ref:'User'}
   skillid: {type: Schema.Types.ObjectId, ref:'Skill'}
   imageUrl: {type: String}
}
```

<br>

## API Endpoints (backend routes)

| HTTP Method | URL                  | Request Body                 | Success status | Error Status | Description                                        |
| ----------- | -------------------- | ---------------------------- | -------------- | ------------ | -------------------------------------------------- |
| POST        | `/auth/signup`       | {email, username, passwordH} | 201            | 400          | Check if user is logged in and return profile page |
| POST        | `/auth/login`        | {userId }                    | 201            | 404          | Create a token exist                               |
| GET         | `/auth/verify`       | {username, password}         | 200            |              | Checks if token exits and correspond to user       |
| GET         | `/event      `       |                              | 200            |              | Find all events                                    |
| POST        | `/event/create`      | {title, date, ...}           | 201            |              | Create an event                                    |
| GET         | `/eventdets/eventId` | {\_id, title,description...} | 200            |              | Show event details form a especific event          |
| PUT         | `/updateven/eventId` | {file, title, date...}       | 200            |              | Show details to update                             |
| DELETE      | `/deleteven/eventId` | {eventId}                    | 200            |              | Show details to delete                             |
| POST        | `/subscribe/eventId` | {eventId, userId}            | 200            |              | Subscribe to an event                              |
| GET         | `/skill`             | {category}                   | 200            |              | Show skills                                        |
| POST        | `/skill/create`      | {userId, title, details...}  | 201            |              | Create skill                                       |
| GET         | `/skill/:skillid`    | {skillid}                    | 200            |              | Show events related to this skill                  |
| PUT         | `/skill/:skillid`    | {skillid, iamgeUrl}          | 200            |              | Update an skill                                    |
| DELETE      | `/skill/:skillid`    | {skillid}                    | 200            |              | Delete an skill                                    |
| GET         | `/done/games`        |                              |                |              | Show games elements                                |

<br>

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/pUIpKj2Q/skill-hub)

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/javiernicolasadan/SkillHubFront)

[Server repository Link](https://github.com/javiernicolasadan/SkillHubBack)

[Deployed App Link](https://kaleidoscopic-eclair-d386a9.netlify.app/)

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1JbQUXHPBXj2VIOu_rCn_mEHzTUJWQGPVyWx7Yb9MLnM/edit?usp=sharing)
