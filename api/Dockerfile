FROM mhart/alpine-node:16

COPY ./api ./home/api

WORKDIR /home/api
RUN apk add --no-cache python3 build-base && npm install

CMD ["npm", "run", "start"]