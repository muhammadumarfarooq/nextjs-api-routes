import {useRef} from "react";

const Feedback = () => {
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
        const data = resp.json();

        console.log(data);
    };

    return (
        <div className='feedback-page'>
            <h1>Feedback Page</h1>
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

export default Feedback;