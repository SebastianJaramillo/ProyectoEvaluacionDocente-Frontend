FROM openjdk:21
EXPOSE 8084
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} microserviciodocente.jar
ENTRYPOINT ["java","-jar","/microserviciodocente.jar"]   