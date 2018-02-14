const fortune = require("fortune");
const http = require("http");
const fortuneHTTP = require("fortune-http");
const pgAdapter = require("fortune-postgres");

const adapter = [
  pgAdapter,
  { url: "postgres://postgres@postgres:5432/postgres" }
];

const recordTypes = {
  user: {
    name: String
  }
};

const store = fortune(recordTypes, { adapter });

const listener = fortuneHTTP(store, {
  serializers: [fortuneHTTP.JsonSerializer]
});

const server = http.createServer((request, response) => {
  listener(request, response).catch(error => {
    console.log(error);
  });
});

store.connect().then(() => server.listen(80));
