FROM node

WORKDIR /server/post-service

COPY package.json .

RUN npm install && npm rebuild argon2 --build-from-source

COPY . .

EXPOSE 8002

CMD ["npm","start"]