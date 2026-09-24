using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace OnlineStore.API.Data.Migrations
{
    /// <inheritdoc />
    public partial class SeedCategoriesAndProducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[,]
                {
                    { 1, "Phones, laptops and gadgets", "Electronics" },
                    { 2, "Fiction and technology books", "Books" },
                    { 3, "Men and women apparel", "Clothing" },
                    { 4, "Kitchen and home essentials", "Home" }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "CategoryId", "CreatedAt", "Description", "ImageUrl", "Name", "Price", "StockQuantity" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2026, 9, 24, 0, 0, 0, 0, DateTimeKind.Utc), "Latest Apple smartphone", "https://picsum.photos/seed/iphone/400/300", "iPhone 15", 999.99m, 50 },
                    { 2, 1, new DateTime(2026, 9, 24, 0, 0, 0, 0, DateTimeKind.Utc), "Flagship Samsung smartphone", "https://picsum.photos/seed/galaxy/400/300", "Samsung Galaxy S23", 899.99m, 30 },
                    { 3, 2, new DateTime(2026, 9, 24, 0, 0, 0, 0, DateTimeKind.Utc), "Classic novel by F. Scott Fitzgerald", "https://picsum.photos/seed/gatsby/400/300", "The Great Gatsby", 10.99m, 100 },
                    { 4, 3, new DateTime(2026, 9, 24, 0, 0, 0, 0, DateTimeKind.Utc), "Comfortable cotton t-shirt", "https://picsum.photos/seed/shirt/400/300", "Men's Unitedcolors of benetton T-Shirt", 19.99m, 200 },
                    { 5, 4, new DateTime(2026, 9, 24, 0, 0, 0, 0, DateTimeKind.Utc), "High-speed kitchen blender", "https://picsum.photos/seed/blender/400/300", "Blender", 49.99m, 75 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4);
        }
    }
}
