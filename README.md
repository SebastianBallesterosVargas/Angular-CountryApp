# Countries App CLI version 18.1.1.

Aplicación para el consumo de api de paises y sus posibles implementaciones.

## RouterLink y RouterLinkActive

Rutas con parámetros personalizados `CountryPageComponent`

## DebounceTime

Implementación de `Debouncer` en `SearchBoxComponent`.

Permite suscribirse a la emisión de un `Subject`, en este caso un campo de texto el cual espera 300msl para emitir el valor del termino de búsqueda.
Finaliza con una Subscripción a la emisión `this.debouncerSubscription`, la cual se elimina en el ciclo de vida `NgOnDestroy`

## SwitchMaps | RxJS

Implementación de `SwitchMap` para recibir el parámetro de una ruta (En medio de una Subscripción) y realizar el consumo de un servicio en `SearchBoxComponent`
