# ICS3104: IAP - Node.js Task 

### setup
* clone the repo, install dependancies and run the development server locally
* to test the API, import the collection to postman using *Node.js Task.postman_collection.json* file in the root of the folder or [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/6fd5c488c3179254d4c1)



1. http://localhost:3000/api/v1/student/  - **POST**
    
    
    *request body*
   {
        "Name": "Johndoe",
        "year": 1,
        "email": "Johndoe@strathmore.edu",
        "address": "Nyeri 2543",
        "isActive": false
    }
    
    
2. http://localhost:3000/api/v1/student/  -  **GET**

3. http://localhost:3000/api/v1/student/ {some id} - **GET**
    
    *where some id is a positive integer*

4. http://localhost:3000/api/v1/student/ {some id} - **PUT**
    
    *request body*
    
    [
    
    {"propName":"Name","value":"Elton omwega"},
    {"propName":"year","value":"2"},
    {"propName":"email","value":"elton.ombogi@strathmore.edu"},
    {"propName":"address","value":"Nairobi 2543"}
    
    ]

5. http://localhost:3000/api/v1/student/ {some id} - **DELETE**
    
    *where some id is a positive integer*

    


