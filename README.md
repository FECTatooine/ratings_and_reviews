# Project Atelier | Supernova 
## ratings_and_reviews

Given a retail site, we were taked to redesign the back-end architecture to improve scalability. I was responsible for the endpoints related to ratings and reviews. 

## Motivation

Project to deepen understanding of back-end development with an existing front-end that could not be touched. 

## Built With

![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
[K6](https://k6.io/) 
[Loader.io](https://loader.io/signin) 

## Details 

I utilized Postgres to write queries to send back to the front end. I took advantage of tools built into Postgres to efficientize. From there, I was able to utilize K6 testing and Loader.io to conduct stress tests.

## Results

For an API call to recieve all reviews for a single item on a singular AWS EC2 instance. 
![Screen Shot 2022-08-05 at 5 23 12 PM (1)](https://user-images.githubusercontent.com/100891819/186766377-88fc9ff4-3ace-43ef-928b-02fad02344f8.png)

For an API call to receive review metadata for a single item on a singular AWS EC2 instance. 
![Screen Shot 2022-08-05 at 5 28 34 PM (1)](https://user-images.githubusercontent.com/100891819/186766450-158f9bc6-aa71-4c8f-97a7-14a624f1ed96.png)


## Next Steps 

For further optimization, I would recommend launching multiple servers and integrating a load balancer to accomodate more users. 
