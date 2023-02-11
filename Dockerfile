# Stage 1: Compile and Build application

### Use official node image as the base image
FROM node:18 as builder
### Set the working directory
WORKDIR /app
### Configure stuff for npm&git
RUN npm config set strict-ssl false
# problem with nonstandard libraries which are being compiled during npm -i
#RUN git config --global url.https://github.com/.insteadOf git://github.com/
RUN git config --global http.sslVerify false
### Copy package and lock json file to workdir
COPY package.json package-lock.json ./
### Install angular cli 
RUN npm i -g @angular/cli
### Install all the dependencies
RUN npm ci
### Add the source code to app
COPY ./ /app/
### Generate the build of the application
RUN ng build --configuration production --aot --output-hashing=all
# Stage 2: Serve app with nginx server

### Use official nginx image as the base image
FROM nginx:latest
### Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
### Remove default nginx static assets
RUN rm -rf ./*
### Copy the build output to replace the default nginx contents.
COPY --from=builder /app/dist/myh .
### overwrite default configuration of nginx image
COPY  --from=builder /app/nginx.default.conf.uat /etc/nginx/conf.d/default.conf
### Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
