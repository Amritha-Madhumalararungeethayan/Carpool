FROM node:20-alpine 
WORKDIR /web 
COPY package*.json ./
RUN npm install 
COPY . .
EXPOSE 5000
CMD ["node","src/app.js"]
