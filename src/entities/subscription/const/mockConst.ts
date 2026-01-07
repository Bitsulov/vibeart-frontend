import { createSubscription } from "../model/createSubscription";

export const subscriptionMock = createSubscription({
    id: 1,
    subscribingUserId: 1,
    subscribedUserId: 2,
    value: false
});
