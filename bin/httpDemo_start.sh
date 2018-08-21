#!/bin/sh

dateStr=`date +%Y%m%d_%H%M%S`

cd /home/deploy/tz
echo '----------httpDemo start... '"$dateStr"'---------'
node httpDemo.js >> logs/httpDemo_"$dateStr".log
echo '----------httpDemo end...  '"$dateStr"'---------'
