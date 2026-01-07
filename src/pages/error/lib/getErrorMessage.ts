import { errorsConfig } from "../config/errorsConfig";

function getErrorMessage(status: number) {
    return errorsConfig[status] || errorsConfig[Math.floor(status / 100) * 100];
}

export { getErrorMessage };
