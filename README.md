# loadbalancing

This is an exercise in OOP. Javascript simulation of a cluster of N servers that manage a queue of requests.

## Queue

The queue is defined in `requests` string variable with following structure:

```javascript
"id, time, duration; id, time, duration; [...] ;"
```

## How Work

In according with load balancing technique, the cluster manage the queue and send single request on free internal server.
