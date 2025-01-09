import HomeFAQ from "@/models/homePage/HomeFAQ";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        // Fetch FAQ data
        try {
            const faq = await HomeFAQ.findOne();
            if (!faq) {
                return res.status(404).json({ success: false, message: 'FAQ not found' });
            }
            res.status(200).json({ success: true, data: faq });
        } catch (error) {
            console.error("Error during GET operation:", error);
            res.status(500).json({ success: false, message: 'Failed to fetch FAQ data', error: error.message });
        }
    } else if (req.method === 'PUT') {
        // Update FAQ data
        try {
            const { heading, questions,bottomtext } = req.body;

            // Validate input
            if (!heading || !bottomtext || !Array.isArray(questions) || questions.length === 0) {
                return res.status(400).json({ success: false, message: 'Invalid data format. Ensure heading and an array of questions are provided.' });
            }

            // Validate each question object
            for (let i = 0; i < questions.length; i++) {
                const { question, answer } = questions[i];
                if (!question || !answer) {
                    return res.status(400).json({ success: false, message: `Question ${i + 1} is missing required fields` });
                }
            }

            // Find existing FAQ data
            let faq = await HomeFAQ.findOne();
            if (!faq) {
                // Create new FAQ entry if none exists
                faq = await HomeFAQ.create({ heading, questions,bottomtext });
                return res.status(201).json({ success: true, message: 'FAQ created successfully', data: faq });
            }

            // Update existing FAQ data
            faq.heading = heading;
            faq.questions = questions;
            faq.bottomtext = bottomtext;
            await faq.save();

            res.status(200).json({ success: true, message: 'FAQ updated successfully', data: faq });

        } catch (error) {
            console.error("Error during PUT operation:", error);
            res.status(500).json({ success: false, message: 'Failed to update FAQ data', error: error.message });
        }
    } else {
        // Method not allowed
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
    }
}




// put method api check
// {
//     "heading": "FAQ",
//     "questions": [
//       {
//         "id": 1,
//         "question": "How do I reset my asdfasdf?",
//         "answer": "You can reset your password by clicking on the 'Forgot Password' link on the login page."
//       },
//       {
//         "id": 2,
//         "question": "What payment methods do you accept?",
//         "answer": "We accept credit card, PayPal, and bank transfers."
//       }
//     ]
//   }
  