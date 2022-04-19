# web-to-pdf
Transform a web page to pdf file

This project is a browser executable tool developed with JavaScript. React is used for the frontend and NodeJs with Express for the backend.

The project can be started individually in each of its parts or with the Docker Compose that is already configured, to do this from the path from which it is found, we must run the command "docker-compose up -d --build" and this starts the project on ports 3000 (front) and 4004 (backend) in detached mode, so these ports must be free.

Once started, we will see a form that allows us to enter a web address. This tool allows us to obtain a PDF with the content of the website entered. It also offers two options, to choose the name of the downloaded document and the size of this document.