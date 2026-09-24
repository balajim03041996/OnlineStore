# OnlineStore – TODO (step by step)

Work top to bottom. Tick `[x]` when a step is done **and** you can explain it.
Each step ends with an **Interview Q&A** review before moving on.
See [DESIGN.md](DESIGN.md) for the architecture, DB schema, and API list.

---

## Step 0 – Setup

- [ ] `git init` in `D:\git\balaji__\OnlineStore` + root `.gitignore` (bin, obj, node_modules, .vs)
- [ ] First commit

## Step 1 – Backend foundation

- [x] Create `Server/OnlineStore.API` (.NET 10 Web API, controllers) + `Server/OnlineStore.slnx`
- [x] Remove WeatherForecast sample
- [x] Create folders: Controllers, Services, Data, Entities, DTOs, Middleware, Helpers
- [x] Add Scalar UI to test the API in the browser (`/scalar`)
- [x] Add `HealthController` → `GET /api/health` works
- [ ] Understand `Program.cs`: builder, DI container, middleware pipeline
- [ ] 📝 Interview Q&A: middleware order, DI, `Program.cs` flow

## Step 2 – Database with EF Core (Code-First)

- [ ] Install packages: `Microsoft.EntityFrameworkCore.SqlServer`, `.Tools`, `.Design`; `dotnet tool install --global dotnet-ef`
- [ ] Create entities: `Category`, `Product`
- [ ] Create `AppDbContext` + Fluent API config (decimal precision, relationships)
- [ ] Add connection string for LocalDB in `appsettings.Development.json`
- [ ] Register DbContext in `Program.cs`
- [ ] `dotnet ef migrations add InitialCreate` → `dotnet ef database update`
- [ ] Seed categories and products
- [ ] Look at the tables in SQL (sqlcmd / VS Code SQL extension)
- [ ] 📝 Interview Q&A: Code-First vs DB-First, migrations, DbContext lifetime, relationships

## Step 3 – Products & Categories CRUD API

- [ ] DTOs: `ProductDto`, `CreateProductDto`, `UpdateProductDto`
- [ ] `IProductService` / `ProductService` (async)
- [ ] `ProductsController`: GET all, GET by id, POST, PUT, DELETE
- [ ] `CategoriesController`: GET all
- [ ] Validation with DataAnnotations
- [ ] Test every endpoint with Swagger / `.http` file
- [ ] 📝 Interview Q&A: REST verbs & status codes, DTO vs Entity, DI lifetimes, async/await, `AsNoTracking`

## Step 4 – Error handling & logging

- [ ] Global exception middleware returning `ProblemDetails`
- [ ] Custom exceptions (`NotFoundException`)
- [ ] `ILogger` usage in services
- [ ] 📝 Interview Q&A: custom middleware, exception filters vs middleware, logging levels

## Step 5 – React basics: product list

- [ ] Clean Vite starter, create folder structure (api, components, pages, context, hooks, routes)
- [ ] Install axios; create `api/axiosClient.js` with a base URL
- [ ] Enable CORS in the API for `http://localhost:5173`
- [ ] `ProductList` page + `ProductCard` component (`useState` + `useEffect`)
- [ ] Loading and error states
- [ ] 📝 Interview Q&A: components/props/state, `useEffect` dependency array, CORS, virtual DOM

## Step 6 – Routing

- [ ] Install `react-router-dom`
- [ ] Layout with `Navbar` + `<Outlet />`
- [ ] `ProductDetails` page using `useParams`
- [ ] 404 page
- [ ] 📝 Interview Q&A: SPA vs MPA, client-side routing, URL params

## Step 7 – Shopping cart

- [ ] `CartContext` (add, remove, update qty, clear, total)
- [ ] Persist cart in `localStorage`
- [ ] Cart page + cart badge in Navbar
- [ ] 📝 Interview Q&A: Context API vs Redux, prop drilling, lifting state up, `useReducer`

## Step 8 – Paging, sorting, filtering, search

- [ ] API: `ProductQueryParams` + `PagedResult<T>`
- [ ] Build the query with `IQueryable` (Where / OrderBy / Skip / Take)
- [ ] React: search box (debounce), category filter, sort dropdown, pagination component
- [ ] 📝 Interview Q&A: IQueryable vs IEnumerable, deferred execution, SQL OFFSET/FETCH, indexes

## Step 9 – Authentication & Authorization

- [ ] Add ASP.NET Core Identity + migration
- [ ] `AuthController`: register, login → returns JWT
- [ ] Configure JWT Bearer auth; seed `Admin` role + admin user
- [ ] Protect endpoints with `[Authorize]` / `[Authorize(Roles = "Admin")]`
- [ ] React: `AuthContext`, Login/Register pages, axios interceptor adds the token
- [ ] `ProtectedRoute` component
- [ ] 📝 Interview Q&A: JWT structure, authN vs authZ, hashing vs encryption, token storage, refresh tokens

## Step 10 – Orders & Checkout

- [ ] Entities: `Order`, `OrderItem` + migration
- [ ] `OrdersController`: create order (validate stock, snapshot price, reduce stock) in a **transaction**
- [ ] My orders endpoint
- [ ] React: Checkout page, My Orders page
- [ ] 📝 Interview Q&A: transactions & ACID, one-to-many, concurrency (RowVersion)

## Step 11 – Admin area

- [ ] Admin product list with edit/delete
- [ ] Create/edit product form (controlled inputs + validation)
- [ ] Admin orders page, update status
- [ ] 📝 Interview Q&A: controlled vs uncontrolled forms, role-based UI

## Step 12 – SQL practice (on our real DB)

- [ ] Joins: products with category names; orders with items
- [ ] GROUP BY / HAVING: sales per category, top 5 products
- [ ] Create an index on `Products.Name`; compare execution plans
- [ ] Write a stored procedure `GetSalesReport` and call it from EF Core
- [ ] Window functions: `ROW_NUMBER`, `RANK`
- [ ] 📝 Interview Q&A: normalization, clustered vs non-clustered index, views vs SPs, DELETE vs TRUNCATE

## Step 13 – Testing & polish

- [ ] xUnit test project + Moq; unit test `ProductService`
- [ ] Integration test with `WebApplicationFactory` (optional)
- [ ] README with how-to-run steps
- [ ] 📝 Interview Q&A: unit vs integration tests, mocking, SOLID principles in this project

## Step 14 – Interview prep wrap-up

- [ ] Draw the architecture from memory
- [ ] Explain the full request flow (React click → API → DB → back)
- [ ] 2-minute "tell me about your project" pitch
- [ ] Review all Q&A sections

---

## Progress Log

| Date | Step | Notes |
|------|------|-------|
|      |      |       |
