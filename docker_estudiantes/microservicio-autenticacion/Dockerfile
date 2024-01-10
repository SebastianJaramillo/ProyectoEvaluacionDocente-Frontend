FROM openjdk:21
EXPOSE 8081
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} microservicio-autenticacion.jar
ENTRYPOINT ["java","-jar","/microservicio-autenticacion.jar"]   