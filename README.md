# Challenge 5

### Halaman API Documentation

`/api-docs`

### Inisialisasi Project

1. Clone repository

```
git clone https://github.com/rianwp/binar-fsw-CH5-challenge.git
```

2. Install dependency

```
npm install
```

3. Buat file `.env` dan copy env variable dari file `.env.example`

4. Inisialisasi database

```
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
```

5. Menjalankan server

```
npm run dev
```

6. Mengakses sesuai PORT yang ditentukan, defaultnya `localhost:3000`

### Email dan Password superadmin

1. Email : superadmin@mail.com
2. Password : superadmin

### Notes

1. Untuk mengakses edit, delete dan get by id admin, harus melakukan login dengan admin tersebut atau role yang lebih tinggi (superadmin)

2. Untuk mengakses delete dan get by id member, harus melakukan login dengan member tersebut atau role yang lebih tinggi (superadmin, admin)

3. Untuk mengakses get all data dari admin atau member, harus memiliki role yang lebih tinggi (untuk mengakses get all data admin, harus memiliki role superadmin, lalu untuk mengakses all data dari member harus memiliki role admin atau superadmin)

4. Untuk api edit member hanya bisa dilakukan oleh member yang memiliki id tersebut
