const express = require('express');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const notesRoutes = require('./routes/notesRoutes');
const indexRoutes = require('./routes/indexRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', indexRoutes);
app.use('/', notesRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
