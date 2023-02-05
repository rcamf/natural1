FROM mhart/alpine-node:16

COPY ./api ./home/api

WORKDIR /home/api
RUN npm install

CMD ["npm", "run", "start"]