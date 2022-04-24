FROM node:latest
RUN npm install --production
EXPOSE 80
ENTRYPOINT [ "npm" ]
CMD [ "start" ]
