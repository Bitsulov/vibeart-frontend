import c from "./communitiesList.module.scss";
import type {CommunityType} from "entities/community";
import {CommunityItem} from "features/communityItem";
import React from "react";

interface CommunitiesListProps extends React.ComponentPropsWithoutRef<"div"> {
    communitiesList: CommunityType[];
    title: string;
    className?: string;
    emptyTitle: string;
}

/**
 * Список сообществ с заголовком.
 * @param communitiesList - массив сообществ для отображения.
 * @param title - заголовок секции.
 * @param className - дополнительный CSS-класс.
 * @param emptyTitle - Текст если список сообществ пустой.
 * @param props - остальные пропсы `div`.
 */
export const CommunitiesList = ({
    communitiesList,
    title,
    className = "",
    emptyTitle = "",
    ...props
}: CommunitiesListProps) => {
    const isExistsCommunities = communitiesList && communitiesList.length > 0;

	return (
		<div className={`${c.communities_list} ${className}`} {...props}>
            <h1 className={c.title}>{title}</h1>
            <div className={c.list}>
                {isExistsCommunities ?
                    communitiesList.map(community => (
                        <CommunityItem
                            key={community.ULID}
                            imageUrl={community.imageUrl}
                            ULID={community.ULID}
                            title={community.title}
                            description={community.description}
                            subscribersCount={community.subscribers}
                            isSubscribed={community.isSubscribed}
                        />
                    ))
                :
                    <h2 className={c.empty}>{emptyTitle}</h2>
                }
            </div>
		</div>
	)
}
