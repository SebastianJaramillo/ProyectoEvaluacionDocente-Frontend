FROM openjdk:21
VOLUME /tmp
EXPOSE 8080
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} microservicioevalucion.jar
ENTRYPOINT ["java","-jar","/microservicioevalucion.jar"]   