import { useQueryParam } from "shared/hooks/useQueryParam";

export const useGetErrorCode = () => {
    return useQueryParam("code") ?? 404;
};
