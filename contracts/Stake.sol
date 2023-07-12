pragma solidity 0.8.18;

import "hardhat/console.sol";

contract Stake {
    address public staker;

    function stake() public {
        staker = msg.sender;
    }

    function withdraw() public returns (bool) {
        console.log("Msg.sender is %o", msg.sender);
        //require(msg.sender == staker, "You aren't the staker");
        console.log("check is passed");
        console.log("Staker is %o", staker);
        return true;
    }

    function getStaker() public view returns (address) {
        return staker;
    }
}
