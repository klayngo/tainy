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
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexviews = void 0;
const mysqli_1 = require("../db/mysqli");
class Indexviews {
    userVista(req, res) {
        res.render("viwsUser/index");
    }
    userPerfil(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let session = req.session;
            if (session.idUser) {
                let idUser = session.idUser;
                const conn = yield (0, mysqli_1.connect)();
                conn.query("SELECT * FROM usuario WHERE id = ?", [idUser], (error, rows) => {
                    if (error) {
                        return res.send("ERROSDB");
                    }
                    if (rows.length > 0) {
                        return res.render("viwsUser/perfil", { user: rows[0] });
                    }
                });
            }
            else {
                res.redirect("/login");
            }
        });
    }
    ;
    userPublicacion(req, res) {
        res.send("<h1>✔<h1>");
    }
    UseLogin(req, res) {
        res.render("viwsUser/login");
    }
    recoveryUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield (0, mysqli_1.connect)();
                conn.query("SELECT * FROM usuario WHERE correo = ?", [req.params.email], (error, rows) => {
                    if (error) {
                        return res.json({ message: "ERROR_DATAMYSQLI" });
                    }
                    if (rows.length > 0) {
                        return res.json({ message: "DATA_SUCCESSFUL" });
                    }
                    return res.json({ message: "ERROR_DATAMYSQLI" });
                });
            }
            catch (error) {
                return res.sendStatus(301).json({ message: error });
            }
        });
    }
    recoveryPasswordUser(req, res) {
        res.render("viwsUser/authentication/recoverypassword");
    }
    authenticationRecovery(req, res) {
        res.render("viwsUser/authentication/autenthication");
    }
    viewsDasboard(req, res) {
        res.render("viwsUser/dasboard");
    }
    perfilUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render("viwsUser/perfil");
        });
    }
    perfilUsuarioData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let session = req.session;
                if (session === null || session === void 0 ? void 0 : session.idUser) {
                    let idUser = session.idUser;
                    const conn = yield (0, mysqli_1.connect)();
                    conn.query("SELECT * FROM usuario WHERE id = ?", [idUser], (error, rows) => {
                        if (error) {
                            return res.json({ message: "ERROR_DATAMYSQLI" });
                        }
                        if (rows.length > 0) {
                            return res.json({ data: rows });
                        }
                        return res.json({ message: "ERROR_DATAMYSQLI" });
                    });
                }
            }
            catch (error) {
                return res.sendStatus(301).json({ message: error });
            }
        });
    }
    publicacionesUsuario(req, res) {
        res.render("viwsUser/publicaciones");
    }
    publicacionesUsuarioDestacadas(req, res) {
        res.render("viwsUser/publicDestacadas");
    }
}
exports.indexviews = new Indexviews();
