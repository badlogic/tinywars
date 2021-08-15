#!/bin/bash
set -e
docker-compose build --no-cache
docker-compose up -d