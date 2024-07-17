import express, { Application } from 'express'
import { MQ_URL, PORT, ROUTING_KEY } from '../config/config';
import { MessageHandler } from '../infratructure/rabbitmq/messageHandler';
import { RABBIT_MQ } from '../infratructure/rabbitmq/instance';
import { routes } from '../infratructure/routes';
import { dependencies } from '../config/dependencies';
import cors from 'cors'


const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Allowed headers
    credentials: true // Allow cookies to be sent with requests
}))

app.use('/api/v1/user', routes(dependencies))

RABBIT_MQ.connect(MQ_URL)
    .then(() => {
        console.log('RabbitMQ connection established');
        const messageHandler = new MessageHandler();
        messageHandler.setupConsumer(ROUTING_KEY)
            .then(() => console.log('Consumer setup completed'))
            .catch((error) => console.error('Error setting up consumer:', error));


    })
    .catch(error => {
        console.error('Failed to establish RabbitMQ connection:', error);
    });
 
app.listen(PORT, () => {
    console.log(`
------------------------------------
- USER SERVICE IS RUNNING ON ${PORT}-
------------------------------------
        `)
})

process.on('SIGINT', async () => {
    try {
        await RABBIT_MQ.close();
        console.log('RabbitMQ connection closed');
        process.exit(0);
    } catch (error) {
        console.error('Error during shutdown:', error);
        process.exit(0);
    }
});



export default app;