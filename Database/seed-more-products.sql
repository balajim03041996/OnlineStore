-- Adds 25 demo products (no images -> the UI shows a placeholder).
-- Run once: Azure portal -> sqldb-onlinestore -> Query editor, and/or locally on (localdb)\MSSQLLocalDB, database OnlineStore.
-- Categories: 1 Electronics, 2 Books, 3 Clothing, 4 Home

INSERT INTO Products (Name, Description, CategoryId, Price, StockQuantity, ImageUrl, CreatedAt) VALUES
('OnePlus 12',                 'Snapdragon flagship with fast charging',      1, 699.99,  40, NULL, GETUTCDATE()),
('Google Pixel 8',             'Clean Android with a great camera',           1, 649.00,  25, NULL, GETUTCDATE()),
('Sony WH-1000XM5 Headphones', 'Noise cancelling wireless headphones',        1, 349.99,  18, NULL, GETUTCDATE()),
('Apple AirPods Pro',          'Wireless earbuds with ANC',                   1, 249.00,   6, NULL, GETUTCDATE()),
('Dell XPS 13 Laptop',         '13-inch ultrabook, 16 GB RAM',                1, 1199.00, 12, NULL, GETUTCDATE()),
('Logitech MX Master 3S',      'Ergonomic wireless mouse',                    1,  99.99,  60, NULL, GETUTCDATE()),
('Samsung 27" Monitor',        '4K IPS monitor for work and play',            1, 329.00,   0, NULL, GETUTCDATE()),
('Kindle Paperwhite',          'Waterproof e-reader with warm light',         1, 139.99,  35, NULL, GETUTCDATE()),
('Clean Code',                 'Robert C. Martin - writing maintainable code',2,  32.50,  80, NULL, GETUTCDATE()),
('The Pragmatic Programmer',   'Classic guide for software developers',       2,  39.99,  45, NULL, GETUTCDATE()),
('Atomic Habits',              'James Clear - small changes, big results',    2,  16.99, 120, NULL, GETUTCDATE()),
('Designing Data-Intensive Applications', 'Martin Kleppmann - systems design',2, 44.99,   4, NULL, GETUTCDATE()),
('Wings of Fire',              'Autobiography of Dr. A.P.J. Abdul Kalam',     2,   9.99,  90, NULL, GETUTCDATE()),
('C# in Depth',                'Jon Skeet - deep dive into C#',               2,  42.00,  20, NULL, GETUTCDATE()),
('Classic Denim Jacket',       'Unisex blue denim jacket',                    3,  59.99,  30, NULL, GETUTCDATE()),
('Cotton Polo T-Shirt',        'Breathable cotton polo, regular fit',         3,  24.99, 150, NULL, GETUTCDATE()),
('Running Shoes',              'Lightweight shoes with cushioned sole',       3,  79.99,   8, NULL, GETUTCDATE()),
('Formal White Shirt',         'Slim fit shirt for office wear',              3,  29.99,  70, NULL, GETUTCDATE()),
('Winter Hoodie',              'Fleece hoodie with front pocket',             3,  44.99,   0, NULL, GETUTCDATE()),
('Non-stick Frying Pan',       '28 cm induction-ready pan',                   4,  34.99,  55, NULL, GETUTCDATE()),
('Electric Kettle',            '1.5 L stainless steel kettle',                4,  27.50,  65, NULL, GETUTCDATE()),
('Air Fryer',                  '4 L air fryer, oil-free cooking',             4,  89.99,  15, NULL, GETUTCDATE()),
('Ceramic Dinner Set',         '18-piece ceramic dinner set',                 4,  64.00,   9, NULL, GETUTCDATE()),
('Table Lamp',                 'LED desk lamp with dimmer',                   4,  22.99,  40, NULL, GETUTCDATE()),
('Mixer Grinder',              '750 W mixer grinder with 3 jars',             4,  54.99,  28, NULL, GETUTCDATE());

SELECT COUNT(*) AS TotalProducts FROM Products;
