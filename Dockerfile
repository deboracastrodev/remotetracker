FROM node:20-slim

RUN apt-get update && apt-get install -y openssl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /home/debora/app

USER node

CMD ["tail", "-f", "/dev/null"]