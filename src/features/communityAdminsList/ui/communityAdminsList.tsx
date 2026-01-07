import type { UserType } from "entities/user";
import classes from "./communityAdminsList.module.scss";
import { Link } from "react-router-dom";

interface CommunityAdminsListPropsType {
    adminsList: UserType[];
}

const CommunityAdminsList = ({ adminsList }: CommunityAdminsListPropsType) => {
    return (
        <div className={classes.adminList}>
            {adminsList.map(admin => (
                <Link to={`/profile/${admin.id}`} key={`admin${admin.id}`} className={classes.adminItem}>
                    <img src={admin.srcImg} alt={admin.firstName} className={classes.adminImg} />
                    <p className={classes.adminName}>{`${admin.firstName} ${admin.secondName}`}</p>
                </Link>
            ))}
        </div>
    );
};

export { CommunityAdminsList };
