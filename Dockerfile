FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
ENV PORT=5000
ENV EMAIL_PASS=mzebqksxpdlrwonb
ENV EMAIL_USER=bipingowda7@gmail.com
CMD ["npm", "start"]