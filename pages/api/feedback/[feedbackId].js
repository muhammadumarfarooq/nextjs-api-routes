import path from 'path';
import fs from 'fs';

function handler(req, res) {
    if (req.method === 'GET') {
        const {feedbackId} = req.query;
        const filePath = path.join(process.cwd(), 'data', 'feedback.json');
        const fileData = fs.readFileSync(filePath);
        const feedbacks = JSON.parse(fileData);

        const selectedFeedback = feedbacks.find(feedback => feedback.id === feedbackId);

        res.status(201).json({feedback: selectedFeedback});
    }
}

export default handler;