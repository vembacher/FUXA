FROM node:18.5.0

# Create app directory
WORKDIR /usr/src/app/FUXA
COPY ./ ./

# Install server
WORKDIR /usr/src/app/FUXA/server
RUN npm install

WORKDIR /usr/src/app/FUXA/server
EXPOSE 1881
CMD [ "npm", "start" ]