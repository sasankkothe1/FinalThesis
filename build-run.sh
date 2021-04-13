#!/bin/sh

IMAGE=psplib
COMMAND="npm start"


docker build -t ${IMAGE} -f docker/Dockerfile .
docker run --rm -it -p 3000:3000 ${IMAGE} ${COMMAND}