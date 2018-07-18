#!/bin/bash

addConnection() {
  curl "http://$1:5001/api/v0/id" > info.json
  id=$(/input/jsonTool.sh "ID")
  connection="/ip4/$1/tcp/4001/ipfs/${id}"
  echo $connection
  ipfs bootstrap add ${connection}
}

if [ ! $# -ge 1 ]; then 
  addConnection $BOOTSTRAP_PEER
else
  for ipAdd in $@; do
  echo $ipAdd
    addConnection $ipAdd
  done
fi