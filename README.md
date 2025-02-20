# seneca

node version: >20.11.1

Application:

start: npm run start-dev
port: 8080
postman collection used is in repo: Seneca.postman_collection.json

I wasn't sure in the requirements where it said: Your service should have some level of tests meant Unit tests or not

...So I have added a couple of unit tests which you can start with: npm test

Database

AWS - DynamoDB
Details:
table name: session
pk: user_id (S)
sk: session_id (S)

example uuids:

course ids:
f5a912ab-6f8c-41f9-b9d5-65a8d8360b01
865e3112-1014-4094-bd2b-7bb638388d05
5aa32317-c9df-499f-a013-c472a4384b0b

user ids:
b38e1ad6-70f3-4567-81a6-7240376a3c37
43474d4f-ad4c-4b19-a578-c6b55f0fcfcb
2ab4ba9c-3edc-4cac-816f-451607d769f3

session ids:
bf71ca46-ec86-4e11-8785-c769da1409fc
18ca4487-d011-4db6-a760-d87146aa0c45
3f8dd9a5-090b-4277-a49d-7da6b44dc43b
