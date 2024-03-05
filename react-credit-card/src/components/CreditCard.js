const CreditCard = ({ formData, side }) => {

    const startState = [
        "X", 
        "X",
        "X", 
        "X",
        "X", 
        "X",
        "X", 
        "X",
        "X", 
        "X",
        "X", 
        "X",
        "X", 
        "X",
        "X", 
        "X",
    ]

    const getCardType = () => {
        if (formData.number.slice(0, 2) === "37" || formData.number.slice(0, 2) === "34") {
            return "amex";
        };

        if (formData.number.slice(0, 1) === "4") {
            return "visa";
        };

        if (formData.number.slice(0, 3) === "510" || formData.number.slice(0, 3) === 555) {
            return "mastercard";
        };

        // default
        return "visa"
    }

    console.log(getCardType())

    return (
        <div className="credit-card">

            {side === "front" &&
                <div className={`${getCardType()}-front-side card`}>
                    <div className="card-details-container">

                        <div className="detail-container">
                            <p>Cardholder: </p>
                            <h2>{formData.name}</h2>
                        </div>

                        <div className="detail-container">
                            <p>Expiration:</p>
                            <h2>{formData.date}</h2>
                        </div>

                        <div className="number-display">
                            {startState.map((item, index) => (
                                <h3 key={index}>{formData.number[index] || item }</h3>
                            ))}
                        </div>

                    </div>
                </div>
            }

            {side === "back" &&
                <div className={`${getCardType()}-back-side card`}>
                    <div id="cvv-display">
                        <p>{formData.cvv}</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default CreditCard
