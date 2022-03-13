import { ValidationPipeOptions } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export const getNetworkConfig = (config: ConfigService): networkConfig => {
    return {
        port: +config.get<number>('APP_PORT') || 3000,
        validationPipeOptions: {
            whitelist: config.get<string>('VALIDATION_PIPE_WHITELIST') === "true", //everything not anottated in CTO classes will be removed whilst validating.
            disableErrorMessages: config.get<string>('VALIDATION_PIPE_DISABLE_ERROR_MESSAGES') === "true"
        }
    }
}

export class networkConfig {
    port: number;
    validationPipeOptions: ValidationPipeOptions
}