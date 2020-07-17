aws dynamodb create-table --table-name SampleTable --attribute-definitions AttributeName=PersonKey,AttributeType=S --key-schema AttributeName=PersonKey,KeyType=HASH --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 --endpoint-url http://localhost:8000

aws dynamodb put-item --table-name SampleTable --item '{ "PersonKey": {"S": "1"}, "FirstName": {"S": "Bill"}, "LastName": {"S": "Smith"} }' --return-consumed-capacity TOTAL --endpoint-url http://localhost:8000
aws dynamodb put-item --table-name SampleTable --item '{ "PersonKey": {"S": "2"}, "FirstName": {"S": "John"}, "LastName": {"S": "Smith"} }' --return-consumed-capacity TOTAL --endpoint-url http://localhost:8000
