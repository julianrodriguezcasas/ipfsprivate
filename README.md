# Docker-IPFS

#### Inicio proyecto

Arrancar la red de IPFS:
```
docker-compose up -d
```

Arrancar la API en /node:
```
docker-compose up -d
```


# Notas

## Comandos Información IPFS:

Obtención información de nuestro peer:
```
ipfs id
```


## Comandos Bootstrap nodes:

Obtención todos los Bootstrap peers (Información replicada):
```
ipfs bootstrap list
```

Añadir un nuevo Bootstrap peer:

```
ipfs bootstrap add </ip4/{IP_Peer}/tcp/4001/ipfs/{Peer_ID}>
```

Eliminar un Bootstrap peer:
```
ipfs bootstrap rm </ip4/{IP_Peer}/tcp/4001/ipfs/{Peer_ID}>
```
Eliminar un Todos los Bootstrap peer's:
```
ipfs bootstrap rm --all
```

## Prueba de IPFS con la colección de Postman:

Descarga de la colección de Postman y el entorno de IPFS.
Colecciones:
            -Files : 
                    Add new File -> Añadir nuevo archivo
                    Get File -> Obtener archivo mediante su Hash
            -Network :
                    Get Network Node Configuration -> obtener configuración de nodos (Bootstrap y Swarm)
                    Add Bootstrap Peer -> Añadir nuevo Nodo de tipo Bootstrap
            -Healthcheck :
                    Healthcheck -> Comprobación de conectividad con la red IPFS
            -Node Configuration
                    Get Node Configuration -> Obtención de la configuración del Nodo
