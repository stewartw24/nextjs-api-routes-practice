import { MongoClient } from 'mongodb';

async function handler(req, res) {
    const eventId = req.query.eventId; //the name given to the file between square brackets
    
    const client = await MongoClient.connect('mongodb+srv://stewartw24:10736504Abc@cluster0.t6lkr.mongodb.net/events?retryWrites=true&w=majority');
    
    if(req.method === 'POST') {
        //add server side validation
        const {email, name, text} = req.body;

        if(
            !email.includes('@') || 
            !name || 
            name.trim() === '' || 
            !text || 
            text.trim() === ''
            ){
                res.status(422).json({ message: 'Invalid input.'})
                return;
            }

            console.log(email, name, text);
            const newComment = {
                email, 
                name, 
                text,
                eventId
            };

            const db = client.db();

            const result = await db.collection('comments').insertOne(newComment);

            console.log(result);

            newComment.id = result.insertedId;

            res.status(201).json({message: 'Added comment', comment: newComment});
    }

    if(req.method === 'GET'){
        const db = client.db();

        const document = await db
            .collection('comments')
            .find()
            .sort({ _id:-1 })
            .toArray();

        res.status(200).json( {comments: document});
    }

    client.close();
}

export default handler;