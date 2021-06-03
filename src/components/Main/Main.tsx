import React, { useState } from "react";
import "./Main.css";

interface AccountDetailsType {
  name: string;
  bankName: string;
  accountNumber: string;
}

const Main: React.FC = () => {
  const [showAddAmount, setShowAddAmount] = useState(false);
  const [showWithdrawAmount, setShowWithdrawAmount] = useState(false);
  // Add amount states
  const [addAmountFrom, setAddAmountFrom] =
    useState<AccountDetailsType[] | null>(null);
  const [addAmountValue, setAddAmountValue] = useState("");
  // Add amount states
  //withdraw amount states
  const [addAmountTo, setAddAmountTo] =
    useState<AccountDetailsType[] | null>(null);
  const [withdrawAmountValue, setWithdrawAmountValue] = useState("");
  //withdraw amount states
  const [showError, setShowError] = useState(false);
  const [showSuccessTransaction, setShowSuccessTransaction] = useState(false);

  //Sample account Data
  const [accountsInformation, setAccountsInformation] = useState([
    {
      owner: {
        name: "Eddard Stark",
        accountNumber: "123456789123",
        cardNumber: "1234567890123456",
        amount: 100000,
      },
      payee: [
        {
          name: "Jon Snow",
          bankName: "Abc Bank",
          accountNumber: "987654321098",
        },
        {
          name: "Cersei Lannister",
          bankName: "Pqr Bank",
          accountNumber: "123456789012",
        },
        {
          name: "Jaime Lannister",
          bankName: "Xyz Bank",
          accountNumber: "567890123456",
        },
      ],
    },
  ]);
  const getPayeeAccountDetails = (
    accountNumber: string
  ): AccountDetailsType[] => {
    return accountsInformation[0].payee.filter((payeeDetails): boolean => {
      return accountNumber === payeeDetails.accountNumber;
    });
  };

  const addAmountButton = (): void => {
    resetTransaction();
    setShowAddAmount(true);
  };
  const withdrawAmountButton = (): void => {
    resetTransaction();
    setShowWithdrawAmount(true);
  };
  const addAmountFromAccountChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAddAmountFrom(
      event.target.value === ""
        ? null
        : getPayeeAccountDetails(event.target.value)
    );
    setShowError(false);
  };

  const resetTransaction = (): void => {
    setShowAddAmount(false);
    setShowWithdrawAmount(false);
    setAddAmountFrom(null);
    setAddAmountValue("");
    setShowError(false);
    setAddAmountTo(null);
    setWithdrawAmountValue("");
  };
  const continueAddAmout = (): void => {
    if (addAmountFrom !== null && addAmountValue !== "") {
      let newAccountDetails = accountsInformation;
      newAccountDetails[0].owner.amount += parseInt(addAmountValue);
      setAccountsInformation(newAccountDetails);
      setShowSuccessTransaction(true);
      resetTransaction();
      setTimeout(() => {
        setShowSuccessTransaction(false);
      }, 3000);
    } else {
      setShowError(true);
    }
  };

  //withdraw amount functions start
  const addAmountToAccountChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAddAmountTo(
      event.target.value === ""
        ? null
        : getPayeeAccountDetails(event.target.value)
    );
    setShowError(false);
  };
  const continueWithdrawAmount = () => {
    if (
      addAmountTo !== null &&
      withdrawAmountValue !== "" &&
      accountsInformation[0].owner.amount - parseInt(withdrawAmountValue) >= 0
    ) {
      let newAccountDetails = accountsInformation;
      newAccountDetails[0].owner.amount -= parseInt(withdrawAmountValue);
      setAccountsInformation(newAccountDetails);
      setShowSuccessTransaction(true);
      resetTransaction();
      setTimeout(() => {
        setShowSuccessTransaction(false);
      }, 3000);
    } else {
      setShowError(true);
    }
  };
  //withdraw amount functions end

  return (
    <div className="main-wrapper">
      <div>
        <div className="info-container">
          <div className="card-container">
            <img
              className="card-image"
              src={require("./card.png").default}
              alt="Bank Card Logo"
            />
          </div>
          <div className="user-detail-container">
            <p>
              Name on Card: <strong>{accountsInformation[0].owner.name}</strong>
            </p>
            <p>
              Account Number:{" "}
              <strong>{accountsInformation[0].owner.accountNumber}</strong>
            </p>
            <p>
              Card Number:{" "}
              <strong>{accountsInformation[0].owner.cardNumber}</strong>
            </p>
            <p>
              Balance: <strong>{accountsInformation[0].owner.amount}</strong>
            </p>
            {showSuccessTransaction && (
              <p className="successful-transaction">
                Your transaction is successful.
              </p>
            )}
            <div className="links-container">
              <input
                type="button"
                id="add-amount-button"
                onClick={addAmountButton}
                value="Add Amount"
              />
              <br />
              <input
                type="button"
                id="withdraw-amount-button"
                onClick={withdrawAmountButton}
                value="Withdraw Amount"
              />
            </div>
          </div>
        </div>
      </div>
      {showAddAmount ? (
        <div>
          <h1>Add amount to your debit card</h1>
          <div>
            <div>
              <p>Select the account to transfer amount from:</p>
              <select
                id="add-amount-select-field"
                onChange={addAmountFromAccountChange}
                value={addAmountFrom ? addAmountFrom[0].accountNumber : ""}
              >
                <option value="">Please Select</option>
                {accountsInformation[0].payee.map((payeeDetails, index) => {
                  return (
                    <option key={index + 1} value={payeeDetails.accountNumber}>
                      {payeeDetails.accountNumber}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label htmlFor="add-amount-field">Enter Amount:</label>
              <br />
              <input
                type="number"
                id="add-amount-field"
                value={addAmountValue}
                placeholder="Enter Amount"
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                  setAddAmountValue(e.target.value);
                  setShowError(false);
                }}
              />
              {showError && (
                <p className="error-text">Please fill all the fields.</p>
              )}
              <div>
                <input
                  id="continue-add-amount-button"
                  type="button"
                  value="Continue"
                  onClick={continueAddAmout}
                />
                <br />
                <input
                  id="cancel-add-transaction"
                  type="button"
                  value="Cacel Transaction"
                  onClick={resetTransaction}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {showWithdrawAmount ? (
        <div>
          <h1>Withdraw amount from your debit card</h1>
          <div>
            <div>
              <p>Select the account to transfer amount into:</p>
              <select
                id="withdraw-amount-select-field"
                onChange={addAmountToAccountChange}
                value={addAmountTo ? addAmountTo[0].accountNumber : ""}
              >
                <option value="">Please Select</option>
                {accountsInformation[0].payee.map((payeeDetails, index) => {
                  return (
                    <option key={index + 1} value={payeeDetails.accountNumber}>
                      {payeeDetails.accountNumber}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label htmlFor="withdraw-amount-field">Enter Amount:</label>
              <br />
              <input
                type="number"
                id="withdraw-amount-field"
                value={withdrawAmountValue}
                placeholder="Enter Amount"
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                  setWithdrawAmountValue(e.target.value);
                  setShowError(false);
                }}
              />
            </div>
            {showError && (
              <p className="error-text">Please fill all the fields properly.</p>
            )}
            <div>
              <input
                id="continue-withdraw-amount-button"
                type="button"
                value="Continue"
                onClick={continueWithdrawAmount}
              />
              <br />
              <input
                id="cancel-withdraw-transaction"
                type="button"
                value="Cacel Transaction"
                onClick={resetTransaction}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Main;
