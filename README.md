# Full Stack POS APP

![CAPTURE!](https://raw.githubusercontent.com/pojokcodeid/fulstack-posapp-expressjs-reactjs/main/img.png)

# Setup

- Rename file frontend/.env_example
  ubah sesuai dengan konfig yang dilakukan contoh :

```
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=120000
```

- Rename file backend/.env_example
  ubah sesuai dengan konfig yang dilakukan contoh :

```
DATABASE_URL="mysql://root:@localhost:3306/relasi_db"
PORT=3000

FILE_MAX_SIZE=5000000
FILE_MAX_MESSAGE="File size must be less than 5MB"
FILE_EXTENSION=[".png", ".jpg", ".jpeg"]

JWT_SECRET=mrFSJDopzyX515uNScCvjdn1QoFeYLzsWI1uhHkwWzf4eleGaK
JWT_EXPIRES_IN=100s
JWT_REFRESH_SCRET=EiKZqZWB6vVrnB77I6P04G7mINRd6S6eJ99uf7wGvlAYgwh8cE
JWT_REFRESH_EXPIRES_IN=86400s   #exired in 1 day
```

- Restore database example dump-db.sql
