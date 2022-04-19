FROM node:alpine
WORKDIR /app
ENV NODE_ENV production
COPY package.json ./
COPY tsconfig.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start"]