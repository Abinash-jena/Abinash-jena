#!/bin/bash

echo "Enter year : "
read year

if [ $((year % 4)) == 0 ]; then
	if [ $((year % 100)) -eq 0 ]; then
		if [ $((year % 400)) -eq 0 ]; then
		      echo "leap year";
		    else 
		        echo "not leap";
		fi
	else
		echo "leap year";
	fi
else
	echo "Not Leap";
fi
