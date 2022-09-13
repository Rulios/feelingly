#-------------------------
# Development stage
#-------------------------

FROM node:16.17-alpine as development

LABEL maintainer="Robert Lu Zheng"

WORKDIR /app

COPY ["package.json", "."]

RUN npm install


RUN ./start-container.sh


#-------------------------
# Production stage
#-------------------------