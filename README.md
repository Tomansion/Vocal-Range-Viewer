# Vocal Range Viewer

helps singers map and visualize their vocal range on a piano keyboard.

## Features
- Enter lowest & highest notes, chest/head voice boundaries
- Interactive piano highlighting selected keys

## Installation

```bash
npm install
```

## Development Server

```bash
npm start
# or
ng serve --open
```

## Build

```bash
ng build --prod
```

## Docker Build

```bash
docker build -t vocal-range-viewer .

docker run -p 80:80 vocal-range-viewer
```
