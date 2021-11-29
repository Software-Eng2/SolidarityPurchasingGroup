FROM node:12.18.3

LABEL version="1.0"
LABEL description="This is the base docker image for the SolidarityPurchasingGroup frontend react app."

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package-docker.json ./package.json
COPY package-lock.json ./

RUN npm install --production


COPY . .

EXPOSE 3000

CMD ["npm", "start"]