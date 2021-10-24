import {useState, useRef} from "react";

const Feedback = (props) => {
    const [feedbacks, setFeedbacks] = useState(props.feedbacks);

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

    return (
        <div className='feedback-page'>
            <h1>Feedback Page</h1>

            <div className='all-feedbacks'>
                {feedbacks.map(feedback => <p>{feedback.email}</p>)}
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