# Distributed application for tracking package deliveries
![System architecture](docs/project_architecture.png)
### Description
A distributed application for tracking package deliveries.

<details>
  <summary style="font-size: 1.25em;"><b>Timeline</b></summary>

1. intro & install tools
2. server (java spring)
3. free session
4. mobile (android)/desktop app (C#)
5. frontend (vue)
6. free session
7. final presentation
</details>
<br>
<details>
  <summary style="font-size: 1.25em;"><b>Key Concepts</b></summary>

- [java, jdk](https://www.scaler.com/topics/java/how-java-program-works/)
- [java Spring, dependency injection](https://docs.spring.io/spring-framework/docs/3.2.x/spring-framework-reference/html/overview.html)

- [API](https://www.postman.com/what-is-an-api/), [API endpoint](https://blog.postman.com/what-is-an-api-endpoint/), [Postman](https://www.geeksforgeeks.org/introduction-postman-api-development/)
- [JSON](https://www.w3schools.com/whatis/whatis_json.asp)
- [HTTP](https://www.geeksforgeeks.org/what-is-http/)
- [Rest](https://www.geeksforgeeks.org/rest-api-introduction/)
- [Get, Post, Put/Patch, Delete](https://restfulapi.net/http-methods/)

- [SQL](https://www.w3schools.com/sql/sql_intro.asp) / [CRUD operations](https://www.freecodecamp.org/news/crud-operations-explained/)
- [ORM](https://www.baeldung.com/cs/object-relational-mapping), [Hibernate](https://medium.com/javarevisited/jpa-vs-hibernate-what-is-the-difference-between-them-0b7f49ad488f), [JDBC, JPA] (https://www.baeldung.com/jpa-vs-jdbc), SpringDataJPA

- optional: [Docker](https://www.simplilearn.com/tutorials/docker-tutorial/getting-started-with-docker)
</details>
<br>
<details>
  <summary style="font-size: 1.25em;"><b>Tools</b></summary>
Install following tools:

- [Git client](https://git-scm.com/downloads/win), [setup credentials locally](https://www.geeksforgeeks.org/how-to-set-git-username-and-password-in-gitbash/)
- [jdk](https://www.oracle.com/java/technologies/downloads), [mvn](https://maven.apache.org/download.cgi), [Intellij community edition](https://www.jetbrains.com/idea/download)
- [Postman](https://www.postman.com/downloads/)
- [Mysql installer](https://dev.mysql.com/downloads/installer/): install Mysql workbench, Mysql server, jdbc(JConnector)

Check installation in cmd:
- `git --version`
- `java --version`
- `mvn --version`

Other tools and libraries:
- spring project initializer: https://start.spring.io/
- [lombok](https://www.baeldung.com/intro-to-project-lombok)
- [vue](https://www.baeldung.com/spring-boot-vue-js)
- optional: [Docker](https://spring.io/guides/gs/spring-boot-docker)
</details>

### Project requirements
- Database:
  - Package: id, courier_id, created_on, delivery_address, pay_on_delivery, status (status poate fi NEW, PENDING, DELIVERED)
  - Courier: id, name, email, manager_id (managerul este tot un Courier)
- Server:
  - 8 endpoint-uri pentru operatiile CRUD pe Package, Courier + `getPackagesForCourier()`
  - 2 endpoint-uri cu custom query pentru `getAllCouriersWithoutPendingPackages()` si `getAllManagersAndDeliveredNumber()`
- Frontend:
  - sa permita operatii de tipul: create package, view my packages, view unassigned packages, assign package(s), deliver package, etc. Minim 6 operatii.
  - minim 4 componente Vue
- Desktop client:
  - sa permita minim 3 operatii: get all couriers without pending packages, get all managers and their number of packages, sendEmail to all selected persons (functionalitatea de sendEmail este inca un endpoint din server, se implementeaza usor cu SMTP, exista cod pe net)
- Documentatie:
  - diagrama use-case
  - diagrama secventiala pentru un caz de utilizare
  - **nimic tiparit!**

### Other notes
- Proiectul trebuie sa fie consistent (utilizare posibila fara alterarea manuala a bazei de date: ex: `getAllDeliveredPackages()` nu are sens fara `deliverPackage()`)
- 1p in plus pentru prezentarea inainte de vacanta
