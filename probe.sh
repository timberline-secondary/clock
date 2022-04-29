#!/bin/bash

event=$( tail -n 1 log.txt )

if [[ "$event" != "event - compiled successfully" ]]; then
  shutdown -r
fi