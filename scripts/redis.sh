#!/bin/bash

container=seq-redis

if [ "$1" = "stop" ]; then
  docker stop $container
  exit 0
fi

if docker container ls -a | grep -q $container; then
  docker start $container
else
  docker run -d -p 6379:6379 --name $container redis
fi