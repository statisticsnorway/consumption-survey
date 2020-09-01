# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
# FROM tiangolo/node-frontend:10 as build-stage
FROM node:12-alpine as build-stage

WORKDIR /app

COPY package*.json /app/
RUN npm install --production
RUN npm install --save-dev typescript @types/react @types/node

COPY ./ ./next.config.js /app/
RUN npm run build

EXPOSE 80
CMD [ "npm", "start-prod" ]

