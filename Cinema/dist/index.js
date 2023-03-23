"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const moviesRoutes_1 = __importDefault(require("./routes/moviesRoutes"));
const subscriptionsRoutes_1 = __importDefault(require("./routes/subscriptionsRoutes"));
const membersRoutes_1 = __importDefault(require("./routes/membersRoutes"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const db_1 = __importDefault(require("./configs/db"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// EJS settings
app.set("view engine", "ejs");
app.set("views", "views");
// Static files
app.use(express_1.default.static(path.join(__dirname, "public")));
//Body Parser
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
//cookie parser
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
// Routes
app.use("/", authRoutes_1.default);
app.use("/users", usersRoutes_1.default);
app.use("/movies", moviesRoutes_1.default);
app.use("/subscriptions", subscriptionsRoutes_1.default);
app.use("/members", membersRoutes_1.default);
//Error handling middleware
app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).json({ message: error.message });
});
async function start() {
    try {
        await (0, db_1.default)();
        app.listen(port, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
        });
    }
    catch (err) {
        console.log(err);
    }
}
start();