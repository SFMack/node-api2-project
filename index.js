const App = require("./server.js");

const PORT = 5000;

App.listen(PORT, () => {
  console.log(`\n*** Server running on port ${PORT}\n`);
});
