FROM ubuntu:disco AS build
MAINTAINER Ross Golder <ross@golder.org>

# Set terminal to be noninteractive
ENV DEBIAN_FRONTEND noninteractive

RUN sed -i 's/deb-src/# deb-src/' /etc/apt/sources.list
RUN apt-get update && \
    apt-get upgrade -y -f && \
    apt-get install --no-install-recommends -y npm git ca-certificates && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

ADD . /build
WORKDIR /build
RUN npm install -g @angular/cli npm@latest && npm install
RUN ng build --prod

FROM ubuntu:disco

# Set terminal to be noninteractive
ENV DEBIAN_FRONTEND noninteractive

RUN sed -i 's/deb-src/# deb-src/' /etc/apt/sources.list
RUN apt-get update && \
    apt-get upgrade -y -f && \
    apt-get install --no-install-recommends -y nginx ca-certificates && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

# put nginx config in place
RUN rm -f /etc/nginx/sites-enabled/*
COPY docker/etc/nginx.conf /etc/nginx/sites-available/sdmgr-ui.conf
RUN ln -sf /etc/nginx/sites-available/sdmgr-ui.conf /etc/nginx/sites-enabled/sdmgr-ui.conf

# Put our static docroot into place
COPY --from=build /build/dist /srv
WORKDIR /srv/sdmgr-ui

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
