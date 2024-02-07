# CarCar

CarCar is an application for managing all aspects of selling and servicing cars at your dealership. You can track your salespeople, customers, types of cars in inventory, technicians, service appointments, and much more! From when a car arrives in inventory to the actual sale, fine tune your database of cars, personnel, and appointments.

Team:

* Shiela Lee - Sales microservice
* Elian Felix - Services microservice


## Getting Started

**Make sure you have Docker, Insomnia, Git, and Node.js Bullseye or above**

1. Fork this repository.

2. Clone the forked repository onto your local computer:
git clone <https://gitlab.com/leeshiela12/project-beta-elian-shiela>

3. Build and run the project using Docker with these commands:
```
docker-compose build
docker-compose up
```
- After running these commands, make sure all of your Docker containers are running

- View the project in the browser: http://localhost:3000/

![Img](/resources/sales.png)
![Img](/resources/services.png)

## Design
CarCar is made up of 3 microservices which interact with one another.

- **Sales**
- **Inventory**
- **Services**

![Img](/resources/CarCar-DDD.png)

## Accessing Endpoints to Send and View Data: Access Through Insomnia & Your Browser

## Service microservice
Action | Method | URL
| ------ | ------ | ------ |
List technicians | GET | http://localhost:8080/api/technicians/
Create a technician | POST | http://localhost:8080/api/technicians/
Delete a specific technician | DELETE | http://localhost:8080/api/technicians/:id/
List appointments | GET | http://localhost:8080/api/appointments/
Create an appointment | POST | http://localhost:8080/api/appointments/
Delete an appointment | DELETE | http://localhost:8080/api/appointments/:id/
Set appointment status to "canceled" | PUT | http://localhost:8080/api/appointments/:id/cancel/
Set appointment status to "finished" | PUT | http://localhost:8080/api/appointments/:id/finish/

JSON Body to input into Insomnia:
(Elian input)

On the backend, the services microservice has 3 models: AutomobileVO, Appointment, and Technician.
(Elian input)

## Sales microservice
Action | Method | URL
| ------ | ------ | ------ |
List salespeople | GET | http://localhost:8090/api/salespeople/
Create a salesperson | POST | http://localhost:8090/api/salespeople/
Delete a specific salesperson | DELETE | http://localhost:8090/api/salespeople/:id/
List customers | GET | http://localhost:8090/api/customers/
Create a customer | POST | http://localhost:8090/api/customers/
Delete a specific customer | DELETE | http://localhost:8090/api/customers/:id/
List sales | GET | http://localhost:8090/api/sales/
Create a sale | POST | http://localhost:8090/api/sales/
Delete a sale | DELETE | http://localhost:8090/api/sales/:id

JSON Body to input into Insomnia:
Create a sale (SEND THIS JSON BODY):

```
{
	"price": 10000,
	"automobile": "1C3CC5FB2AN120174",
	"salesperson": 2,
	"customer": 6

}
```
Getting a list of sales return value:
```
{
    "sales": [
		{
			"id": 4,
			"price": 1000,
			"automobile": {
				"vin": "1C3CC5FB2AN120174",
				"sold": true
			},
			"customer": {
				"id": 1,
				"first_name": "CUSTOMER FIRST",
				"last_name": "CUSTOMER Last",
				"address": "123 Apple Ave",
				"phone_number": 12345678
			},
			"salesperson": {
				"employee_id": 1,
				"first_name": "Shiela",
				"last_name": "Lee"
			}
		}
    ]
}
```
The return value of creating, viewing, updating a single automobile:
```
{
	"href": "/api/automobiles/KL5VM56L76B185322/",
	"id": 5,
	"color": "Silver",
	"year": 2024,
	"vin": "KL5VM56L76B185322",
	"model": {
		"href": "/api/models/3/",
		"id": 3,
		"name": "Rav4",
		"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
		"manufacturer": {
			"href": "/api/manufacturers/2/",
			"id": 2,
			"name": "Toyota"
		}
	},
	"sold": false
}
```
Getting a list of customers return value:
```
{
	"customers": [
		{
			"id": 1,
			"first_name": "CUSTOMER FIRST",
			"last_name": "CUSTOMER Last",
			"address": "123 Apple Ave",
			"phone_number": 12345678
		},
    ]
}
```
Getting a list of salespeople return value:
```
{
	"salespeople": [
		{
			"employee_id": 1,
			"first_name": "Shiela",
			"last_name": "Lee"
		},
    ]
}
```

On the backend, the sales microservice has 4 models: AutomobileVO, Salesperson, Customer, and Sales. AutomobileVO interacts with the Sales model and it is in the inventory microservice. The Sales model gets the VIN data from the AutomobileVO to populate the dropdown menu for its automobile vin property. While the Sales model does not have a foreign key for price, it does have a foreign key to salesperson and a customer. The sales model needs all this information (price, automobile, salesperson, and customer) to record a new sale. When a sale is recorded, the sold status is changed within the original automobile inventory and the VO populates this change. Using a filter method, we were able to only populate vehicles available for sale in the dropdown menu for the sales form.

The AutomobileVO gets its data about the sold status and vin id in the inventory using a poller. The sales poller automotically polls the Inventory microservice for data, so the sales microservice is constantly getting the updated data. The reason for integration between the AutomobileVO and Sales models is that when recording a new sale, you'll need to choose which automobile vin was purchased and that information lives inside of the inventory microservice.

The Salesperson model has attributes of an employee id, which we assigned to be the primary key, and the salesperson's first name and last name. The Customer model has its own id, first name, last name, address, and phone number properties.
