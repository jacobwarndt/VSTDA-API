const app = require('./app');
const PORT = 8484;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});