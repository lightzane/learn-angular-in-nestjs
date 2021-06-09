"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = new common_1.Logger('NestApplication', true);
    const port = process.env.PORT || 3000;
    app.setGlobalPrefix('api');
    app.useStaticAssets('public');
    await app.listen(port);
    logger.warn(`Application running on http://localhost:${port}`);
}
bootstrap();