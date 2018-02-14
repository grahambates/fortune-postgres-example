# Steps to reproduce:

```
# Start the example server
docker-compose up

# This should initially respond OK
curl http://localhost:3000/user

# Apply some load to use up connection pool - this will eventually hang
ab -c90 -n 10000 http://localhost:3000/user

# Now all requests will time out
curl http://localhost:3000/user
```
