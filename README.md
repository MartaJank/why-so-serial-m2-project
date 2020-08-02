# Why so Serial?

![logo](./why-so-serial/public/images/Untitled.png)

## Description

Search and collaborative Data Base platform for Serial Killers in which you can read info about famous Serial Killers and you can also add new killer files, edit them and delete them. There's also a playground part in which you can be a detective! :mag:  Just enter a possible weapon or type of murder and you'll get the killer you're searching for! :knife:



## User Stories

- **404** - As users, we want to be politely warned that this page does not exist and it was our fault to search for it. :warning:
- **500** - As users, we want to be politely warned that the amazing team behind the project screwd it up and it's not our fault.​ :broken_heart:
- **Homepage** - As users, we want to be able to access the homepage and filter killers by alphabetical order or by Zodiac sign. :house:
- **Display results** - As users, we want a nice display of the information we've been searching for. :mag_right:
- **Detailed display** - As users, we also want to be able to get another nice display of the detailed information of the killer we just clicked on. :computer_mouse:
- **Sign Up** - As users, we may love the page and want to see some additional content so we want to create an account. It's free! :free:
- **Log In** - As users, we want to log in so we can see the amazing aditional features and create our profile! :sunglasses:
- **Log Out** - As users, we want to close our session once we finished navigating through this amazing page so no one can get back to our account. :wave:
- **Edit Profile** - As users, we want to be able to edit our profiles whenever we need it. :clown_face:
- **Create Killer File** - As users, if we don't find a file about the killer we've been searching for, we want to be able to create that file ourselves. :new:
- **Edit Killer File** - As users, we want to edit the killer files if some information is not correct or there's a recent update. :bar_chart:
- **Delete Killer File** - As users, we want to delete some of the killer files we've created anytime we need to. :x:
- **Comments** - As users, we want to add comments to a particular killer file to make suggestions for the creator or to tell him/her how much we loved the detailed information he/she provided. :heart_eyes:
- **Playground** - As users, if we don't know what to search for or we're bored of regular searching, we want to get a random killer file based on his/her particular weapons used or method of killing. We're detectives now so let's catch this murderer CSI style and resolve the mystery! :detective:



## Server Routes (back-end) 

| **Method** | **Route**                  | **Description**                                              | **Request - Body**                                          |
| ---------- | -------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `GET`      | `/`                        | Main page route. Renders home `index` view.                  |                                                              |
| `GET`      | `/killers`                 | Renders `killers` view.                                      |                                                              |
| `GET`      | `/killers/details/:id`     | Renders `details` view.                                      |                                                              |
| `DELETE`   | `/private/delete-killer/:id`     | Executes delete button function and updated DB. Redirects to `killers` view. |                                                              |
| `POST`     | `/private/review-killer/:id`     | Sends comments form data to the server, updates DB and renders `details` view. | {author, comment}                                            |
| `GET`      | `/login`                   | Renders `auth/login` form view.                              |                                                              |
| `POST`     | `/login`                   | Sends Log In form data to the server and redirects to `profile` view. | {email, password}                                            |
| `GET`      | `/signup`                  | Renders `auth/signup` form view.                             |                                                              |
| `POST`     | `/signup`                  | Sends Sign Up info to the server and creates user in the DB. Redirects to `auth/login` view. | {name, email, password}                                      |
| `GET`      | `/logout`                  | Logges user out and redirects to `index` view.               |                                                              |
| `GET`      | `/private/profile/:id`         | Private route. Renders `profile` view.                       |                                                              |
| `GET`      | `/private/profile/:id/edit`    | Private route. Renders `edit-profile` form view.             |                                                              |
| `PUT`      | `/private/profile/:id/edit`    | Private route. Sends edit-profile info to server and updates user in DB and in `profile` view. | {[imageUrl], name, email, password}                          |
| `GET`      | `/private/add-killer`      | Private route. Renders `add-killer` form view.               |                                                              |
| `POST`     | `/private/add-killer`      | Private route. Sends add-killer info to server and creates killer in DB. | {[imageUrl], author, name, lastName, aka, gender, birthDate, zodiacSign, yearsActive, numberOfVictimsConfirmed, numberOfVictimsPossible, country, weapons, arrested, victimProfile, murderType, description, books} |
| `GET`      | `/private/edit-killer/:id` | Private route. Renders `edit-killer` form view.              |                                                              |
| `PUT`      | `/private/edit-killer/:id` | Private route. Sends edit-killer info to server and updates killer in DB and in `killers` view. | {[imageUrl], author, name, lastName, aka, gender, birthDate, zodiacSign, yearsActive, numberOfVictimsConfirmed, numberOfVictimsPossible, country, weapons, arrested, victimProfile, murderType, description, books} |
| `GET`      | `/private/cluedo`          | Private route. Renders `cluedo` view.                        |                                                              |



## Models

Serial Killer model

```javascript
{
  "image": String,
  "author": { type: Schema.Types.ObjectId, ref: 'User' },
  "name": String,
  "lastName": String,
  "aka": String,
  "gender": String,
  "birthDate": String,
  "zodiacSign": String,
  "yearsActive": [Number],
  "numberOfVictimsConfirmed": Number,
  "numberOfVictimsPossible": Number,
  "country": String,
  "weapons": [String],
  "arrested": Number,
  "victimProfile": String,
  "murderType": [String],
  "description": String,
  "books": [String]
  }
```



User model

```javascript
{
  "image": { type: String, default: '../images/avatar.png' },
  "name": String,
  "email": String,
  "password": String,
  "isAuthor": { type: Boolean, default: false }
}
```



Comment model

```javascript
{
  "author": { type: Schema.Types.ObjectId, ref: 'User' },
  "comment": String,
  "killerReviewed": { type: Schema.Types.ObjectId, ref: 'Killer' }
}
```



## Backlog

- Let the user like and add to favorites the files they're most interested in.
- Let the user have a particular view only of the killer files he has created.



## Links

#### Git 

[Repository Link](https://github.com/MartaJank/why-so-serial-m2-project)

[Deploy Link]()



#### Trello

[Our Trello board](https://trello.com/b/TlfJc7Ud/why-so-serial)



#### Slides

[Our amazing presentation!]()​ 

