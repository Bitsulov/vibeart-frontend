import type { NotificationType } from "./types";
import logoBlack from "shared/icons/logo-black.png";

export function createNotification({
    id = Date.now(),
    authorName = "VibeArt",
    authorId = null,
    noticeType = "system",
    date = new Date().toISOString(),
    srcImg = logoBlack,
    postName = null,
    postId = null
}: NotificationType) {
    return { id, authorName, authorId, noticeType, date, srcImg, postName, postId };
}
