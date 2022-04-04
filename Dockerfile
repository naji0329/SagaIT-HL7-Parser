FROM docker.io/nginx:latest@sha256:83d487b625d8c7818044c04f1b48aabccd3f51c3341fc300926846bca0c439e6
    MAINTAINER Jesse Dowell <jesse@saga-it.com>
COPY dist/hl7 /usr/share/nginx/html
