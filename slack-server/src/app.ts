import { getUsers } from "./services/slack-api/actions/getUsers"
import { sendMessageFromBot } from "./services/slack-api/actions/sendMessageFromBot"
import { addTimeLineEvent, ITimelineEvent } from "./services/slack-api/wrap/addTimeLineEvent"

console.log("fgdf")
//getUsers()
const firstTimeLine:ITimelineEvent={
    incidentId: '649cbeda942a5d4d8bcf3044',
    channelId:'U05JB6PJYUQ',
    userId: 'ffc',
    description: "Hello how are you",
    priority: 'p0',
    type: 'secureity',
    createdDate: new Date(),
    updatedDate:new Date()
}
//addTimeLineEvent(firstTimeLine)