FROM openjdk:21
VOLUME /tmp
EXPOSE 8080
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} microservicioautenticacion.jar
ENTRYPOINT ["java","-jar","/microservicioautenticacion.jar"]   