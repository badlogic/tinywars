#!/bin/bash

printHelp () {
	echo "Usage: control.sh <command>"
	echo "Available commands:"
	echo
	echo "   restart    Restarts the Node.js server, pulling in new assets."
	echo "              Uses TINYWARS_RESTART_PWD env variable."
	echo
	echo "   start      Pulls changes, builds docker image(s), and starts"
	echo "              the services (Nginx, Node.js)."
	echo
	echo "   stop       Stops the services."
	echo
	echo "   shell      Opens a shell into the Node.js container."
}

case "$1" in
-restart) 
	curl -X GET https://tinywars.io/restart?pwd=$TINYWARS_RESTART_PWD
	;;
-start)
	git pull
	docker-compose build --no-cache
	docker-compose up -d
	;;
-stop)
	docker-compose down
	;;
-shell)
	docker exec -it tinywars_site bash
	;;
*) 
	echo "Invalid command $1"
	printHelp
	;;
esac