"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./configs/db"));
const moviesBLL_1 = __importDefault(require("./BLL/moviesBLL"));
const membersBLL_1 = __importDefault(require("./BLL/membersBLL"));
const movieModel_1 = __importDefault(require("./models/movieModel"));
const membersModel_1 = __importDefault(require("./models/membersModel"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //connect to DB
            yield (0, db_1.default)();
            //clear movies collection, get all the movies from the API and save them to the DB
            yield movieModel_1.default.deleteMany({});
            const movies = yield (0, moviesBLL_1.default)();
            movies.forEach((movie) => __awaiter(this, void 0, void 0, function* () {
                const mov = new movieModel_1.default(movie);
                yield mov.save();
            }));
            //clear members collection, get all the members from the API and save them to the DB
            yield membersModel_1.default.deleteMany({});
            const members = yield (0, membersBLL_1.default)();
            members.forEach((member) => __awaiter(this, void 0, void 0, function* () {
                const mem = new membersModel_1.default(member);
                yield mem.save();
            }));
            //all good? start the server
            app.listen(port, () => {
                console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
            });
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
start();
