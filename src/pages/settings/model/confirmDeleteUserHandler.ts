import type { AxiosResponse } from "axios";

type DeleteUserFn = (UUID: string) => Promise<AxiosResponse<string>>;

export async function confirmDeleteUserHandler(UUID: string, deleteUserFn: DeleteUserFn) {
    await deleteUserFn(UUID);
}
