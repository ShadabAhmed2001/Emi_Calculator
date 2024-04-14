
import React, { useEffect, useState } from 'react';
import "./App.css";

const App = () => {
  const [loan, setLoan] = useState(50000);
  const [duration, setDuration] = useState(12);
  const [interest, setInterest] = useState(10.80);

  const calculateEMI = () => {
    const monthlyInterest = interest / 12 / 100;
    const emi =
      (loan * monthlyInterest * Math.pow(1 + monthlyInterest, duration)) /
      (Math.pow(1 + monthlyInterest, duration) - 1);
    return emi;
  };

  const calculateInterestAmount = () => {
    const totalAmountPaid = calculateEMI() * duration;
    const totalInterest = totalAmountPaid - loan;
    return totalInterest;
  };

  const [emi, setEmi] = useState(calculateEMI());
  const [interestAmount, setInterestAmount] = useState(
    calculateInterestAmount()
  );

  useEffect(() => {
    setInterestAmount(calculateInterestAmount());
    setEmi(calculateEMI());
  }, [loan, duration, interest]);

  return (
    <section>
      <h1>PERSONAL LOAN EMI CALCULATOR</h1>
      <div className='main'>
        <div className="left-container">
          <div className="left-top">
            <div className="loan-amount">
              <h5>Loan Amount</h5>
              {/* <h4>Rs. {loan}</h4> */}
              <div className='userLoanInput'>₹ <input className='loanRange' type="number" min={50000} max={5000000} value={loan} onChange={({ target: { value } }) => setLoan(Number(value))} /></div>
              <input type="range" min={50000} max={5000000} step={25000} value={loan} onChange={({ target: { value } }) => setLoan(Number(value))} />
              <div className="amount-range" style={{ width: "95%" }}>
                <p>Rs. 50,000</p>
                <p>Rs. 50,00,000</p>
              </div>
            </div>
            <div className="loan-duration">
              <h5>Loan Duration</h5>
              {/* <h4>{duration} Months</h4> */}
              <div className='userDurationInput'><input className='durationRange' type="number" min={12} max={72} value={duration} onChange={({ target: { value } }) => setDuration(Number(value))} /> <span className='months'>Months</span></div>
              <input type="range" min={12} max={72} value={duration} onChange={({ target: { value } }) => setDuration(Number(value))} />
              <div className="duration-range" style={{ width: "95%" }}>
                <p>12 Months</p>
                <p>72 Months</p>
              </div>
            </div>
          </div>
          <div className="left-bottom">
            <div className="interest-rate">
              <h5>Interest Rate</h5>
              {/* <h4>{interest} %</h4> */}
              <div className='userInterestInput'>
                <input className='interestRange' type="number" min={10.80} max={16.15} value={interest} onChange={({ target: { value } }) => setInterest(Number(value))} />
                <span className='interest'>%</span>
              </div>
              <input type="range" step={0.01} min={10.80} max={16.15} value={interest} onChange={({ target: { value } }) => setInterest(Number(value))} />
              <div className="amount-range" style={{ width: "95%" }}>
                <p>10.80 %</p>
                <p>16.15 %</p>
              </div>
            </div>
          </div>
          <div className="disclaimer">
            <p>
              <span>Disclaimer*:</span>Our Personal Loan EMI calculator offers estimated monthly instalments which are indicative and tentative and are based upon the details populated by the user. Actual loan terms and eligibility are subject to bank approval. For precise loan details, consult our representatives before decisions based on these estimates.
            </p>
          </div>
        </div>
        <div className="right-container">
          <div className="top">
            <div className="emi-amount">
              <p>EMI Amount</p>
              <h4>Rs. {Math.floor(emi)} *</h4>
            </div>
            <div className="interest-payable">
              <p>Interest Payable</p>
              <h4>Rs.{Math.floor(interestAmount)} *</h4>
            </div>
          </div>
          <button>APPLY FOR PERSONAL LOAN</button>
        </div>
      </div>
    </section>
  );
};

export default App;
