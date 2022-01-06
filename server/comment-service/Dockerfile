FROM node

WORKDIR /server/comment-service

COPY package.json .

RUN npm install && npm rebuild argon2 --build-from-source

COPY . .

EXPOSE 8003

CMD ["npm","start"]