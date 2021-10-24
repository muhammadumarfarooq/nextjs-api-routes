import {useRef} from "react";

const Feedback = () => {
    const emailRef = useRef('');
    const detailRef = useRef('');


    const handleSubmit = (e) => {
        e.preventDefault();
        // Will send request to backend here...

        const email = emailRef.current.value;
        const detail = detailRef.current.value;

        console.log({email, detail});
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