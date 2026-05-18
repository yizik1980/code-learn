import type { Lesson } from '../../types'

export const sqlLessonsEn: Lesson[] = [
  {
    id: 'intro',
    title: 'Introduction to SQL',
    summary: 'What is SQL, databases, tables, rows and columns',
    emoji: '🗄️',
    content: [
      { type: 'heading', text: 'What is a Database?' },
      { type: 'text', text: 'A database is an organized place to store information. Think of it like a giant Excel file — but much faster, safer, and more powerful. Every app you use — Instagram, Amazon, your bank — stores its data in a database.' },
      { type: 'heading', text: 'What is SQL?' },
      { type: 'text', text: "SQL stands for Structured Query Language. It's the language we use to talk to a database. Want to get data? Change it? Delete it? Everything goes through SQL." },
      { type: 'tip', text: 'SQL is pronounced either "sequel" or "S-Q-L" — both are widely accepted.' },
      { type: 'heading', text: 'Tables, Rows & Columns' },
      { type: 'text', text: 'Data is organized in tables. Each table has columns (the types of data) and rows (the individual records).' },
      {
        type: 'table',
        caption: 'customers table',
        headers: ['id', 'name', 'city', 'age'],
        rows: [
          ['1', 'Alice Smith', 'New York', '30'],
          ['2', 'Bob Jones', 'Chicago', '25'],
          ['3', 'Carol White', 'Boston', '45'],
        ],
      },
      { type: 'heading', text: 'Primary Key' },
      { type: 'text', text: 'Every table usually has an id column — a unique identifier for each row. This is called the Primary Key. It guarantees we can find any specific record.' },
      {
        type: 'code',
        lang: 'sql',
        caption: 'Your first SQL query',
        code: `-- The -- symbol marks a comment (ignored by the database)
-- Let's view all customers:
SELECT * FROM customers;

-- Result:
-- id | name         | city     | age
-- 1  | Alice Smith  | New York | 30
-- 2  | Bob Jones    | Chicago  | 25
-- 3  | Carol White  | Boston   | 45`,
      },
      { type: 'tip', text: 'SQL is case-insensitive — SELECT, select, and Select all work the same. Convention is to write keywords in uppercase.' },
    ],
    questionBank: [
      { id: 'q1', text: 'What does SQL stand for?', options: ['Super Query Language', 'Structured Query Language', 'System Question Logic', 'Standard Query List'], correct: 1, explanation: 'SQL = Structured Query Language — the standard language for managing relational databases.' },
      { id: 'q2', text: 'What is a Primary Key?', options: ['The first row in a table', 'A unique identifier for each row', 'The name of the table', 'A database password'], correct: 1, explanation: 'A Primary Key uniquely identifies each row — usually the id column. It prevents duplicate records.' },
      { id: 'q3', text: 'What is the difference between a row and a column?', options: ['No difference', 'Row = a field, Column = a record', 'Row = one record, Column = a type of data', 'Row = a table, Column = a database'], correct: 2, explanation: 'A row (record) is one entry — e.g., one customer. A column (field) is a type of data — e.g., "name" or "age".' },
      { id: 'q4', text: 'What does RDBMS stand for?', options: ['A web server type', 'Relational Database Management System', 'A network protocol', 'A programming language'], correct: 1, explanation: 'RDBMS = Relational Database Management System. Examples: MySQL, PostgreSQL, SQLite.' },
      { id: 'q5', text: 'Is SQL case-sensitive?', options: ['Yes, must use uppercase', 'Yes, must use lowercase', 'No — SELECT, select, Select all work', 'Depends on the database'], correct: 2, explanation: 'SQL keywords are case-insensitive. Convention is uppercase for keywords (SELECT, FROM, WHERE).' },
      { id: 'q6', text: 'Which of these is a relational database (RDBMS)?', options: ['MongoDB', 'Redis', 'PostgreSQL', 'DynamoDB'], correct: 2, explanation: 'PostgreSQL is a relational database that uses SQL. MongoDB and Redis are NoSQL databases.' },
      { id: 'q7', text: 'How many tables can a database have?', options: ['Only one', 'Up to 10', 'Up to 100', 'As many as needed'], correct: 3, explanation: 'A database can have thousands of tables. Large applications often have hundreds of tables.' },
      { id: 'q8', text: 'What does the -- symbol do in SQL?', options: ['Subtracts a value', 'Marks a comment — text after it is ignored', 'Connects two queries', 'Marks the start of a query'], correct: 1, explanation: 'The -- symbol starts a comment. Everything after it on that line is ignored by the database.' },
    ],
  },
  {
    id: 'select',
    title: 'SELECT — Fetching Data',
    summary: 'How to retrieve data from a table — all or specific columns',
    emoji: '🔍',
    content: [
      { type: 'heading', text: 'SELECT — The Most Used Command' },
      { type: 'text', text: 'SELECT is the command you will use most often. It fetches data from a table. Basic form: select columns → from (FROM) a table.' },
      {
        type: 'code', lang: 'sql', caption: 'Basic SELECT',
        code: `-- Asterisk (*) = all columns
SELECT * FROM products;

-- Select specific columns
SELECT name, price FROM products;

-- Select as many columns as you want
SELECT id, name, category, price FROM products;`,
      },
      { type: 'heading', text: 'Aliases with AS' },
      { type: 'text', text: "Sometimes a column name isn't user-friendly. Use AS to give it a different name in the results — the table itself doesn't change." },
      {
        type: 'code', lang: 'sql', caption: 'Column aliases',
        code: `SELECT
  name     AS product_name,
  price    AS cost,
  category AS type
FROM products;`,
      },
      { type: 'heading', text: 'DISTINCT — Remove Duplicates' },
      { type: 'text', text: 'To see only unique values in a column — without duplicates — use DISTINCT.' },
      {
        type: 'code', lang: 'sql', caption: 'DISTINCT',
        code: `-- How many different cities do customers come from?
SELECT DISTINCT city FROM customers;

-- If 100 customers come from 5 cities, we get 5 rows

-- Works with multiple columns too
SELECT DISTINCT city, country FROM customers;`,
      },
      { type: 'tip', text: 'SELECT * is great for quick checks, but in production code it\'s better to name specific columns — clearer code and faster queries.' },
    ],
    questionBank: [
      { id: 'q1', text: 'What does SELECT * FROM employees return?', options: ['Only the first column', 'Only the first row', 'All rows and all columns', 'Deletes all data'], correct: 2, explanation: 'SELECT * FROM table returns every row and every column. The asterisk (*) means "all columns".' },
      { id: 'q2', text: 'What does DISTINCT do?', options: ['Sorts results A to Z', 'Returns only one row', 'Removes rows with duplicate values', 'Selects specific columns'], correct: 2, explanation: 'DISTINCT removes duplicates — each unique value (or combination) appears only once in the results.' },
      { id: 'q3', text: 'Which syntax correctly aliases a column?', options: ['SELECT name CALLED full_name FROM users', 'SELECT name AS full_name FROM users', 'SELECT name = full_name FROM users', 'SELECT name RENAME full_name FROM users'], correct: 1, explanation: 'AS creates an alias. The alias appears as the column header in results but does not change the actual column name.' },
      { id: 'q4', text: 'If 200 customers come from 8 different cities, how many rows does SELECT DISTINCT city FROM customers return?', options: ['200', '8', '1', 'Depends on table size'], correct: 1, explanation: 'DISTINCT returns only unique cities. If there are 8 different cities, we get exactly 8 rows.' },
      { id: 'q5', text: 'What is the correct order for a SELECT statement?', options: ['FROM table SELECT columns', 'SELECT columns FROM table', 'GET columns FROM table', 'FETCH columns FROM table'], correct: 1, explanation: 'The correct order is SELECT columns FROM table. SELECT always comes first, then column names, then FROM and the table name.' },
      { id: 'q6', text: 'How many columns does SELECT id, name, email, age FROM users return?', options: ['1', '2', '3', '4'], correct: 3, explanation: 'We specified 4 columns (id, name, email, age) — so we get 4 columns. The number of rows depends on the table.' },
      { id: 'q7', text: 'What does SELECT 2 + 3 return?', options: ['Error — needs FROM', '5', '"2 + 3" as a string', 'NULL'], correct: 1, explanation: 'SQL can calculate expressions directly in SELECT without a FROM clause. SELECT 2+3 returns 5.' },
      { id: 'q8', text: 'What is an alias (AS) in SQL?', options: ['A permanent rename that changes the table', 'A temporary name shown in results only', 'A type of hidden column', 'A shortcut for writing queries'], correct: 1, explanation: 'An alias is a temporary name for a column in the result set. It does not change anything in the actual table.' },
      { id: 'q9', text: 'What does SELECT DISTINCT city, country FROM users return?', options: ['All unique cities only', 'All unique countries only', 'All unique city+country combinations', 'Error — DISTINCT only works on one column'], correct: 2, explanation: 'DISTINCT with multiple columns removes rows where ALL the combined values are the same.' },
      { id: 'q10', text: 'What is the difference between SELECT * and SELECT name, age?', options: ['No difference', 'SELECT * is always faster', 'SELECT * returns all columns; SELECT name, age returns only 2', 'SELECT name, age returns fewer rows'], correct: 2, explanation: 'SELECT * returns all columns in the table. SELECT name, age returns only those 2 columns. Row count is the same either way.' },
    ],
  },
  {
    id: 'where',
    title: 'WHERE — Filtering Data',
    summary: 'Find exactly what you need using conditions',
    emoji: '🎯',
    content: [
      { type: 'heading', text: 'WHERE — Setting Conditions' },
      { type: 'text', text: 'WHERE lets you filter results — only rows that match a condition are returned. Without WHERE, you get the entire table.' },
      {
        type: 'code', lang: 'sql', caption: 'Basic conditions',
        code: `-- Customers from New York
SELECT * FROM customers WHERE city = 'New York';

-- Products more expensive than 100
SELECT * FROM products WHERE price > 100;

-- Employees not aged 30
SELECT * FROM employees WHERE age != 30;

-- Comparison operators: = > < >= <= != (or <>)`,
      },
      { type: 'heading', text: 'AND, OR, NOT — Combining Conditions' },
      {
        type: 'code', lang: 'sql', caption: 'Combining conditions',
        code: `-- AND: both conditions must be true
SELECT * FROM customers
WHERE city = 'New York' AND age > 30;

-- OR: at least one condition must be true
SELECT * FROM customers
WHERE city = 'New York' OR city = 'Chicago';

-- NOT: reverses the condition
SELECT * FROM products WHERE NOT category = 'Furniture';`,
      },
      { type: 'heading', text: 'BETWEEN, IN, LIKE' },
      {
        type: 'code', lang: 'sql', caption: 'BETWEEN, IN, LIKE',
        code: `-- BETWEEN: within a range (inclusive)
SELECT * FROM products WHERE price BETWEEN 50 AND 200;

-- IN: list of allowed values
SELECT * FROM customers
WHERE city IN ('New York', 'Chicago', 'Boston');

-- LIKE: pattern matching
-- % = any number of characters, _ = exactly one character
SELECT * FROM customers WHERE name LIKE 'A%';     -- starts with A
SELECT * FROM customers WHERE name LIKE '%son';   -- ends with son
SELECT * FROM products WHERE name LIKE '%table%'; -- contains "table"`,
      },
      { type: 'heading', text: 'IS NULL — Missing Values' },
      {
        type: 'code', lang: 'sql', caption: 'NULL — missing value',
        code: `-- Customers with no email address
SELECT * FROM customers WHERE email IS NULL;

-- Customers who have an email
SELECT * FROM customers WHERE email IS NOT NULL;

-- Note: WHERE email = NULL does NOT work!
-- Always use IS NULL / IS NOT NULL`,
      },
      { type: 'tip', text: "NULL is not zero and not an empty string — it means 'no value'. That's why you can't compare with = and must use IS NULL." },
    ],
    questionBank: [
      { id: 'q1', text: 'What does SELECT * FROM products WHERE price > 100 return?', options: ['All products', 'Products with price greater than 100', 'The most expensive product', 'Deletes expensive products'], correct: 1, explanation: 'WHERE price > 100 filters and returns only rows where the price column value is greater than 100.' },
      { id: 'q2', text: 'What is the difference between AND and OR?', options: ['AND = one condition, OR = all', 'AND = all conditions must match, OR = at least one must', 'AND is faster than OR', 'No difference'], correct: 1, explanation: 'AND requires ALL conditions to be true. OR requires AT LEAST ONE to be true. AND narrows results, OR broadens them.' },
      { id: 'q3', text: "What does WHERE name LIKE 'A%' return?", options: ['Names containing A', 'Names ending with A', 'Names starting with A', 'Names the same length as A'], correct: 2, explanation: "In LIKE, % represents any sequence of characters. 'A%' = starts with A then anything. '%A' = ends with A." },
      { id: 'q4', text: 'What does BETWEEN 20 AND 40 check?', options: ['Values > 20 and < 40 (exclusive)', 'Values between 20 and 40 inclusive', 'Values not equal to 20 or 40', 'Average between 20 and 40'], correct: 1, explanation: 'BETWEEN is inclusive of both endpoints. WHERE age BETWEEN 20 AND 40 equals WHERE age >= 20 AND age <= 40.' },
      { id: 'q5', text: "What does WHERE city IN ('New York', 'Chicago') return?", options: ['Customers not from those cities', 'Customers from New York or Chicago', 'Error', 'Only the first customer from each city'], correct: 1, explanation: "IN checks if the value is in the list. city IN ('New York', 'Chicago') returns rows where city is New York OR Chicago." },
      { id: 'q6', text: 'How do you check if a column has no value?', options: ['WHERE email = NULL', 'WHERE email == NULL', 'WHERE email IS NULL', "WHERE email = ''"], correct: 2, explanation: 'NULL is special — you cannot compare with =. You must use IS NULL (or IS NOT NULL).' },
      { id: 'q7', text: "What does WHERE name LIKE '%son%' return?", options: ['Names starting with son', 'Names ending with son', 'Names containing "son" anywhere', 'Names exactly equal to son'], correct: 2, explanation: "'%son%' — % on both sides means son can be anywhere in the name. Johnson, Wilson, etc." },
      { id: 'q8', text: "What does WHERE city = 'Boston' AND age > 25 return?", options: ['All Boston customers + everyone over 25', 'Boston customers who are also over 25', 'Everyone over 25 from any city', 'Error'], correct: 1, explanation: 'AND requires both: must be from Boston AND must be over 25. Only rows matching both conditions are returned.' },
      { id: 'q9', text: "What is the difference between NULL and ''?", options: ['No difference', "NULL = no value at all; '' = an empty string", 'NULL = zero; empty string', 'NULL is greater than empty string'], correct: 1, explanation: "NULL means 'no value was ever entered'. '' is an empty string — a value was entered, it's just empty. An important distinction!" },
      { id: 'q10', text: 'What does NOT do before a condition?', options: ['Strengthens the condition', 'Reverses the condition — returns the opposite', 'Adds another condition', 'Removes previous conditions'], correct: 1, explanation: 'NOT inverts the condition. NOT category = \'Furniture\' = everything that is NOT furniture. NOT IN, NOT LIKE, NOT BETWEEN all work the same way.' },
    ],
  },
  {
    id: 'order-limit',
    title: 'ORDER BY & LIMIT',
    summary: 'Sort your results and limit how many you get back',
    emoji: '📊',
    content: [
      { type: 'heading', text: 'ORDER BY — Sorting Results' },
      { type: 'text', text: 'ORDER BY lets you receive results sorted by any column. Default is ascending order (ASC). Use DESC for descending.' },
      {
        type: 'code', lang: 'sql', caption: 'ORDER BY',
        code: `-- Sort by name A to Z (ascending, default)
SELECT * FROM customers ORDER BY name ASC;

-- Sort by price highest to lowest (descending)
SELECT * FROM products ORDER BY price DESC;

-- Sort by multiple columns:
-- first by city, then by name within each city
SELECT * FROM customers ORDER BY city, name;`,
      },
      { type: 'heading', text: 'LIMIT — Cap the Number of Results' },
      {
        type: 'code', lang: 'sql', caption: 'LIMIT',
        code: `-- Get only 10 rows
SELECT * FROM products LIMIT 10;

-- Top 5 most expensive products
SELECT * FROM products ORDER BY price DESC LIMIT 5;

-- If the table has fewer rows than LIMIT, no error occurs
-- 30 rows in table + LIMIT 100 = 30 rows returned`,
      },
      { type: 'heading', text: 'OFFSET — Pagination' },
      { type: 'text', text: 'OFFSET skips a number of rows. Combined with LIMIT, it lets you implement "pages" — like Google search results.' },
      {
        type: 'code', lang: 'sql', caption: 'LIMIT + OFFSET for pagination',
        code: `-- Page 1: rows 1-10
SELECT * FROM products ORDER BY id LIMIT 10 OFFSET 0;

-- Page 2: rows 11-20
SELECT * FROM products ORDER BY id LIMIT 10 OFFSET 10;

-- Page 3: rows 21-30
SELECT * FROM products ORDER BY id LIMIT 10 OFFSET 20;`,
      },
      { type: 'tip', text: 'Remember the order: SELECT → FROM → WHERE → ORDER BY → LIMIT → OFFSET. ORDER BY must come before LIMIT.' },
    ],
    questionBank: [
      { id: 'q1', text: 'What is the default sort order of ORDER BY?', options: ['DESC — highest to lowest', 'ASC — lowest to highest', 'Random', 'By id'], correct: 1, explanation: 'Default is ASC (Ascending). ORDER BY name is equivalent to ORDER BY name ASC.' },
      { id: 'q2', text: 'What does LIMIT 5 do?', options: ['Returns only 5 columns', 'Returns at most 5 rows', 'Skips the first 5 rows', 'Limits WHERE to 5 conditions'], correct: 1, explanation: 'LIMIT sets the maximum number of rows returned. LIMIT 5 = at most 5 rows.' },
      { id: 'q3', text: 'To get rows 11-20 (page 2), what do you write?', options: ['LIMIT 10 OFFSET 10', 'LIMIT 20 OFFSET 10', 'LIMIT 10 OFFSET 11', 'LIMIT 11 TO 20'], correct: 0, explanation: 'LIMIT 10 OFFSET 10 = take 10 rows, skip the first 10. This gives rows 11 through 20.' },
      { id: 'q4', text: 'What does ORDER BY price DESC return?', options: ['Prices lowest to highest', 'Prices highest to lowest', 'Prices in alphabetical order', 'Error'], correct: 1, explanation: 'DESC = Descending. ORDER BY price DESC sorts from the most expensive to the least expensive.' },
      { id: 'q5', text: 'What is the correct clause order?', options: ['ORDER BY, WHERE, LIMIT', 'WHERE, ORDER BY, LIMIT', 'LIMIT, WHERE, ORDER BY', 'WHERE, LIMIT, ORDER BY'], correct: 1, explanation: 'Correct order: SELECT → FROM → WHERE → ORDER BY → LIMIT. WHERE always before ORDER BY and LIMIT.' },
      { id: 'q6', text: 'What does SELECT * FROM users ORDER BY name ASC LIMIT 1 return?', options: ['User with the lowest id', 'User whose name comes first alphabetically', 'A random user', 'Error'], correct: 1, explanation: 'ORDER BY name ASC sorts alphabetically. LIMIT 1 takes only the first — the name that comes first in the alphabet.' },
      { id: 'q7', text: 'If the table has only 30 rows, how many does LIMIT 100 return?', options: ['Error', '0', '30', '100 with NULLs'], correct: 2, explanation: 'LIMIT is a maximum, not a minimum. If there are 30 rows, LIMIT 100 returns all 30 without an error.' },
      { id: 'q8', text: 'What does ORDER BY city, name do?', options: ['Sorts only by city', 'Sorts only by name', 'Sorts by city; within each city sorts by name', 'Error — can only sort by one column'], correct: 2, explanation: 'You can sort by multiple columns. First sorts by city, then within the same city sorts by name.' },
    ],
  },
  {
    id: 'join',
    title: 'JOIN — Combining Tables',
    summary: 'How to combine data from multiple tables',
    emoji: '🔗',
    content: [
      { type: 'heading', text: 'Why Do We Need JOIN?' },
      { type: 'text', text: 'In databases, data is spread across multiple tables. For example: the orders table contains only a customer_id, not the customer name. JOIN lets you combine data from multiple tables into one result.' },
      {
        type: 'table', caption: 'orders table',
        headers: ['id', 'customer_id', 'product', 'amount'],
        rows: [['1', '2', 'Laptop', '4500'], ['2', '1', 'Mouse', '120'], ['3', '2', 'Keyboard', '250']],
      },
      { type: 'heading', text: 'INNER JOIN — Only Matching Rows' },
      {
        type: 'code', lang: 'sql', caption: 'INNER JOIN',
        code: `-- All orders with customer names
SELECT
  orders.id,
  customers.name,
  orders.product,
  orders.amount
FROM orders
INNER JOIN customers ON orders.customer_id = customers.id;

-- Using table aliases (shorter)
SELECT o.id, c.name, o.product, o.amount
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id;`,
      },
      { type: 'tip', text: 'INNER JOIN returns only rows that have a match in BOTH tables. A customer with no orders won\'t appear. An order with no matching customer won\'t appear.' },
      { type: 'heading', text: 'LEFT JOIN — All Rows from the Left' },
      {
        type: 'code', lang: 'sql', caption: 'LEFT JOIN',
        code: `-- All customers, even those with no orders
SELECT c.name, o.product, o.amount
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id;

-- A customer with no orders appears with NULL in order columns
-- name: Carol White | product: NULL | amount: NULL`,
      },
      { type: 'heading', text: 'RIGHT JOIN — All Rows from the Right' },
      {
        type: 'code', lang: 'sql', caption: 'RIGHT JOIN',
        code: `-- All orders, even if the customer doesn't exist
SELECT c.name, o.product
FROM customers c
RIGHT JOIN orders o ON c.id = o.customer_id;

-- RIGHT JOIN is less common — usually replaced by
-- swapping the table order + LEFT JOIN`,
      },
    ],
    questionBank: [
      { id: 'q1', text: 'What does INNER JOIN do?', options: ['Returns all rows from the first table', 'Returns only rows with a match in BOTH tables', 'Permanently merges two tables', 'Multiplies the rows'], correct: 1, explanation: 'INNER JOIN returns only rows that satisfy the ON condition — meaning they have a matching record in both tables.' },
      { id: 'q2', text: 'What is the difference between LEFT JOIN and INNER JOIN?', options: ['No difference', 'LEFT JOIN also returns rows with no match in the right table', 'INNER JOIN returns more rows', 'LEFT JOIN is faster'], correct: 1, explanation: 'LEFT JOIN returns all rows from the left table, even if there is no match on the right (with NULL). INNER JOIN requires a match in both.' },
      { id: 'q3', text: 'What does ON define in a JOIN?', options: ['Which columns to display', 'The condition for how tables are connected', 'The sort order', 'The number of rows'], correct: 1, explanation: 'ON defines how the tables are connected — which fields must match. e.g., ON orders.customer_id = customers.id.' },
      { id: 'q4', text: 'What does LEFT JOIN return when there is no match in the right table?', options: ['The row is dropped from results', 'NULL in the right table columns', '0 in the right table columns', 'Error'], correct: 1, explanation: 'In LEFT JOIN, rows from the left table with no match on the right are returned with NULL in all right-table columns.' },
      { id: 'q5', text: 'How do you specify which table an id column belongs to when both tables have an id column?', options: ['Use id1 and id2', 'Write table_name.id', 'SQL figures it out automatically', 'Must rename the columns'], correct: 1, explanation: 'Write table_name.column_name. e.g., customers.id and orders.id. You can also use table aliases: c.id and o.id.' },
      { id: 'q6', text: 'If there are 5 customers and 8 orders, how many rows does INNER JOIN return?', options: ['40 (5×8)', '13 (5+8)', 'Depends on how many orders have a matching customer', '5'], correct: 2, explanation: 'INNER JOIN returns only matching rows. If 4 orders have a matching customer, we get 4 rows. Depends on the actual data.' },
      { id: 'q7', text: 'When you write FROM orders o, what is o?', options: ['Error — o is not a keyword', 'An alias (shorthand name) for the orders table', 'A column name', 'A filter condition'], correct: 1, explanation: 'o is a table alias. Instead of writing orders.id everywhere, you write o.id. Shorter and easier to read.' },
      { id: 'q8', text: 'Can you JOIN more than 2 tables?', options: ['No, only 2 tables', 'Yes, you can chain multiple JOINs', 'Yes, but only up to 3', 'Depends on the database'], correct: 1, explanation: 'You can chain JOINs: FROM a JOIN b ON ... JOIN c ON ... JOIN d ON ... as many as needed.' },
      { id: 'q9', text: 'What does INNER JOIN return when no rows match?', options: ['Error', 'NULL', 'Empty result — 0 rows', 'Both full tables'], correct: 2, explanation: 'If there are no matching rows, INNER JOIN returns 0 rows — an empty result set. Not an error.' },
      { id: 'q10', text: 'What makes RIGHT JOIN different from LEFT JOIN?', options: ['RIGHT JOIN is faster', 'RIGHT JOIN returns all rows from the RIGHT table, even with no match on the left', 'RIGHT JOIN returns only matching rows', 'No difference'], correct: 1, explanation: 'RIGHT JOIN is like LEFT JOIN in reverse — it returns all rows from the right table. Usually replaced by swapping table order + LEFT JOIN.' },
    ],
  },
  {
    id: 'aggregation',
    title: 'Aggregation & Grouping',
    summary: 'COUNT, SUM, AVG, GROUP BY, HAVING — summarize and analyze data',
    emoji: '📈',
    content: [
      { type: 'heading', text: 'Aggregate Functions' },
      { type: 'text', text: 'Aggregate functions compute a single value from a group of rows. They are essential for analysis — counting, summing, averaging, min and max.' },
      {
        type: 'code', lang: 'sql', caption: 'Basic aggregate functions',
        code: `-- How many products are there?
SELECT COUNT(*) AS total_products FROM products;

-- Total of all sales
SELECT SUM(amount) AS total_sales FROM orders;

-- Average product price
SELECT AVG(price) AS avg_price FROM products;

-- Cheapest and most expensive
SELECT MIN(price) AS cheapest, MAX(price) AS most_expensive
FROM products;`,
      },
      { type: 'heading', text: 'GROUP BY — Group by Category' },
      { type: 'text', text: 'GROUP BY groups rows with the same value and lets you compute an aggregate for each group separately.' },
      {
        type: 'code', lang: 'sql', caption: 'GROUP BY',
        code: `-- How many customers in each city?
SELECT city, COUNT(*) AS total
FROM customers
GROUP BY city;

-- Total sales per month
SELECT
  MONTH(order_date) AS month,
  SUM(amount) AS monthly_sales
FROM orders
GROUP BY MONTH(order_date)
ORDER BY month;`,
      },
      { type: 'tip', text: 'Important rule: in a query with GROUP BY, the SELECT can only include columns that are in GROUP BY, or columns inside an aggregate function.' },
      { type: 'heading', text: 'HAVING — Filter Groups' },
      { type: 'text', text: 'HAVING works like WHERE, but filters groups after GROUP BY — not individual rows.' },
      {
        type: 'code', lang: 'sql', caption: 'HAVING',
        code: `-- Cities with more than 10 customers
SELECT city, COUNT(*) AS total
FROM customers
GROUP BY city
HAVING COUNT(*) > 10;

-- WHERE filters before grouping
-- HAVING filters after grouping
SELECT city, COUNT(*) AS total
FROM customers
WHERE age > 18          -- first: filter rows by age
GROUP BY city
HAVING COUNT(*) > 5;    -- then: filter groups by count`,
      },
    ],
    questionBank: [
      { id: 'q1', text: 'What does COUNT(*) do?', options: ['Calculates an average', 'Returns the total sum', 'Counts the number of rows', 'Returns the highest value'], correct: 2, explanation: 'COUNT(*) counts the number of rows in the result. COUNT(column) counts rows where that column is not NULL.' },
      { id: 'q2', text: 'What is the key difference between WHERE and HAVING?', options: ['They are identical', 'WHERE filters rows before GROUP BY; HAVING filters groups after', 'HAVING filters rows; WHERE filters groups', 'WHERE is for text; HAVING is for numbers'], correct: 1, explanation: 'WHERE acts on individual rows before grouping. HAVING acts on groups after GROUP BY. Cannot use HAVING without GROUP BY typically.' },
      { id: 'q3', text: 'What does SELECT MAX(price) FROM products return?', options: ['The average price', 'The highest price', 'The sum of all prices', 'The count of products'], correct: 1, explanation: 'MAX returns the largest value in the column. MIN returns the smallest.' },
      { id: 'q4', text: 'What does GROUP BY city do?', options: ['Sorts by city', 'Removes duplicate cities', 'Groups rows with the same city to compute aggregates per city', 'Selects only one city'], correct: 2, explanation: 'GROUP BY groups all rows with the same city value, allowing you to compute COUNT/SUM/AVG for each city separately.' },
      { id: 'q5', text: 'What does SELECT AVG(age) FROM students return?', options: ['The highest age', 'The lowest age', 'The average age of all students', 'The sum of all ages'], correct: 2, explanation: 'AVG calculates the average — sum of all values divided by count of values.' },
      { id: 'q6', text: 'In a query with GROUP BY, what can you include in SELECT?', options: ['Any column you want', 'Only columns in GROUP BY, or inside aggregate functions', 'Only aggregate functions', 'Only columns in GROUP BY'], correct: 1, explanation: 'Key rule: every column in SELECT must either be in GROUP BY, or wrapped in an aggregate function (COUNT, SUM, AVG, MIN, MAX).' },
      { id: 'q7', text: "What does SELECT city, COUNT(*) FROM customers GROUP BY city HAVING COUNT(*) > 5 return?", options: ['All cities', 'Cities with more than 5 customers', 'Cities with fewer than 5 customers', 'The first 5 customers per city'], correct: 1, explanation: 'HAVING COUNT(*) > 5 filters and returns only groups (cities) where the row count exceeds 5.' },
      { id: 'q8', text: 'What is the difference between COUNT(*) and COUNT(email)?', options: ['No difference', 'COUNT(*) counts all rows; COUNT(email) skips rows where email is NULL', 'COUNT(email) counts everything; COUNT(*) skips NULL', 'COUNT(*) is faster'], correct: 1, explanation: 'COUNT(*) counts all rows regardless of NULL. COUNT(column) only counts rows where that column is not NULL.' },
      { id: 'q9', text: "What does SELECT MIN(salary) FROM employees WHERE dept = 'Engineering' return?", options: ['Average salary of engineers', 'Lowest salary in the Engineering department', 'Count of engineers', 'Error'], correct: 1, explanation: 'WHERE filters to Engineering department first, then MIN finds the lowest salary within that filtered group.' },
      { id: 'q10', text: 'What does SUM(amount) return?', options: ['The average amount', 'The highest amount', 'The total of all values in the column', 'The count of records'], correct: 2, explanation: 'SUM adds up all the values in the column. e.g., SUM(amount) gives the total revenue from all orders.' },
    ],
  },
  {
    id: 'dml',
    title: 'INSERT, UPDATE & DELETE',
    summary: 'Add, modify and remove data from a table',
    emoji: '✏️',
    content: [
      { type: 'heading', text: 'INSERT INTO — Adding Data' },
      { type: 'text', text: 'INSERT INTO adds new rows to a table. You specify the column names and the values to insert.' },
      {
        type: 'code', lang: 'sql', caption: 'INSERT INTO',
        code: `-- Insert one customer
INSERT INTO customers (name, city, age)
VALUES ('Alice Brown', 'Seattle', 28);

-- Insert multiple customers at once
INSERT INTO customers (name, city, age)
VALUES
  ('Bob Green', 'Portland', 35),
  ('Carol Blue', 'Denver', 22),
  ('Dave Red', 'Austin', 41);

-- Omitting a column gives it NULL (or default)
INSERT INTO customers (name) VALUES ('Eve White');`,
      },
      { type: 'heading', text: 'UPDATE — Modifying Data' },
      {
        type: 'code', lang: 'sql', caption: 'UPDATE',
        code: `-- Update city for a specific customer (by id)
UPDATE customers
SET city = 'Miami'
WHERE id = 5;

-- Update multiple fields at once
UPDATE employees
SET salary = salary * 1.1,
    title = 'Senior'
WHERE department = 'Engineering' AND years_exp > 5;`,
      },
      { type: 'tip', text: '⚠️ Always include WHERE in UPDATE! Without WHERE — every single row in the table gets updated. Before a large UPDATE, run a SELECT with the same WHERE to verify.' },
      { type: 'heading', text: 'DELETE — Removing Data' },
      {
        type: 'code', lang: 'sql', caption: 'DELETE',
        code: `-- Delete a specific customer
DELETE FROM customers WHERE id = 3;

-- Delete all customers from a city
DELETE FROM customers WHERE city = 'Chicago';

-- Delete ALL rows (⚠️ dangerous!)
-- DELETE FROM customers;
-- TRUNCATE TABLE customers; -- faster, deletes everything`,
      },
      { type: 'tip', text: '⚠️ DELETE without WHERE deletes ALL rows in the table! Always double-check your WHERE clause. For large deletes — back up first.' },
    ],
    questionBank: [
      { id: 'q1', text: 'What does INSERT INTO do?', options: ['Updates an existing row', 'Adds a new row to the table', 'Fetches data from the table', 'Deletes a row'], correct: 1, explanation: 'INSERT INTO adds new rows to a table. It does not modify existing rows — that is UPDATE.' },
      { id: 'q2', text: 'What happens if you forget WHERE in an UPDATE?', options: ['SQL throws an error', 'Updates one random row', 'Updates ALL rows in the table', 'Nothing happens'], correct: 2, explanation: 'Without WHERE, UPDATE modifies every single row in the table! This is a common and dangerous bug.' },
      { id: 'q3', text: 'What is the correct INSERT syntax?', options: ['VALUES, INSERT INTO, column names', 'INSERT INTO table (columns) VALUES (values)', 'INSERT VALUES INTO table', 'INTO table INSERT values'], correct: 1, explanation: 'The order is: INSERT INTO table_name (col1, col2) VALUES (val1, val2). Columns must match values in order.' },
      { id: 'q4', text: 'What happens if you forget WHERE in a DELETE?', options: ['SQL throws an error', 'Deletes one random row', 'Deletes ALL rows in the table', 'Nothing happens'], correct: 2, explanation: 'DELETE without WHERE removes every row in the table! Always verify with a SELECT using the same WHERE first.' },
      { id: 'q5', text: 'How do you insert a NULL value?', options: ["VALUES ('text', 0)", "VALUES ('text', NULL)", "VALUES ('text', EMPTY)", 'Cannot insert NULL'], correct: 1, explanation: 'Write NULL directly in VALUES. You can also omit the column from the column list — it will receive NULL automatically if no default is set.' },
      { id: 'q6', text: "What does UPDATE products SET price = price * 1.1 WHERE category = 'Electronics' do?", options: ['Deletes electronics', 'Adds 10% to the price of all electronics', 'Changes the category name', 'Error'], correct: 1, explanation: 'price * 1.1 = price × 1.1 = a 10% increase. The WHERE limits the update to the Electronics category only.' },
      { id: 'q7', text: 'Can you insert multiple rows with one INSERT statement?', options: ['No, only one row at a time', 'Yes, using multiple VALUES groups separated by commas', 'Yes, but only up to 10 rows', 'Depends on the database'], correct: 1, explanation: 'You can insert multiple rows: INSERT INTO table (cols) VALUES (row1), (row2), (row3). This is more efficient than separate INSERT statements.' },
      { id: 'q8', text: 'What can you put after SET in an UPDATE?', options: ['Only a constant value', 'A constant, a calculated expression, or a subquery', 'Only a SELECT', 'Only a column name'], correct: 1, explanation: 'After SET you can use: a constant (SET name = \'Alice\'), an expression (SET price = price * 1.1), or a subquery.' },
    ],
  },
  {
    id: 'subqueries',
    title: 'Subqueries',
    summary: 'A query inside a query — for solving complex problems',
    emoji: '🪆',
    content: [
      { type: 'heading', text: 'What is a Subquery?' },
      { type: 'text', text: 'A subquery (nested query) is a SELECT statement inside another query. The inner query runs first, and its result is used by the outer query.' },
      { type: 'heading', text: 'Subquery in WHERE' },
      {
        type: 'code', lang: 'sql', caption: 'Subquery in WHERE',
        code: `-- Products priced above the average
SELECT name, price
FROM products
WHERE price > (SELECT AVG(price) FROM products);

-- Customers who have placed at least one order
SELECT * FROM customers
WHERE id IN (SELECT customer_id FROM orders);

-- How it works:
-- 1. SELECT customer_id FROM orders → list of ids
-- 2. SELECT * FROM customers WHERE id IN (that list)`,
      },
      { type: 'heading', text: 'EXISTS — Check for Existence' },
      {
        type: 'code', lang: 'sql', caption: 'EXISTS',
        code: `-- Customers who have orders (using EXISTS)
SELECT * FROM customers c
WHERE EXISTS (
  SELECT 1
  FROM orders o
  WHERE o.customer_id = c.id
);

-- EXISTS checks: does the subquery return at least one row?
-- If yes → true, the row is included`,
      },
      { type: 'heading', text: 'Subquery in FROM — Derived Table' },
      {
        type: 'code', lang: 'sql', caption: 'Derived Table',
        code: `-- Customers whose average order is over 500
SELECT c.name, sub.avg_amount
FROM customers c
JOIN (
  SELECT customer_id, AVG(amount) AS avg_amount
  FROM orders
  GROUP BY customer_id
) sub ON c.id = sub.customer_id
WHERE sub.avg_amount > 500;

-- The subquery in FROM is called a "derived table"
-- It MUST have an alias (here: sub)`,
      },
      { type: 'tip', text: 'A subquery used as a table in FROM must always have an alias. Without one, SQL will throw an error.' },
    ],
    questionBank: [
      { id: 'q1', text: 'What is a subquery?', options: ['A JOIN between two tables', 'A SELECT statement inside another query', 'An aggregate function', 'A table update'], correct: 1, explanation: 'A subquery = a nested query = a SELECT inside another SELECT. The inner runs first, its result is used by the outer.' },
      { id: 'q2', text: 'Where can you use a subquery?', options: ['Only in WHERE', 'Only in FROM', 'In WHERE, FROM, SELECT, HAVING and more', 'Queries cannot be nested'], correct: 2, explanation: 'Subqueries can appear in WHERE, FROM, SELECT, HAVING, and other places. Very flexible.' },
      { id: 'q3', text: 'What does WHERE price > (SELECT AVG(price) FROM products) return?', options: ['Products priced at the average', 'Products priced above the average', 'The cheapest product', 'Error'], correct: 1, explanation: 'The inner query calculates the average, then the outer returns only products priced above that average.' },
      { id: 'q4', text: 'What does EXISTS check?', options: ['Whether a value exists in a column', 'Whether the subquery returns at least one row', 'Whether the table exists', 'Whether the database is online'], correct: 1, explanation: 'EXISTS returns true if the subquery returns at least one row, false if it returns nothing. It doesn\'t care about the content.' },
      { id: 'q5', text: 'What must a subquery in FROM always have?', options: ['A PRIMARY KEY', 'An alias', 'An ORDER BY', 'A LIMIT'], correct: 1, explanation: 'A subquery used as a table in FROM (derived table) must have an alias. Without one SQL throws an error.' },
      { id: 'q6', text: 'What is the performance difference between IN and EXISTS with subqueries?', options: ['IN is always faster', 'EXISTS is better for large subqueries; IN for small lists', 'No difference', 'EXISTS only works for NULL checks'], correct: 1, explanation: 'In practice: EXISTS is often more efficient for large subqueries because it stops as soon as the first match is found.' },
      { id: 'q7', text: 'Which runs first — the outer query or the inner subquery?', options: ['The outer query', 'The inner subquery', 'Both simultaneously', 'Depends on the database'], correct: 1, explanation: 'The inner subquery (nested) runs first. Its result is passed to the outer query.' },
      { id: 'q8', text: 'What happens if a subquery after = returns more than one value?', options: ['Returns the first value', 'Returns all values', 'Error — use IN instead of =', 'NULL'], correct: 2, explanation: 'When using = with a subquery, SQL expects a single value. If the subquery returns multiple rows — error. Use IN instead.' },
    ],
  },
  {
    id: 'indexes',
    title: 'Indexes & Performance',
    summary: 'Why queries slow down and how to speed them up with indexes',
    emoji: '⚡',
    content: [
      { type: 'heading', text: 'The Problem: Full Table Scan' },
      { type: 'text', text: 'When a database searches for rows, it has to check every single one. On a table with a million rows — that is very slow. This is called a "Full Table Scan".' },
      { type: 'heading', text: 'What is an Index?' },
      { type: 'text', text: 'An index is a separate data structure that helps the database find rows fast — without scanning the whole table. Think of it like an index at the back of a book — instead of reading every page, you go directly to the right one.' },
      {
        type: 'code', lang: 'sql', caption: 'Creating and dropping indexes',
        code: `-- Create an index on the email column
CREATE INDEX idx_customers_email
ON customers(email);

-- Unique index — also prevents duplicates
CREATE UNIQUE INDEX idx_users_email
ON users(email);

-- Composite index — covers multiple columns
CREATE INDEX idx_orders_customer_date
ON orders(customer_id, order_date);

-- Drop an index
DROP INDEX idx_customers_email;`,
      },
      { type: 'heading', text: 'When to Add an Index?' },
      { type: 'text', text: 'Indexes speed up reads (SELECT) but slow down writes (INSERT/UPDATE/DELETE) because the index also needs to be updated. Add indexes on columns you frequently search by (WHERE, JOIN, ORDER BY).' },
      {
        type: 'code', lang: 'sql', caption: 'EXPLAIN — analyze a query',
        code: `-- EXPLAIN shows how the database plans to execute the query
EXPLAIN SELECT * FROM orders WHERE customer_id = 5;

-- Without index: type = ALL (full table scan)
-- With index:    type = ref or index (fast!)`,
      },
      { type: 'tip', text: 'PRIMARY KEY and UNIQUE constraints automatically create indexes — the database does it for you. Queries by id are always fast.' },
    ],
    questionBank: [
      { id: 'q1', text: 'What is the problem with a Full Table Scan?', options: ['The table is not full', 'The database checks every row to find results — slow on large tables', 'The table is scanned twice', 'The query returns too many rows'], correct: 1, explanation: 'Without an index, the database must check every row. On a table with millions of rows, this takes a long time.' },
      { id: 'q2', text: 'What does an index do?', options: ['Adds a new column to the table', 'Enables fast lookups without scanning the whole table', 'Permanently sorts the table', 'Prevents duplicates'], correct: 1, explanation: 'An index is a separate data structure — like a book index — that lets the database jump directly to the relevant rows.' },
      { id: 'q3', text: 'What is the downside of indexes?', options: ['They slow down SELECT queries', 'They take space and slow down INSERT/UPDATE/DELETE', 'They don\'t work with WHERE', 'You can only have one index per table'], correct: 1, explanation: 'Indexes speed up reads but slow down writes — because every change to the table must also update the index. They also take disk space.' },
      { id: 'q4', text: 'What makes a UNIQUE INDEX special?', options: ['It is faster than a regular index', 'It prevents duplicate values in the column', 'It only works with PRIMARY KEY', 'It is created automatically'], correct: 1, explanation: 'A UNIQUE INDEX speeds up lookups AND ensures every value appears only once. Useful for email, username, national ID, etc.' },
      { id: 'q5', text: 'Is an index on PRIMARY KEY created automatically?', options: ['No, must be created manually', 'Yes, the database creates it automatically', 'Depends on the database', 'Only in MySQL'], correct: 1, explanation: 'PRIMARY KEY and UNIQUE constraints always create an index automatically. That\'s why id lookups are always fast.' },
      { id: 'q6', text: 'What does EXPLAIN show you?', options: ['The query results', 'How the database plans to execute the query — whether it uses an index', 'Errors in the query', 'The table structure'], correct: 1, explanation: 'EXPLAIN shows the "execution plan" — whether the database will use an index or do a Full Table Scan. Essential for optimization.' },
      { id: 'q7', text: 'On which columns is it best to add indexes?', options: ['All columns', 'Only PRIMARY KEY', 'Columns frequently used in WHERE, JOIN, ORDER BY', 'Only columns with unique values'], correct: 2, explanation: 'Indexes are most useful on columns you search by often — WHERE, JOIN, ORDER BY. Adding them everywhere hurts write performance.' },
      { id: 'q8', text: 'What is a Composite Index?', options: ['An index created automatically', 'An index covering multiple columns', 'A unique index', 'An index that covers the whole table'], correct: 1, explanation: 'A Composite Index covers multiple columns. Useful when you frequently search by a combination, e.g., WHERE customer_id = X AND order_date > Y.' },
    ],
  },
]
