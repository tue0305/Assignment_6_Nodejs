FROM node

WORKDIR /app/post-service

COPY package.json .

RUN npm install 

COPY . .

EXPOSE 8002

CMD ["npm","start"]