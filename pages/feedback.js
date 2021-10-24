import {useState, useRef} from "react";

const Feedback = (props) => {
    const [feedbacks, setFeedbacks] = useState(props.feedbacks);
    const [selectedFeedback, setSelectedFeedback] = useState(null);

    const emailRef = useRef('');
    const detailRef = useRef('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const detail = detailRef.current.value;

        const resp = await fetch('/api/feedback', {
            method: 'POST',
            body: JSON.stringify({email, detail}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await resp.json();
        setFeedbacks(prevData => ([...prevData, data.feedback]));
    };

    const handleLoadFeedbackDetails = async (feedbackId) => {
        const resp = await fetch(`http://localhost:3000/api/feedback/${feedbackId}`, {
            method: 'GET',
        });
        const data = await resp.json();
        setSelectedFeedback(data.feedback);
    }


    return (
        <div className='feedback-page'>
            <h1>Feedback Page</h1>
            {selectedFeedback && <div>
                <p>{selectedFeedback.email}</p>
                <p>{selectedFeedback.detail}</p>
            </div>}
            <div className='all-feedbacks'>
                {feedbacks.map(feedback => <div style={{display: 'flex', alignItems: 'center'}}><p>{feedback.email}</p>
                    <button onClick={() => handleLoadFeedbackDetails(feedback.id)}>Details</button>
                </div>)}
            </div>


            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label><br/>
                    <input ref={emailRef} type="email" id="email" name="email"/>
                </div>

                <div>
                    <label htmlFor="detail">Detail</label><br/>
                    <input ref={detailRef} type="text" id="detail" name="detail"/>
                </div>


                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export async function getStaticProps() {
    const resp = await fetch('http://localhost:3000/api/feedback', {
        method: 'GET',
    });
    const data = await resp.json();

    return {
        props: {
            feedbacks: data.feedbacks
        }
    }
}

export default Feedback;