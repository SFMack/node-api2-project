const App = require("./server.js");

const PORT = 4000;

App.listen(PORT, () => {
  console.log(`\n*** Server running on port ${PORT}\n`);
});
