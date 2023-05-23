const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const server = jsonServer.create();
const SecretJwtKey = '21323213';
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);
server.use(cors());

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
server.use(async (req, res, next) => {
	await new Promise((res) => {
		setTimeout(res, 800);
	});
	next();
});

server.get('/check-login', (req, res) => {
	try {
		const token = req.headers.authorization?.split(' ')[1].replaceAll('"', '');
		console.log('token', token);

		if (!token) {
			return res.status(403).json({ message: 'AUTH ERROR' });
		}

		const verify = jwt.verify(token, SecretJwtKey);

		if (!verify) {
			return res.status(403).json({ message: 'AUTH ERROR' });
		}

		const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
		const { users = [] } = db;

		const user = users.find((user) => user.username === verify.username);

		if (!user) {
			return res.status(403).json({ message: 'AUTH ERROR' });
		}

		const userOutputData = {
			id: user.id,
			username: user.username,
			roles: user.roles,
			features: user.features,
		};

		const response = {
			user: userOutputData,
			token: jwt.sign(userOutputData, SecretJwtKey, { expiresIn: '2h' }),
		};

		return res.status(200).json(response);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
});

// Эндпоинт для логина
server.post('/login', (req, res) => {
	try {
		const { username, password } = req.body;
		const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
		const { users = [] } = db;

		const userFromBd = users.find((user) => user.username === username && user.password === password);

		if (userFromBd) {
			const userOutputData = {
				id: userFromBd.id,
				username: userFromBd.username,
				roles: userFromBd.roles,
				features: userFromBd.features,
			};

			const response = {
				user: userOutputData,
				token: jwt.sign(userOutputData, SecretJwtKey, { expiresIn: '2h' }),
			};

			return res.json(response);
		}

		return res.status(400).json({ message: 'User not found' });
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
});

// проверяем, авторизован ли пользователь
// eslint-disable-next-line
server.use((req, res, next) => {
	try {
		if (!req.headers.authorization) {
			return res.status(403).json({ message: 'AUTH ERROR' });
		}

		const token = req.headers.authorization?.split(' ')[1];

		const isVerify = jwt.verify(token, SecretJwtKey);

		if (!isVerify) {
			return res.status(403).json({ message: 'AUTH ERROR' });
		}

		next();
	} catch (e) {
		console.log('check jwt');
		throw new Error(e);
	}
});

server.use(router);

// запуск сервера
server.listen(8443, () => {
	console.log('server is running on 8000 port');
});
