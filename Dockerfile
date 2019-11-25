FROM node:10-jessie as builder

COPY .npmrc package.json yarn.lock /app/

WORKDIR /app

RUN yarn install --production \
  && yarn cache clean \
  && rm /app/yarn.lock \
  && rm /app/.npmrc

# ---

FROM node:10-jessie-slim

RUN addgroup --system service \
  && adduser --system --debug --disabled-login service

COPY --chown=service:service --from=builder /app/node_modules /app/node_modules
COPY --chown=service:service --from=builder /app/package.json /app/
COPY --chown=service:service . /app/

WORKDIR /app

EXPOSE 3001 8081

USER service

CMD [ "yarn", "start" ]
