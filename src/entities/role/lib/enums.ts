export const Roles = {
    USER: "user",
    ADMIN: "admin",
} as const;

export type Roles = typeof Roles[keyof typeof Roles]; // enum
