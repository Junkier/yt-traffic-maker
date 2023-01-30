# 改用預先安裝好 playwright 的 nodejs image , 加速 deploy 速度
FROM asia-east1-docker.pkg.dev/regal-stone-229316/jetshop/base-nodejs-with-playwright 

COPY . /yt-tracffic-maker
WORKDIR /yt-tracffic-maker

RUN yarn install --prod

EXPOSE 11130
CMD npm run op:start