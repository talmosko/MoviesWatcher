import getMembers from "../DAL/membersWS";
import {membersObject} from "../interfaces/mongoose.gen";

const getAllMembers = async () => {
    const members = await getMembers();
    return members.map((member: any) => {
        return {
            externalId: member.id,
            name: member.name,
            email: member.email,
            city: member.city
        } as unknown as membersObject
    })
}

export default getAllMembers;