# PlacesAPI
## Overview
Places API allows to add and query places from database.Each place object contains its full name, its state and city. It also contain details such as time this place was added and when was it last updated. API supports three endpoints listed below.  
BaseURL:
https://placesapi1.herokuapp.com
### / 
To get all places from database.
Method type: get  
Example
``` fetch(url, {
  method: 'get'
});
```  

### /add 
To add place to database.
Takes "name","city","state" as body
Method type: post  
Example
``` fetch(url, {
  method: 'post',
  body: {
    "name":"12",
    "city":"123",
    "state":"something"
}
});
```  
### /list
To get all places from city or state.
Takes "city" or "state" as body
Method type: get  
Example
``` fetch(url, {
  method: 'get',
  body: {
    "city":"123",
}
});
```  
Each endpoint will return JSON object.
