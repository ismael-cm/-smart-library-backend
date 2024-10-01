# Smart Library Backend

Este es el backend para la aplicación de Smart Library. Utiliza Express y MongoDB para gestionar la información de los usuarios y las funcionalidades de la biblioteca.

## Requisitos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v12 o superior)
- [MongoDB](https://www.mongodb.com/) (local o en la nube)

## Instalación

1. Clona este repositorio en tu máquina local:
    ```bash
    git clone https://github.com/tu_usuario/smart-library-backend.git
    cd smart-library-backend
    ```

2. Instala las dependencias del proyecto:
    ```bash
    npm install
    ```

3. Crea un archivo `.env` en la raíz del proyecto y añade lo siguiente:
    ```bash
    MONGO_URI=mongodb://your_local_ip:27017/smart-library
    PORT=5000
    ```

    Asegúrate de reemplazar `your_local_ip` con la dirección IP local de tu máquina donde se está ejecutando MongoDB.

## Uso

Para iniciar el servidor, ejecuta:

```bash
npm start
