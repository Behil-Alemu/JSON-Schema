process.env.NODE_ENV = "test"

const request = require("supertest");

const app = require("../app");


const db = require("../db");
const Book = require("../models/book");

describe("Test Book class", function () {
    beforeEach(async function () {
        await db.query("DELETE FROM books");
        let b = await Book.create(
            {
                "isbn": "0789689",
                "amazon_url": "http://test.co/eobPtX2",
                "author": "test guy",
                "language": "english",
                "pages": 264,
                "publisher": "Yale University Press",
                "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
                "year": 2017
              }
           
            );
      });

      test("can create book", async function () {
        let b = await Book.create(
            {
                "isbn": "0691161518",
                "amazon_url": "http://a.co/eobPtX2",
                "author": "Matthew Lane",
                "language": "english",
                "pages": 264,
                "publisher": "Princeton University Press",
                "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
                "year": 2017
              });
            expect(b.author).toBe("Matthew Lane");
            expect(b.year).not.toBe("2017");
        })
        test("can get book", async function () {
            let b = await Book.findOne("0789689");
            expect(b).toEqual(
                {
                    "isbn": "0789689",
                    "amazon_url": "http://test.co/eobPtX2",
                    "author": "test guy",
                    "language": "english",
                    "pages": 264,
                    "publisher": "Yale University Press",
                    "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
                    "year": 2017
                  });
          });
})

describe("GET /books", function () {
    test("Gets a list books", async function () {
      const response = await request(app).get(`/books`);
      const books = response.body.books;
      expect(books).toHaveLength(1);
      expect(books[0]).toHaveProperty("isbn");
      expect(books[0]).toHaveProperty("amazon_url");
    });
  });


afterAll(async function() {
    await db.end();
  });