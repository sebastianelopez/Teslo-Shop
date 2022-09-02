# Next.js Teslo Shop

Para correr localmente se necesita la base de datos

```
docker-compose up -d
```

\*El -d, signficica **detached**

\*MongoDB URL Local:

```
    mongodb://localhost:27017/teslodb
```

## Configurar las variales de entorno

Renombrar el archivo **.env.template** a **.env**

## Llenar la base de datos con informacion de pruebas

Llamara:

```
    http://localhost:3000/api/seed
```
