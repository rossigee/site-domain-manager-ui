#!/bin/bash
#
# Use 'API_URL' envvar for environment setting
#

echo "Replacing API_URL in JS with '$API_URL'."

sed -i "s;{{API_URL}};$API_URL;g" *.js

exec $*
