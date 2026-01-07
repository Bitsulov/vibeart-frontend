import type { CommunityType } from "entities/community";
import classes from "./communitiesList.module.scss";
import { CommunitiesItem } from "features/communitiesItem";

interface CommunitiesListPropsType {
    communitiesList: CommunityType[];
}

const CommunitiesList = ({ communitiesList, ...props }: CommunitiesListPropsType) => {
	return (
        <div className={classes.communitiesList} {...props}>
            {communitiesList.map(community => (
                <CommunitiesItem
					key={`community${community.id}`}
					id={community.id}
                    srcImg={community.srcImg}
                    title={community.title}
                    description={community.description}
                    subscribers={community.subscribers}
                />
            ))}
        </div>
    );
};

export { CommunitiesList };
