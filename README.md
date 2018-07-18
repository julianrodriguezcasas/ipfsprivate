# Docker-IPFS

#### Inicio proyecto

Configuración docker-compose:

- BOOTSTRAP_PEER={ IP_NODO_REMOTO }

```
$ docker-compose up 'ipfsBootstrap' | 'ipfsSwarm'
```

Configuración servicio ipfsBootstrap se requiere lanzar el siguiente comando:

```
$ docker exec ipfsBootstrap "/input/connect.sh"
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
Pruebas tanto de subir archivos, como obtención de los mismos.

