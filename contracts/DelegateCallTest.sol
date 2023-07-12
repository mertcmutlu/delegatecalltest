pragma solidity 0.8.18;

import "hardhat/console.sol";

contract DelegateCallTest {
    address public stakeContract;

    constructor(address _stakeContract) {
        stakeContract = _stakeContract;
    }

    function callStakeContract() public returns (bool) {
        (bool success, bytes memory returndata) = stakeContract.delegatecall(
            abi.encodeWithSignature("withdraw()")
        );
        console.log(success);
        //console.log(returndata);
    }
}
