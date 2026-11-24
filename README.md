# adogtame-dogs-ms

Microservicio `Dogs` de Adogtame. Función AWS Lambda en TypeScript detrás de su propia API HTTP de API Gateway, desplegada con SST v4.

Documentación del servicio: [`adog_MS.md`](https://github.com/Magdala-Commitee-Corporation/adogtame-docs/blob/main/agent/instruments/adog_MS.md).

## Ambientes

| Stage | API directa | Por CloudFront |
|---|---|---|
| `dev` | https://dogs-api.dev.adogtame.vieerr.xyz | https://dev.adogtame.vieerr.xyz/api/dogs |
| `prod` | https://dogs-api.adogtame.vieerr.xyz | https://adogtame.vieerr.xyz/api/dogs |

La API limita el tráfico a 50 peticiones por segundo con ráfagas de 100 y responde 429 al exceder (RNF-23).

## Uso

```bash
npm install
npm run dev          # sst dev en el stage dev
npm run deploy:dev
npm run deploy:prod
```

Requiere el perfil de AWS `bier-personal`.

## Eventos

Una cola SQS (`Events`) suscrita a los temas de `adogtame-infra` con filtro por tipo de evento, y una cola de mensajes fallidos (`EventsDlq`) tras 5 intentos. El consumidor (`src/handlers/events.ts`) tiene un límite de 60 s. Detalle de los eventos en `adog_MS.md` §7.

Los eventos pendientes del *outbox* se reenvían en la siguiente petición que use la base, sin tarea programada, para no despertar el cluster de Aurora pausado (`adog_ARCH.md` §4.2).

## Ramas

`main` (producción), `dev` (integración) y `testing` (pruebas).
