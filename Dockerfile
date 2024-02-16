FROM docker.io/node:16.16.0-alpine3.15@sha256:bb776153f81d6e931211e3cadd7eef92c811e7086993b685d1f40242d486b9bb AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./

# have to force install for now due to deps issue
RUN npm install --force
COPY . .
RUN npm run build -- --base-href=/hl7-tool/ --prod

FROM docker.io/nginx:stable-alpine@sha256:1865a131612a5b8407d596a035b6ce1fa53c94f2f1b175c52d110565192d2f0d
COPY --from=build /usr/src/app/dist /usr/share/nginx/html/hl7-tool
COPY --from=build /usr/src/app/nginx/ /etc/nginx/
