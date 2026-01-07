import type { NoticeType } from "../model/types";

export const noticeTypes: Record<NoticeType, string> = {
	comment: "notice.comment",
	answerComment: "notice.answerComment",
	like: "notice.like",
	subscribe: "notice.subscribe",
	system: "notice.system",
} as const;
