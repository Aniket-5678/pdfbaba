import Category from "../models/category.model.js";
import { categoryController } from "../controllers/categoryController.js";
import test from "node:test";
import assert from "node:assert/strict";
import Note from "../models/note.model.js";
import {
  createNote,
  deleteNote,
  updateNote,
  getAllNotes,
  getSingleNote,
} from "../controllers/note.controller.js";
const response = () => ({
  code: 200,
  body: null,
  status(code) {
    this.code = code;
    return this;
  },
  json(body) {
    this.body = body;
    return this;
  },
});
test("notes create sanitizes HTML and reports duplicate titles", async () => {
  const original = Note.create;
  let stored;
  try {
    Note.create = async (value) => (stored = value);
    const res = response();
    await createNote(
      {
        body: {
          title: "React",
          category: "Technology",
          content:
            '<h2>Hooks</h2><script>alert(1)</script><a href="javascript:alert(1)">unsafe</a>',
          tags: ["react"],
        },
      },
      res,
    );
    assert.equal(res.code, 201);
    assert.ok(stored.content.includes("<h2>Hooks</h2>"));
    assert.ok(!stored.content.includes("<script"));
    assert.ok(!stored.content.includes("javascript:"));
    Note.create = async () => {
      throw Object.assign(new Error(), { code: 11000 });
    };
    const duplicate = response();
    await createNote(
      { body: { title: "React", category: "Technology", content: "hello" } },
      duplicate,
    );
    assert.equal(duplicate.code, 409);
  } finally {
    Note.create = original;
  }
});
test("updating tags to empty and content uses a fully loaded document", async () => {
  const original = Note.findById;
  let saved = false;
  const note = {
    title: "Old",
    category: "technology",
    content: "original",
    tags: ["old"],
    save: async () => {
      saved = true;
    },
  };
  try {
    Note.findById = async () => note;
    const res = response();
    await updateNote(
      {
        params: { id: "test" },
        body: {
          title: "New",
          content: "<p>Updated</p><script>unsafe()</script>",
          tags: [],
        },
      },
      res,
    );
    assert.ok(saved);
    assert.deepEqual(note.tags, []);
    assert.equal(note.content, "<p>Updated</p>");
    assert.equal(note.title, "New");
  } finally {
    Note.findById = original;
  }
});
test("search treats regex punctuation literally and list excludes full content", async () => {
  const original = Note.find;
  let query, projection;
  try {
    Note.find = (q) => {
      query = q;
      return {
        select(value) {
          projection = value;
          return this;
        },
        sort: async () => [],
      };
    };
    const res = response();
    await getAllNotes(
      { query: { search: "React.*", category: "code-errors" } },
      res,
    );
    assert.equal(query.title.$regex, "React\\.\\*");
    assert.equal(projection, "-content");
    assert.equal(res.body.count, 0);
  } finally {
    Note.find = original;
  }
});
test("note slugs are matched literally", async () => {
  const original = Note.findOne;
  let query;
  try {
    Note.findOne = async (q) => {
      query = q;
      return null;
    };
    const res = response();
    await getSingleNote({ params: { slug: ".*" } }, res);
    assert.equal(query.slug.$regex, "^\\.\\*$");
    assert.equal(res.code, 404);
  } finally {
    Note.findOne = original;
  }
});

test("deleting a note removes only the selected record and missing notes return 404", async () => {
  const original = Note.findById;
  let deleted = false;
  try {
    Note.findById = async () => ({
      deleteOne: async () => {
        deleted = true;
      },
    });
    const res = response();
    await deleteNote({ params: { id: "selected" } }, res);
    assert.ok(deleted);
    assert.equal(res.body.success, true);
    Note.findById = async () => null;
    const missing = response();
    await deleteNote({ params: { id: "missing" } }, missing);
    assert.equal(missing.code, 404);
  } finally {
    Note.findById = original;
  }
});

test("category API exposes note categories even when legacy category names differ", async () => {
  const originalFind = Category.find,
    originalDistinct = Note.distinct;
  try {
    Category.find = () => ({
      sort: async () => [
        {
          name: "technology study material",
          slug: "technology-study-material",
        },
      ],
    });
    Note.distinct = async () => [
      "technology",
      "code errors",
      "bachelors",
      "entrance exam",
    ];
    const res = response();
    await categoryController({}, res);
    assert.equal(res.body.category[0].name, "technology study material");
    assert.deepEqual(
      res.body.noteCategories.map((c) => c.slug),
      ["bachelors", "code-errors", "entrance-exam", "technology"],
    );
  } finally {
    Category.find = originalFind;
    Note.distinct = originalDistinct;
  }
});
