import path from 'path';
import fs from 'fs';

function handler(req, res) {

    if (req.method === 'GET') {

        // Write the new feedback to a new file
        const filePath = path.join(process.cwd(), 'data', 'feedback.json');
        const fileData = fs.readFileSync(filePath);
        const feedbacks = JSON.parse(fileData);
        res.status(201).json({feedbacks});
    }

    if (req.method === 'POST') {
        const {email, detail} = req.body;
        const newFeedback = {
            id: new Date().toISOString(),
            email,
            detail
        }
        // Write the new feedback to a new file
        const filePath = path.join(process.cwd(), 'data', 'feedback.json');
        const fileData = fs.readFileSync(filePath);
        const data = JSON.parse(fileData);
        data.push(newFeedback);
        fs.writeFileSync(filePath, JSON.stringify(data));
        res.status(201).json({message: 'success', feedback: newFeedback})
    }


}

export default handler;