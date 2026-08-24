# Express Eduwork REST API

REST API sederhana menggunakan **Express.js**, **MongoDB Native Driver**, dan **Mongoose** dengan dua versi endpoint.

Project ini dibuat untuk memenuhi tugas API Express & MongoDB dengan ketentuan:

* **API V1** menggunakan MongoDB Native Driver
* **API V2** menggunakan Mongoose
* Mendukung operasi CRUD Product
* Memiliki web interface sederhana
* Dapat dijalankan secara lokal
* Siap di-push ke GitHub dan di-deploy ke Heroku

---

## 🚀 Project Overview

Project ini merupakan REST API untuk mengelola data product.

Aplikasi menggunakan dua pendekatan database yang berbeda agar dapat dibandingkan:

```text
V1
/api/v1/products
        ↓
MongoDB Native Driver
        ↓
MongoDB
```

dan:

```text
V2
/api/v2/products
        ↓
Mongoose
        ↓
MongoDB
```

Kedua versi menggunakan database dan collection `products` yang sama.

---

## 🛠️ Technology Stack

### Backend

* Node.js
* Express.js
* JavaScript
* MongoDB
* MongoDB Native Driver
* Mongoose

### Middleware & Tools

* CORS
* Morgan
* Multer
* Nodemon
* Postman

### Frontend

* HTML
* CSS
* JavaScript

### Deployment

* GitHub
* Heroku

---

## 📁 Project Structure

```text
express-eduwork/
│
├── app/
│   ├── product_v1/
│   │   ├── controller.js
│   │   └── routes.js
│   │
│   └── product_v2/
│       ├── model.js
│       ├── controller.v2.js
│       └── routes.js
│
├── config/
│   ├── mongodb.js
│   └── mongoose.js
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── app.js
├── server.js
├── package.json
├── package-lock.json
├── .env.example
├── .gitignore
└── README.md
```

---

## 🔀 API Versioning

Project ini menggunakan dua versi API.

### V1 — MongoDB Native

Endpoint:

```text
/api/v1/products
```

Implementasi database menggunakan MongoDB Native Driver.

Contoh penggunaan:

```js
const { getDB } = require("../../config/mongodb");

const products = await getDB()
    .collection("products")
    .find({})
    .toArray();
```

V1 tidak menggunakan Mongoose.

---

### V2 — Mongoose

Endpoint:

```text
/api/v2/products
```

Implementasi database menggunakan Mongoose.

Contoh:

```js
const Product = require("./model");

const products = await Product.find();
```

V2 menggunakan Schema dan Model dari Mongoose.

---

# 📌 Product Data

Data product memiliki struktur:

```json
{
  "name": "Laptop Lenovo",
  "price": 7500000,
  "stock": 10,
  "category": "Elektronik",
  "status": true,
  "image_url": "https://example.com/laptop.jpg"
}
```

Field:

| Field       | Type    | Keterangan       |
| ----------- | ------- | ---------------- |
| `name`      | String  | Nama product     |
| `price`     | Number  | Harga product    |
| `stock`     | Number  | Jumlah stock     |
| `category`  | String  | Kategori product |
| `status`    | Boolean | Status product   |
| `image_url` | String  | URL gambar       |
| `createdAt` | Date    | Waktu dibuat     |
| `updatedAt` | Date    | Waktu diperbarui |

---

# 🔗 API Endpoint

## V1 — MongoDB Native

### Get All Products

```http
GET /api/v1/products
```

### Get Product By ID

```http
GET /api/v1/products/:id
```

### Create Product

```http
POST /api/v1/products
```

Request:

```json
{
  "name": "Laptop Lenovo",
  "price": 7500000,
  "stock": 10,
  "category": "Elektronik",
  "status": true,
  "image_url": "https://example.com/laptop.jpg"
}
```

### Update Product

```http
PUT /api/v1/products/:id
```

Request:

```json
{
  "price": 7000000,
  "stock": 15
}
```

### Delete Product

```http
DELETE /api/v1/products/:id
```

---

# V2 — Mongoose

### Get All Products

```http
GET /api/v2/products
```

### Get Product By ID

```http
GET /api/v2/products/:id
```

### Create Product

```http
POST /api/v2/products
```

Request:

```json
{
  "name": "Keyboard Mechanical",
  "price": 850000,
  "stock": 20,
  "category": "Aksesoris",
  "status": true,
  "image_url": "https://example.com/keyboard.jpg"
}
```

### Update Product

```http
PUT /api/v2/products/:id
```

### Delete Product

```http
DELETE /api/v2/products/:id
```

---

# 📊 Perbandingan V1 dan V2

| Fitur           | V1                               | V2                |
| --------------- | -------------------------------- | ----------------- |
| Database Driver | MongoDB Native                   | Mongoose          |
| Schema          | Manual                           | Mongoose Schema   |
| Model           | Tidak menggunakan model Mongoose | Menggunakan Model |
| GET             | ✅                                | ✅                 |
| POST            | ✅                                | ✅                 |
| PUT             | ✅                                | ✅                 |
| DELETE          | ✅                                | ✅                 |
| Collection      | `products`                       | `products`        |

Tujuan dari dua versi ini adalah menunjukkan implementasi REST API dengan dua pendekatan berbeda dalam mengakses MongoDB.

---

# 🌐 Web Interface

Project juga menyediakan web interface sederhana untuk mengelola product.

Buka:

```text
http://localhost:5000
```

Fitur web:

* Melihat daftar product
* Menambahkan product
* Mengedit product
* Menghapus product
* Memilih API V1 atau V2
* Melihat metode database yang digunakan
* Refresh data

Dropdown API pada web:

```text
V1 - MongoDB Native
V2 - Mongoose
```

Frontend menggunakan endpoint API yang dipilih secara dinamis.

---

# ⚙️ Installation

Clone repository:

```bash
git clone https://github.com/USERNAME/express-eduwork.git
```

Masuk ke folder:

```bash
cd express-eduwork
```

Install dependency:

```bash
npm install
```

---

# 🔐 Environment Variables

Buat file:

```text
.env
```

Isi:

```env
PORT=5000
MONGODB_URI=mongodb://admin:admin123@localhost:27017/eduwork-native?authSource=admin
```

Jangan commit file `.env` ke GitHub.

Gunakan `.env.example` sebagai template:

```env
PORT=5000
MONGODB_URI=mongodb://USERNAME:PASSWORD@localhost:27017/eduwork-native?authSource=admin
```

---

# ▶️ Running the Project

Untuk development:

```bash
npm run dev
```

Untuk production:

```bash
npm start
```

Aplikasi akan berjalan di:

```text
http://localhost:5000
```

---

# 🧪 Testing API

API dapat diuji menggunakan Postman.

Contoh:

```text
GET http://localhost:5000/api/v1/products
```

dan:

```text
GET http://localhost:5000/api/v2/products
```

Kamu juga dapat menggunakan web interface pada:

```text
http://localhost:5000
```

---

# ✅ API Health Check

Gunakan:

```http
GET /api/health
```

Response:

```json
{
  "success": true,
  "message": "API is running"
}
```

---

# ☁️ Deployment

Project dapat di-deploy ke Heroku.

Untuk deployment production, MongoDB lokal:

```text
mongodb://localhost:27017
```

tidak digunakan.

Gunakan MongoDB Atlas atau MongoDB server yang dapat diakses oleh aplikasi production.

Contoh environment variable di Heroku:

```text
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/eduwork-native
```

Setelah deployment berhasil:

```text
https://YOUR-HEROKU-APP.herokuapp.com
```

API:

```text
https://YOUR-HEROKU-APP.herokuapp.com/api/v1/products
```

```text
https://YOUR-HEROKU-APP.herokuapp.com/api/v2/products
```

---

# 📦 GitHub

Repository:

```text
https://github.com/USERNAME/express-eduwork
```

---

# 🌍 Live Demo

Heroku:

```text
https://YOUR-HEROKU-APP.herokuapp.com
```

V1:

```text
https://YOUR-HEROKU-APP.herokuapp.com/api/v1/products
```

V2:

```text
https://YOUR-HEROKU-APP.herokuapp.com/api/v2/products
```

> Ganti URL di atas dengan URL GitHub dan Heroku yang sebenarnya setelah deployment selesai.

---

# 🎯 Tujuan Pembelajaran

Project ini dibuat untuk mempraktikkan:

1. Membuat REST API menggunakan Express.js.
2. Menghubungkan Express dengan MongoDB.
3. Menggunakan MongoDB Native Driver.
4. Menggunakan Mongoose ODM.
5. Menerapkan API versioning.
6. Membuat CRUD Product.
7. Membuat frontend sederhana yang menggunakan REST API.
8. Melakukan testing dengan Postman.
9. Mengelola project dengan Git dan GitHub.
10. Melakukan deployment aplikasi ke Heroku.

---

# 👨‍💻 Author

**Asman Rudi**

GitHub:

```text
https://github.com/AsmanRudi
```

Project ini dibuat sebagai bagian dari pembelajaran dan tugas REST API Express.js & MongoDB.
