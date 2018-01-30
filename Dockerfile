FROM node

RUN apt-get update

RUN mkdir -p /usr/src/app
# 命令的执行环境  npm 执行
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install --unsafe-perm
# build的时候肯定是
COPY . /usr/src/app
#RUN grunt deploy

CMD [ "npm", "run", "dev" ]
EXPOSE 3000
