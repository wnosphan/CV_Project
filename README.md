<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Commits][commits-shield]][commits-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">CVProject</h3>

  <p align="center">
    <br />
    <a href=""><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="">View Demo</a>
    ·
    <a href="https://github.com/wnosphan/CV_Projec/issues">Report Bug</a>
    ·
    <a href="https://github.com/wnosphan/CV_Projec/issues">Request Feature</a>
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#start-environment">Start Environment</a>
    </li>
    <li><a href="#testing-cvproject-server-endpoints">Testing cvproject-server endpoints</a></li>
    <li><a href="#shutdown">Shutdown</a></li>
    <li><a href="#how-to-upgrade-cvproject-ui-dependencies-to-latest-version">How to upgrade cvproject-ui dependencies to latest version</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contributor">Contributor</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->


## About The Project

<!--[![Product Name Screen Shot][product-screenshot]](https://example.com)-->

The goal of this project is to secure CV_Project using Keycloak. cv-project consists of two applications: one is a Spring Boot Rest API called cvproject-server and another is a React application called cvproject-ui.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Built With
<!--
- [`Java 17+`](https://www.oracle.com/java/technologies/downloads/#java17)
- [`npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [`Docker`](https://www.docker.com/)
- [`Keycloak`](https://www.keycloak.org/)
-->

* [![React][React.js]][React-url]
* [![Java][java.com]][java-url]
* [![Docker][docker.com]][docker-url]
* [![Keycloak][keycloak.org]][keycloak-url]
* [![Npm][npm.com]][npm-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Start Environment

- In a terminal and inside `CV_Project` root folder run
  ```
  docker compose up -d
  ```

- Wait for all Docker containers to be up and running. To check it, run
  ```
  docker compose ps
  ```

## Running CV_Project using Maven & Npm

- **Installation**

  - Choose an folder and clone this repository

    ```
    https://github.com/wnosphan/CV_Project.git
    ```

- **cvproject-server**


- **cvproject-ui**
  - Open another terminal and navigate to `CV_Project/cvproject-ui` folder
   - Run the command below if you are running the application for the first time

      ```
      npm install
      ```

  - Run the `npm` command below to start the application

      ```
      npm start
      ```

  <p align="right">(<a href="#readme-top">back to top</a>)</p>
  

## Applications URLs

| Application       | URL                                   | Credentials                           |
|-------------------|---------------------------------------|---------------------------------------|
| cproject-server   | http://localhost:8088                 |                                       |
| cvproject-ui      | http://localhost:3000                 |                                       |
| Keycloak          | http://localhost:8080/admin           |                                       |


<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Testing cvproject-server endpoints

### Getting Access Token

- Open a terminal

- Run the following commands to get the access token
  ```
  curl -X POST \
    "http://localhost:8080/realms/(this-is-what-your-realms)/protocol/openid-connect/token" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "username=your-user" \
    -d "password=your-password" \
    -d "grant_type=password" \
    -d "client_id=your-client-id" \
    -d "client_secret=your-client-secret" \
  ```

- This is how it looks like
  ```
  curl -X POST "http://localhost:8080/realms/cvproject/protocol/openid-connect/token" -H "Content-Type: application/x-www-form-urlencoded" -d "username=julian" -d "password=123" -d "grant_type=password" -d "client_id=react-auth" -d "client_secret=oLTNsGCxnKA6mPxcmnQuEuHApBi5x9Jo"
  ```

- The response should provide us with a JWT token like:
  ```
  {
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJfaUkyTS02dGw1SWJ2eVF3M1hIQkNIc3BoUHBIeko1eHpGU0x3ZFJwdzV3In0.eyJleHAiOjE3MDk2MDk0NTIsImlhdCI6MTcwOTYwOTE1MiwianRpIjoiNTkyZDIxMTItNDlmYi00ZTY2LWEyNWMtZjFiODRjYzY1NWU1IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9jdnByb2plY3QiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiM2ViZjE0ZWEtNjM4Yy00N2E4LTg0NjMtYzJhY2QyYjJkZDA4IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicmVhY3QtYXV0aCIsInNlc3Npb25fc3RhdGUiOiIxYjM4MjJkZi0xZjYxLTRlYWYtOWI2My1mYjdiZGNmOGIwYmQiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwNyIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwNiIsImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MSIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMSIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLWsiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjFiMzgyMmRmLTFmNjEtNGVhZi05YjYzLWZiN2JkY2Y4YjBiZCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoianUgbGlhbiIsInByZWZlcnJlZF91c2VybmFtZSI6Imp1bGlhbiIsImdpdmVuX25hbWUiOiJqdSIsImZhbWlseV9uYW1lIjoibGlhbiJ9.U9V1GIDTFRW4R_pWIavPuwNkEQX44iKBTSFTSf8_u0tHFBvvd9wYW_hLuNUdEGa9Ca1i7CDZ-ooptKMUgEoDhFeZLJGkrMkxmyoZjVeeu9bnaNCzWlDfpbUtaTeBUcQZ2LWg-dy3fS2vjhA0y_N5mFc1g0cyAMY88dJOvbIbSihe9UlMzhYRYRVu1rNzxixbqTS8NcbP3oftb80VYBVtB0O5koO012aKc61mrt9ncn-UCaDRRi_Nwq5lzS5l0j1A5AAWnX6cMQdL55cbADakiopYAe2UNCxTJe4BRoXd6WvXpznihcXpCHmokNTToyYldrs6e24zHfY17qlSyNkMyQ",
    "expires_in": 300,
    "refresh_expires_in": 1800,
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2MjdkMzA3OS1jOGE2LTQxODQtYWIwMy1kMTZkYWNmMWM4YmQifQ.eyJleHAiOjE3MDk2MTA5NTIsImlhdCI6MTcwOTYwOTE1MiwianRpIjoiNTAwYzIwM2MtYjczZS00Y2U5LTgzMDktN2JlMzYxZDQyMWFmIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9jdnByb2plY3QiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvcmVhbG1zL2N2cHJvamVjdCIsInN1YiI6IjNlYmYxNGVhLTYzOGMtNDdhOC04NDYzLWMyYWNkMmIyZGQwOCIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJyZWFjdC1hdXRoIiwic2Vzc2lvbl9zdGF0ZSI6IjFiMzgyMmRmLTFmNjEtNGVhZi05YjYzLWZiN2JkY2Y4YjBiZCIsInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjFiMzgyMmRmLTFmNjEtNGVhZi05YjYzLWZiN2JkY2Y4YjBiZCJ9.jNkTkSyv4hVnzw701Oel8OPtGYvpn5jEgA7IUuE3ndc",
    "token_type": "Bearer",
    "not-before-policy": 0,
    "session_state": "1b3822df-1f61-4eaf-9b63-fb7bdcf8b0bd",
    "scope": "profile email"
  }
  ```

  > **Note**: In [jwt.io](https://jwt.io), you can decode and verify the `JWT` access token

- Get the access token and run the command:
  ```
  curl -i http://localhost:8088/hello \-H "Authorization: Bearer your-access-token"
  ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Shutdown

- To stop `cvproject-server` and `cvproject-ui`, go to the terminals where they are running and press `Ctrl+C`

- To stop and remove docker compose containers, network and volumes, go to a terminal and, inside `CV_Project` root folder, run the command below
  ```
  docker compose down -v
  ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## How to upgrade movies-ui dependencies to latest version

- In a terminal, make sure you are in `CV_Project/cvproject-ui` folder

- Run the following commands
  ```
  npm upgrade
  npm i -g npm-check-updates
  ncu -u
  npm install
  ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributor

<table>
  <tr align="center">
    <td align="center"><a href="https://github.com/KuaDtrai"><img src="https://avatars.githubusercontent.com/u/143081364?v=4" width="100px;" alt="Donavon West"/><br /><sub><b>Ho Thanh Kien</b></sub></a><br />💻</a></td>
    <td align="center"><a href="https://github.com/wnosphan"><img src="https://avatars.githubusercontent.com/u/158177389?v=4" width="100px;" alt="Donavon West"/><br /><sub><b>wnosphan</b></sub></a><br />💻</a></td>
    <td align="center"><a href="https://github.com/dokkazy"><img src="https://avatars.githubusercontent.com/u/87236537?v=4" width="100px;" alt="Donavon West"/><br /><sub><b>Võ Công Huy</b></sub></a><br />💻</a></td>
   
  </tr>
</table>

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/wnosphan/CV_Project.svg?style=for-the-badge
[contributors-url]: https://github.com/wnosphan/CV_Project/graphs/contributors
[commits-shield]: https://img.shields.io/github/commit-activity/w/wnosphan/CV_Project?style=for-the-badge&labelColor=000000
[commits-url]: https://github.com/wnosphan/CV_Project/graphs/commit-activity
[forks-shield]: https://img.shields.io/github/forks/wnosphan/CV_Project.svg?style=for-the-badge
[forks-url]: https://github.com/wnosphan/CV_Project/network/members
[stars-shield]: https://img.shields.io/github/stars/wnosphan/CV_Project.svg?style=for-the-badge
[stars-url]: https://github.com/wnosphan/CV_Project/stargazers
[issues-shield]: https://img.shields.io/github/issues/wnosphan/CV_Project.svg?style=for-the-badge
[issues-url]: https://github.com/wnosphan/CV_Project/issues
[license-shield]: https://img.shields.io/github/license/wnosphan/CV_Project.svg?style=for-the-badge
[license-url]: https://github.com/wnosphan/CV_Project/blob/master/LICENSE.txt
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://react.dev/
[java.com]: https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white
[java-url]: https://www.oracle.com/java/technologies/downloads/#java17
[docker.com]: https://img.shields.io/badge/Docker-d4dbd3?style=for-the-badge&logo=docker&logoColor=blue
[docker-url]: https://www.docker.com/
[keycloak.org]: https://img.shields.io/badge/Keycloak-23.0.7-ff2f00?style=for-the-badge
[keycloak-url]: https://www.keycloak.org/
[npm.com]: https://img.shields.io/badge/npm-ccc?style=for-the-badge&logo=npm&logoColor=#fff
[npm-url]: https://www.npmjs.com

