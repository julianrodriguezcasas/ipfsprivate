#!/bin/bash

LOG_FILE=/var/log/ipfs.log
IPFS_DATA=${IPFS_DATA-/data/ipfs/}
cd ${IPFS_DATA}
ipfs init
sleep 1
ipfs config Datastore.Path ${IPFS_DATA}
if [ "$IPFS_BOOTSTRAP_RM_ALL" == "true" ];then
    ipfs bootstrap rm --all
fi

if [ ! -z "$IPFS_BIND_IP" ];then
    ipfs config Addresses.Gateway /ip4/${IPFS_BIND_IP}/tcp/${GATEWAY_PORT}
    ipfs config Addresses.API /ip4/${IPFS_BIND_IP}/tcp/${API_PORT}
else
    echo "error, IPFS_BIND_IP undefined"
fi

ipfs daemon