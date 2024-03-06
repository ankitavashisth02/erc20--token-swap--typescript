// SPDX-License-Identifier: UNLICENSED
pragma solidity <0.9.0;

import "./IERC20.sol";

contract ERC20_A is IERC20 {

    uint public override totalSupply; // Should be initialised, to mitigate uninitialisation error
    mapping(address => uint) public override balanceOf;
    mapping(address => mapping(address => uint)) public override allowance;
    string public name = "Ankita"; //Constants should be written in uppercase with underscores separating words (TOKEN_NAME)
    string public symbol = "ANK"; //Constants should be written in uppercase with underscores separating words
    uint8 public decimals = 2;

// Add comments for better readability
// Use NATSPEC format for documentation https://docs.soliditylang.org/en/latest/natspec-format.html
    constructor() {
        mint(100000*(10**(decimals)));
    }

    function transfer(address recipient, uint amount) external override returns (bool) {
        balanceOf[msg.sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function approve(address spender, uint amount) public override returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external override returns (bool) {
        allowance[sender][msg.sender] -= amount;
        balanceOf[sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }

    function mint(uint amount) public {
        balanceOf[msg.sender] += amount;
        totalSupply += amount;
        emit Transfer(address(0), msg.sender, amount);
    }

    function burn(uint amount) external {
        balanceOf[msg.sender] -= amount;
        totalSupply -= amount;
        emit Transfer(msg.sender, address(0), amount);
    }
    
}
