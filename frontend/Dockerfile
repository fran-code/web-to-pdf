FROM node:alpine
WORKDIR /app
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
ENV TEST test
ENV TEST2=test2
ENV REACT_APP_TEST REACT_APP_TEST
ENV REACT_APP_TEST2=REACT_APP_TEST2
COPY package.json ./
COPY tsconfig.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start"]