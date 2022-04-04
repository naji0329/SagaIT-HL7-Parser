FROM docker.io/nginx:stable-alpine@sha256:1865a131612a5b8407d596a035b6ce1fa53c94f2f1b175c52d110565192d2f0d
    MAINTAINER Jesse Dowell <jesse@saga-it.com>
COPY dist/hl7 /usr/share/nginx/html
