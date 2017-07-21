#!/bin/bash

# This script manages two redis containers - `seq-redis` and `seq-redis-persist` - the former without persistence
# enabled and the latter with persistence (append only file) enabled.
# Possible invocations:
# `redis.sh stop`    - stops both containers if available
# `redis.sh`         - stops `seq-redis-persist` and starts/creates `seq-redis`
# `redis.sh persist` - stops `seq-redis` and starts/creates `seq-redis-persist`

GREEN="\033[32m"
PINK="\033[35m"
CYAN="\033[36m"
NORMAL="\033[0;39m"

container=seq-redis
dataDir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/data"

docker ps -a --format {{.Names}} | grep $container | while read -r name ; do
  if [[ $1 == "stop" || $name == "seq-redis" && $1 == "persist" || $name == "seq-redis-persist" && $1 != "persist" ]]; then
    echo -e going to stop $GREEN$(docker stop $name)$NORMAL
  fi
done

if [[ $1 == "stop" ]]; then
  exit 0
fi

if [[ $1 == "persist" ]]; then
  container=seq-redis-persist
fi

if docker ps -a --format {{.Names}} | grep -q -e ^${container}$; then
  echo -e going to start $PINK$(docker start $container)$NORMAL
else
  echo -e going to create \& run $CYAN$container$NORMAL
  if [[ $container == "seq-redis-persist" ]]; then
    docker run -d -p 6379:6379 --name $container -v $dataDir:/data redis redis-server --appendonly yes
  else
    docker run -d -p 6379:6379 --name $container redis
  fi
fi