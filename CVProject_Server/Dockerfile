FROM openjdk:23-oraclelinux8
#working directory
WORKDIR /app
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
#run image
#RUN mvnw ./mvnw dependency:go-offline
RUN chmod +x mvnw && ./mvnw dependency:go-offline
COPY src ./src
#run inside container
CMD ["./mvnw", "spring-boot:run"]