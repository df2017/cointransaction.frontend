import React from "react";

function AmountInput({register}) {
  return (
    <>
      <input
        className="input is-normal"
        type="number" 
        step="0.01"
        placeholder="Enter an amount"
        name="amount"
        {...register}
      />
    </>
  );
}

export default AmountInput;