import { IDependencies } from "../../application/interfaces/IDependencies"
import { createChatController } from "./createChatController"
import { getMessageController } from "./getMessageController"
import { listChatController } from "./listChatController"
import { sendMessageController } from "./sendMessageController"

export const controller = (dependencies:IDependencies) => {
    return {
        createChat:createChatController(dependencies),
        listChats:listChatController(dependencies),
        sendMessage:sendMessageController(dependencies),
        allMessages:getMessageController(dependencies)
    }
}