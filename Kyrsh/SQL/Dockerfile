FROM postgres:latest

COPY ./mysql.sql /docker-entrypoint-initdb.d/mysql.sql

ENV POSTGRES_USER=mylord
ENV POSTGRES_PASSWORD=mypass