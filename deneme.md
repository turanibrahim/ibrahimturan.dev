# Dockerfile Vue SPA + nginx
## File Structure
----
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas felis purus, fermentum sit amet lacus at, dictum gravida orci. Suspendisse porttitor sed metus sit amet pulvinar. Donec posuere eros elit, vel vehicula nisi vulputate et. Pellentesque facilisis lectus nec ex mattis, id vulputate massa laoreet. Vestibulum vitae justo bibendum, venenatis turpis eu, dignissim arcu. Maecenas sapien mauris, sodales sed dapibus vel, imperdiet ut tortor. Suspendisse ac tortor ac enim imperdiet mattis ac in eros. Sed felis magna, rutrum eget lacinia in, ullamcorper at sem. Nulla fermentum tempus tortor ac dapibus. Maecenas rutrum sem eget diam faucibus consectetur. Donec dignissim odio turpis, non ultrices turpis iaculis non. Duis finibus, massa vitae consectetur tincidunt, tellus enim varius tortor, quis efficitur nunc lorem id orci.

```
- Dockerfile
- docker-compose.yml
```

## Dockerfile
----

```Dockerfile
# develop stage
FROM node:12.16.1-alpine3.11 as develop-stage
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
# build stage
FROM develop-stage as build-stage
RUN yarn build
# production stage
FROM nginx:1.16.1 as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```
## docker-compose.yml
----

```Dockerfile
# for local development
version: '3.7'
services:
  frontend:
    build:
      context: .
      target: 'develop-stage'
    ports:
    - '8080:8080'
    volumes:
    - '.:/app'
    command: /bin/sh -c "yarn serve"
```
