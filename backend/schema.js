console.log("🔥 SCHEMA LOADED WITH deleteNotice");

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
} = require("graphql");
const db = require("./db");

/* ================= TYPES ================= */

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    role: { type: GraphQLString },
    flat_no: { type: GraphQLString },
  }),
});

const ComplaintType = new GraphQLObjectType({
  name: "Complaint",
  fields: () => ({
    id: { type: GraphQLInt },
    flat: { type: GraphQLString },
    category: { type: GraphQLString },
    issue: { type: GraphQLString },
    status: { type: GraphQLString },
    worker: { type: GraphQLString },
    worker_name: { type: GraphQLString },
    worker_phone: { type: GraphQLString },
    visit_date: { type: GraphQLString },
  }),
});

const NoticeType = new GraphQLObjectType({
  name: "Notice",
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    message: { type: GraphQLString },
    created_at: { type: GraphQLString },
  }),
});

/* ================= ROOT QUERY ================= */

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    complaints: {
      type: new GraphQLList(ComplaintType),
      resolve() {
        return new Promise((res, rej) => {
          db.query("SELECT * FROM complaints WHERE status='PENDING'", (e, r) => (e ? rej(e) : res(r)));
        });
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return new Promise((res, rej) => {
          db.query(
            "SELECT id, name, email, role, flat_no FROM users WHERE role='RESIDENT'",
            (e, r) => (e ? rej(e) : res(r))
          );
        });
      },
    },

    notices: {
      type: new GraphQLList(NoticeType),
      resolve() {
        return new Promise((res, rej) => {
          db.query("SELECT * FROM notices ORDER BY id DESC", (e, r) =>
            e ? rej(e) : res(r)
          );
        });
      },
    },
  },
});

/* ================= MUTATIONS ================= */

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    /* ---------- AUTH ---------- */
    register: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        role: { type: GraphQLString },
        flat_no: { type: GraphQLString },
      },
      resolve(_, a) {
        return new Promise((res, rej) => {
          db.query(
            "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?,?)",
            [a.name, a.email, a.password, a.role,a.flat_no],
            (e, r) => (e ? rej(e) : res({ id: r.insertId, ...a }))
          );
        });
      },
    },

    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(_, a) {
        return new Promise((res, rej) => {
          db.query(
            "SELECT * FROM users WHERE email=? AND password=?",
            [a.email, a.password],
            (e, r) => (e || r.length === 0 ? rej("Invalid Login") : res(r[0]))
          );
        });
      },
    },

    /* ---------- COMPLAINT ---------- */
    addComplaint: {
      type: ComplaintType,
      args: {
        flat: { type: GraphQLString },
        category: { type: GraphQLString },
        issue: { type: GraphQLString },
      },
      resolve(_, a) {
        return new Promise((res, rej) => {
          db.query(
            "INSERT INTO complaints (flat,category,issue,status) VALUES (?,?,?,?)",
            [a.flat, a.category, a.issue, "REGISTERED"],
            (e, r) =>
              e
                ? rej(e)
                : res({
                    id: r.insertId,
                    ...a,
                    status: "REGISTERED",
                  })
          );
        });
      },
    },

    assignWorker: {
      type: ComplaintType,
      args: {
        id: { type: GraphQLInt },
        worker: { type: GraphQLString },
      },
      resolve(_, a) {
        return new Promise((res, rej) => {
          db.query(
            "UPDATE complaints SET worker=?, status='ASSIGNED' WHERE id=?",
            [a.worker, a.id],
            (e) => (e ? rej(e) : res({ id: a.id }))
          );
        });
      },
    },

    updateWorkStatus: {
      type: ComplaintType,
      args: {
        id: { type: GraphQLInt },
        status: { type: GraphQLString },
        worker_name: { type: GraphQLString },
        worker_phone: { type: GraphQLString },
        visit_date: { type: GraphQLString },
      },
      resolve(_, a) {
        return new Promise((res, rej) => {
          db.query(
            "UPDATE complaints SET status=?, worker_name=?, worker_phone=?, visit_date=? WHERE id=?",
            [a.status, a.worker_name, a.worker_phone, a.visit_date, a.id],
            (e) => (e ? rej(e) : res({ id: a.id }))
          );
        });
      },
    },
        takeComplaint: {
      type: GraphQLString,
      args: {
        complaint_id: { type: GraphQLInt },
        worker_name: { type: GraphQLString },
        worker_phone: { type: GraphQLString },
        visit_date: { type: GraphQLString }
      },
      resolve(_, args) {
        return new Promise((resolve, reject) => {
          db.query(
            `UPDATE complaints SET
              worker_name=?,
              worker_phone=?,
              visit_date=?,
              status='IN_PROGRESS'
             WHERE id=?`,
            [
              args.worker_name,
              args.worker_phone,
              args.visit_date,
              args.complaint_id
            ],
            (err) => {
              if (err) reject(err);
              resolve("Complaint taken by worker");
            }
          );
        });
      },
    },

    /* ---------- NOTICE ---------- */
    addNotice: {
      type: NoticeType,
      args: {
        title: { type: GraphQLString },
        message: { type: GraphQLString },
      },
      resolve(_, a) {
        return new Promise((res, rej) => {
          db.query(
            "INSERT INTO notices (title,message) VALUES (?,?)",
            [a.title, a.message],
            (e, r) => (e ? rej(e) : res({ id: r.insertId, ...a }))
          );
        });
      },
    },
    // ✅ FIXED: deleteNotice INSIDE fields
    deleteNotice: {
      type: GraphQLBoolean,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(_, a) {
        return new Promise((res, rej) => {
          db.query("DELETE FROM notices WHERE id = ?", [a.id], (e, r) => {
            if (e) rej(e);
            else res(r.affectedRows > 0);
          });
        });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
