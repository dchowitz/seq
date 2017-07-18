#!/bin/bash

container=seq-selenium

if [ "$1" = "stop" ]; then
  docker stop $container
  exit 0
fi

if docker container ls -a | grep -q $container; then
  docker start $container
else
  docker run -d -p 4444:4444 --name $container selenium/standalone-chrome
fi