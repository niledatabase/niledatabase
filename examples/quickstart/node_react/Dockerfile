FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npm install -g typescript
RUN npm install -g ts-node

# Bundle app source
COPY . .

# Assuming port 3006 for now. Will get the port management working here later.
EXPOSE 3006
CMD ["npm", "run", "dev"]
