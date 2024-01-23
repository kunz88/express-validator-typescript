"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const uuid_1 = require("uuid");
const users_1 = require("./users");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
app.use(express_1.default.json());
app.get('/', (req, res) => {
    return res.send('<h1>Homepage</h1>');
});
const token_user = ["121333414", "123312457", "fofkdofjo"];
const token_admin = ["goginhgrori", "pippo", "dlfjndfkdj"];
const checkAuth = //controlla subito se il token è stato inserito ed eventualmente risponde 401 
 (req, res, next) => {
    const result = (0, express_validator_1.validationResult)(req);
    if (result.isEmpty()) {
        next();
    }
    else {
        return res.status(401).json(result.array());
    }
};
const isValidParams = // permette di verificare che l'oggetto di validazione sia pieno o vuoto
 (req, res, next) => {
    const result = (0, express_validator_1.validationResult)(req); //La funzione validationResult crea 
    //l'oggetto result dove verranno conservati tutti gli errori di validazione.
    // all'interno dell'oggetto result infatti avremo un array "errors" i cui valori saranno gli errori
    if (!result.isEmpty()) {
        return res.status(400).json(result.array());
    }
    return next();
};
const isAdmin = // controlla se il token è inserito corrisponda a quello di un admin
 (req, res, next) => {
    if (token_admin.includes(String(req.query.token))) {
        res.locals.role = "admin";
        return next();
    }
    else {
        return res.status(401).json({ message: "validation denied" });
    }
};
const isAdminorUser = // controlla se il token è inserito corrisponda a quello di un admin o di un user
 (req, res, next) => {
    if (token_admin.includes(String(req.query.token))) {
        res.locals.role = "admin";
        return next();
    }
    else if (token_user.includes(String(req.query.token))) {
        res.locals.role = "user";
        return next();
    }
    else {
        return res.status(401).json({ message: "validation denied" });
    }
};
// endpoint per l'homepage
app.get('/users', (req, res) => {
    const newUsers = users_1.users
        .map((user) => {
        const { firstName, lastName, age } = user;
        return { firstName, lastName, age };
    });
    return res.json(newUsers);
});
// proviamo a realizzare una search su users
// utilizzando i parametri di età o il nome e cognome
// abbiamo bisogno di utilizzare i query parameters
app.get('/users/search', (0, express_validator_1.query)('firstName').trim().escape().optional(), (0, express_validator_1.query)('interest').trim().escape().optional(), //The Validation Chain
(0, express_validator_1.query)('minAge').isInt({ min: 1 }).toInt().optional(), (0, express_validator_1.query)('maxAge').isInt({ min: 1 }).toInt().optional(), (req, res) => {
    const result = (0, express_validator_1.validationResult)(req); // estrae gli errori di validazione da una richiesta e li rende disponibili in un oggetto result
    if (!result.isEmpty()) {
        return res.status(400).json(result.array());
    }
    const { firstName, minAge, maxAge, interest } = (0, express_validator_1.matchedData)(req); //matchedData conserva tutti i dati che sono stati validati o sanificati,
    //in modo da poterli destrutturare facilmente ed utilizzare nella logica del end-point
    let usersFiltered = [...users_1.users];
    if (firstName) {
        usersFiltered = usersFiltered // assegnamo ad un array gli elementi desiderati
            .filter((user) => user
            .firstName
            .startsWith(firstName)); // filtriamo la collezione secondo il parametro firstName
    }
    if (interest) {
        usersFiltered = usersFiltered // assegnamo ad un array gli elementi desiderati
            .filter((user) => user
            .interests.some(item => item === interest)); // applico una some al filter per vedere se almeno un elemento ha 
        // filtriamo la collezione secondo il parametro interest
    }
    if (minAge) { // controllo età minima
        usersFiltered = usersFiltered
            .filter((user) => user.age >= minAge);
    }
    if (maxAge) { // controllo età massima
        usersFiltered = usersFiltered
            .filter((user) => user.age <= maxAge);
    }
    if (usersFiltered.length === 0) { // se non matchiamo nulla con le query ritorniamo un json
        return res.status(204).json({ message: "nothing matched", data: usersFiltered });
    }
    return res.json(usersFiltered);
});
// esercizio fatto in classe dal docente
app.get('/users/:id', (0, express_validator_1.param)('id').isUUID(), (req, res) => {
    const result = (0, express_validator_1.validationResult)(req); //Extracts the validation errors from a request and makes them available in a Result object.
    if (!result.isEmpty()) {
        return res.status(400).json(result.array());
    }
    const { id } = (0, express_validator_1.matchedData)(req);
    const user = users_1.users.find((user) => user.id === id);
    if (!user) {
        return res.status(404).json({ message: "user not found" });
    }
    return res.json(user);
});
// iniziamo a fare post e put
app.post('/users/', (0, express_validator_1.query)('token').notEmpty(), //mid di controllo sul token,verifica che non sia vuoto
(0, express_validator_1.body)('firstName').notEmpty().trim(), (0, express_validator_1.body)('lastName').notEmpty().trim(), (0, express_validator_1.body)('email').notEmpty().isEmail().trim().escape(), (0, express_validator_1.body)('interests').notEmpty().isArray(), (0, express_validator_1.body)('age').notEmpty().isInt().toInt(), (0, express_validator_1.body)('height').notEmpty().isInt().toInt(), isValidParams, // controlliamo se mancano elementi nella catena di validazione
isAdmin, // controlliamo se l'utente è un amministratore
(req, res) => {
    const id = String((0, uuid_1.v4)());
    const { firstName, lastName, email, interests, age, height } = (0, express_validator_1.matchedData)(req);
    const newUser = { id, firstName, lastName, email, interests, age, height };
    users_1.users.push(newUser);
    return res.json(newUser);
});
app.put('/users/', (0, express_validator_1.query)('token').notEmpty(), isValidParams, isAdmin, (req, res) => {
    const result = (0, express_validator_1.validationResult)(req); //Extracts the validation errors from a request and makes them available in a Result object.
    if (!result.isEmpty()) {
        return res.status(400).json(result.array());
    }
    const { id } = (0, express_validator_1.matchedData)(req).id;
    const user = users_1.users.find((user) => user.id === id);
    if (!user) {
        return res.status(404).json({ message: "user not found" });
    }
    return res.json(user);
});
// adesso la delete
app.delete('/users/:id', checkAuth, (0, express_validator_1.param)('id').isUUID(), isValidParams, isAdmin, (req, res) => {
    const { id } = (0, express_validator_1.matchedData)(req);
    const index = users_1.users.findIndex(item => item.id === id);
    const user = users_1.users.splice(index, 1);
    return res.json(user);
});
// end point per tutte le richieste che non sono state implementate
app.get('*', (req, res) => {
    return res.send('<h1>Error 404</h1>').status(404);
});
