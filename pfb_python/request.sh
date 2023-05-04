#!/bin/bash

ID=$1
DATA=$2

REQUEST={\"namespace_id\":\"${ID}\",\"data\":\"${DATA}\",\"gas_limit\":80000,\"fee\":2000}
curl -S -X POST -d $REQUEST http://localhost:26659/submit_pfb | jq '.height,.txhash'
