import { useState } from 'react';
import CreditCard from "./components/CreditCard";

const App = () => {


    /* ---------------
        SETTING DATE
    ----------------- */
    const currentMonth = new Date().getMonth() + 1;
    const formattingMonth = String(currentMonth).length <= 1 ? "0" : null;
    const formattedCurrentMonth = formattingMonth + currentMonth;

    const currentYear = new Date().getFullYear();


    /* ------------
        USE STATE
    -------------- */
    const [formData, setFormData] = useState({
        name: '',
        number: '',
        date: currentYear + '-' + formattedCurrentMonth,
        cvv: ''
    });

    const [side, setSide] = useState("front");

    const [message, setMessage] = useState('Please enter your credit information.')


    /* ------------
        FUNCTIONS
    ------------- */
    const handleChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        console.log(name, value);

        /* ----------------------------------------------
            REGEX FOR NOT ALLOWING ANYTHING BUT NUMBERS
        ------------------------------------------------ */
        if (name === "cvv" || name === "number") {
            value = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        }
        // do this before setFormData

        setFormData({
            ...formData,
            [name]: value,
        });

        /* ----------------
            FLIPPING CARD
        ------------------ */
        if (name === "cvv") {
            setSide("back")
            return
        }

        setSide("front")
        // interact with any other input, sets side to "front"
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        setMessage('Thank you for your support!')
    };


    /* ------
        JSX
    -------- */
    return (
        <div className="form-container">

            <CreditCard formData={formData} side={side} />

            <form onSubmit={handleSubmit}>

                <div className="input-container">
                    <label>Name on card
                        <input
                            placeholder="Full Name..."
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required />
                    </label>
                </div>

                <div className="input-container">
                    <label>Card number
                        <input
                            placeholder="0000 0000 0000 0000"
                            name="number"
                            value={formData.number}
                            onChange={handleChange}
                            minLength={16}
                            maxLength={16}
                            required />
                    </label>
                </div>

                <div className="supporting-inputs-container">
                    <label>Expiration Date
                        <input
                            type="month"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required />
                    </label>

                    <label> CVV
                        <input
                            id="cvv"
                            placeholder="123"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            minLength={3}
                            maxLength={3}
                            required />
                    </label>
                </div>

                <div className="input-container">
                    <label>
                        <input type="submit" />
                    </label>
                </div>

                <p className="info-message">{message}</p>

            </form>
        </div>
    );
};

export default App;
