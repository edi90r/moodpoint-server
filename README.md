# moodPoint -backend 1.0.0

## "INNOES - program grantowy na rzecz innowacji społecznych w obszarze dostępności"

Aplikacja serwerowa dla do obsługi frontendu Panelu administratora oraz aplikacji mobilnej moodPoint.

## Funkcjonalności

- Logowanie oraz autentyfikacja zarówno administratora jak i użytkownika aplikacji moodPoint.
- Dodawanie, usuwanie edcyja użytkowników. 
- Dodawanie usuwanie notatek nt. użytkownika.
- REST API

## Technologia

W aplikacji zastosowano poszczególne technologie

- Node - 16.15.1
- Express 4.18.1
- Express-session 1.17.3
- Mongoose 6.3.3


## Instalacja

moodpoint-backend wymaga [Node.js](https://nodejs.org/) v10+ do uruchomienia.

##### Dla uruchumoienia wersji deweloperskiej...

Aby uruchomić aplikacje serwerową w wersji deweloperskiej, należy się upewnić, że w pliku .env zostały uzupełnione wszelkie zmienne środowiskowe.
Nastepnie przechodzimy do folderu ./moodpoint-backend i instalujemy za pomocą komendy npm i potrzebne dependecje.

```sh
cd moodpoint-backend
npm i
```

Następnie komendą npm run dev, uruchamiamy wersje deweloperską aplikacji.

```sh
npm run dev
```

##### Dla uruchumoienia wersji produkcyjnej...

Aby uruchomić wersje produkcyjna aplikacji należy przeniesć aplikacje na server VPS, następnie poleceniem

```sh
npm i
```

zainstalowac potrzebne dependencje. PRzed uruchomieniem wersji produkcyjnej należy uzupełnic odpowiednie zmienne środowiskowe o dane potzrebne do zalogowania się do bazy danych.

Po zainstalowaniu dependencji oraz uzupełnieniu pliku .env należy zbudować wersję produkcyjną aplikacji poleceniem

```sh
npm run build
```


## License

Licencja na wyłączność INNOES
