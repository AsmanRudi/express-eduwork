# TODO - Fix Product Routes ✅

## Step 1: Create controller functions in `app/product/controller.js`
- [x] Add `index` function - Get all products
- [x] Add `show` function - Get product by ID  
- [x] Add `store` function - Create product with image upload

## Step 2: Clean up `app/product/routes.js`
- [x] Remove duplicate `GET /product` handler
- [x] Remove placeholder `GET /product/:id` handler
- [x] Fix `GET /product` to use controller.index
- [x] Fix `GET /product/:id` to use controller.show
- [x] Fix `POST /product` to use controller.store
- [x] Remove `connection.end()` calls (not needed for pool)
- [x] Fix image upload target path (use ../../uploads)

## Step 3: Fix controller.js overwriting exports bug
- [x] Remove duplicate callback-based `index` function (dead code)
- [x] Remove second `module.exports` that was overwriting the first one
- [x] Keep only the clean async-await `module.exports = { index, show, store }`

## Step 4: Fix package.json typo
- [x] Remove fake `"myql": "^1.0.0"` dependency

## Step 5: Test
- [x] Run `npm start` and test endpoints

## Step 6: Fixed bugs & added missing features
- [x] Fixed `index` - Added search by name (`?search=keyword`) with proper SQL logic
- [x] Added `destroy` function - Renamed from `delete` to match route reference, fixed SQL syntax `DELETE * FROM` → `DELETE FROM`, added proper JSON response

## Step 7: Added API v2 with Sequelize
- [x] Created `config/sequalize.js` - Sequelize connection to `eduwork-cruds-v2` database
- [x] Created `app/product_v2/model.js` - Product model with fields: users_id, name, price, stock, status, image_url
- [x] Created `app/product_v2/routes.js` - POST /product endpoint using Sequelize
- [x] Fixed import path in `model.js` (was `../config/sequalize` → `../../config/sequalize`)
- [x] Fixed `config/sequalize.js` - Corrected `{ sequelize }` → `{ Sequelize }` and `new sequelize` → `new Sequelize`
- [x] Removed invalid `await Product.async()` call from routes
- [x] Updated `app.js` to mount v2 routes at `/api/v2`
- [x] Verified Sequelize connection: `Connection has been established successfully.`

## API Status
| Endpoint | Method | Description | Status |
|----------|--------|-------------|--------|
| `/api/v1/product` | GET | List all products (supports `?search=`) | ✅ |
| `/api/v1/product/:id` | GET | Get product by ID | ✅ |
| `/api/v1/product` | POST | Create product (with image upload) | ✅ |
| `/api/v1/product/:id` | PUT | Update product (with image upload) | ✅ |
| `/api/v1/product/:id` | DELETE | Delete product | ✅ |
| `/api/v2/product` | POST | Create product (Sequelize ORM) | ✅* |

*Note: v2 POST returns 500 until `Products` table is created in `eduwork-cruds-v2` database

