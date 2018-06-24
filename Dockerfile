FROM node:latest

ADD package.json /package.json
RUN npm install @material-ui/core
RUN npm install @material-ui/icons
RUN npm install -g firebase-tools

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN yarn

RUN npm install -g serve

WORKDIR /app
ADD . /app

## For Production: docker run -d --name react-front-end -p 8080:80 zakinator123/gear-app-react
RUN  chmod +x /app/run.sh
RUN /app/run.sh build