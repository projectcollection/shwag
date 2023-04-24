# test-react

## install
```
pnpm i
```

## setup

- add `.env` file at the root
```
VITE_BASE_URL="backend_base_url"
```

- backend server
```
docker pull dheerajthedev123/bootcamp-api:dbfixed
```
- run container
```
docker run -p 8077:8077 dheerajthedev123/bootcamp-api:dbfixed
// should be available at localhost:8077
```

## dev
```
pnpm dev
```

## routes

- `/`
- `/signup`
- `/login`
- `/dashboard`

note: the forms are pre-filled, for `/signup`, change the email to prevent
duplicates.


