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

# with auth headers, header size is considerably increased
# testing if this will fix the problem with BIP
# TODO: consider multi-container pod config (sidecar)
ENV NODE_OPTIONS "--max-http-header-size=16834"

CMD [ "npm", "start" ]

