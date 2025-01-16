import { Hono } from "hono";
import { welcomeModule } from "modules/welcome/welcome.module";
import { notFoundHandler } from "./notFound.handler";
import { errHandler } from "./err.handler";
import { startRegisterModule } from "modules/auth/start-register/startRegister.module";
import { endRegisterModule } from "modules/auth/end-register/endRegister.module";
import { loginModule } from "modules/auth/login/login.module";
import { refreshLoginModule } from "modules/auth/refresh-login/refreshLogin.module";
import { getCategoriesModule } from "modules/categories/get-categories/getCategories.module";
import { getCardsModule } from "modules/cards/get-cards/getCards.module";
import { addCardModule } from "modules/cards/add-cards/addCards.module";

export const app = new Hono();

app.route("/", welcomeModule);
app.route("/start-register", startRegisterModule);
app.route("/end-register", endRegisterModule);
app.route("/login", loginModule);
app.route("/refresh-login", refreshLoginModule);
app.route("/get-categories", getCategoriesModule);
app.route("/get-cards", getCardsModule);
app.route("/add-card", addCardModule);

app.notFound(notFoundHandler);
app.onError(errHandler);
