const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); // Handle CORS if needed
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Example user database
const users = {
    'admin': bcrypt.hashSync('admin_password', 10),
    'user1': bcrypt.hashSync('password1', 10),
    'user2': bcrypt.hashSync('password2', 10)
};

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (users[username] && bcrypt.compareSync(password, users[username])) {
        if (username === 'admin') {
            res.json({ message: "Login successful. Welcome Admin!" });
        } else {
            res.status(403).json({ message: "Access denied. Admins only." });
        }
    } else {
        res.status(401).json({ message: "Invalid username or password." });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
