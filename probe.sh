#!/bin/bash

event=$( tail -n 1 log.txt )

if [[ "$event" == "port error" ]]; then
  shutdown -r
fi