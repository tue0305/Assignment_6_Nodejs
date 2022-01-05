FROM node

WORKDIR /server/user-service

COPY package.json .

RUN npm install && npm rebuild argon2 --build-from-source

COPY . .

EXPOSE 8001

CMD ["npm","start"]