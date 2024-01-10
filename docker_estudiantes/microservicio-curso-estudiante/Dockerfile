FROM openjdk:21
EXPOSE 8080
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} microservicio-curso-estudiante.jar
ENTRYPOINT ["java","-jar","/microservicio-curso-estudiante.jar"]