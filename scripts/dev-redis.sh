#!/bin/bash

container=seqredis-dev

if docker container ls -a | grep $container; then
  docker stop $container
  docker rm $container
fi

docker run -d -p 6379:6379 --name $container redis