# Game of Thrones Battle Web App
- To build an app which gives the results on top of the search of famous tv series known as **Game of Thrones**

## Design Thoughts
- To build endpoints queries which gives the articulated results, which then can be accessed on frontend.
- To create a search bar on frontend, which gives the results as an autocomplete. For this approach, I will fuse.js
- To store json results, I will use MongoDB container with the help of Docker.

## Usage
```
cp sample.env .env
sudo docker-compose build
sudo docker-compose up
```

## API Usage

API can be launched using npm start. You will need to run npm install once you starting working on the project to install dependencies.

| Endpoint                     | Result                                              |
|------------------------------|-----------------------------------------------------|
| /list                        | Lists all battle location                           |
| /count                       | Total numbers of battles occured                    |
| /search                      | Get search results using multiple query params      |

## Issues
- Frontend is not developed yet
- Backend code structure is not good

## Edge Case
- Have used docker for mongo client