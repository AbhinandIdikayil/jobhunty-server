import express, { Application } from 'express'
import { config } from 'dotenv'
import { MessageService } from './infrastructure/rabbitmq/messageService';
import { RabbitMQ } from './infrastructure/rabbitmq';
import cors from 'cors'
config()

const PORT = Number(process.env.PORT)

class Server {
    private app: Application
    private messageService: MessageService

    constructor(messageService: MessageService) {
        this.app = express()
        this.messageService = messageService
    }

    async start(port: number): Promise<void> {
        try {
            await this.messageService.start()

            this.app.use(cors())
            this.app.use(express.json())

            this.app.listen(port, () => {
                console.log(`
    &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
    & NOTIFICATION SERVICE RUNNING ON PORT ${port} & 
    &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&  
        `)
            })
        } catch (error) {
            console.log(error)
        }
    }

    async stop(): Promise<void> {
        await this.messageService.close()
    }
}

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost:5672'
const EXCHANGE = 'direct_logs'
const QUEUENAME = 'OTPEMAIL'
//! WHEN CHANGING THE ROUTING KEY CHECK THE HANDLEMESSAGE FUNCTION ON MESSSAGESERVICE
const ROUTINGKEYS = ['email-otp-user', 'email-otp-cmpny']
console.log(RABBITMQ_URL)

async function main() {
    const rabbitMQ = new RabbitMQ(RABBITMQ_URL, EXCHANGE, QUEUENAME, ROUTINGKEYS)
    const messageService = new MessageService(rabbitMQ)
    const server = new Server(messageService)

    await server.start(PORT);

    process.on('SIGINT', shutdown)
    process.on('SIGTERM', shutdown)

    async function shutdown() {
        console.log('...Shutting down')
        await server.stop()
        process.exit(0)
    }
}

main().catch((error) => {  
    console.log(error)
    process.exit(1)
})

