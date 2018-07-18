#!/bin/bash
# Use this to obtain any field from a json file called "info.json"
# Dependencies: python
# Input: 0..n keys that corresponds to nested keys
# Output: the value of the field or fields determined by nesting all keys
# Example: given "./jsonTool.sh config chainId", then output is the value of ["config"]["chainId"], e.g. "10"

if [ ! $# -ge 1 ]; then
  echo "Usage: ./jsonTool.sh {key1}..{key n}"
  exit
fi

if [ ! -f "info.json" ]; then
  echo "info.json is not created yet"
  exit
fi

pythonCommand="import sys, json; print json.load(sys.stdin)"
for param in $@; do
  pythonCommand=$pythonCommand['"'$param'"']
done
pythonCommand="'"$pythonCommand"'"
eval "cat info.json | python -c $pythonCommand"
