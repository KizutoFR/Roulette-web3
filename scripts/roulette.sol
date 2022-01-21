// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Test {

    modifier minEntries(uint _nbrEntries) {
        require(_nbrEntries >= 2);
        _;
    }

    function roll(uint _modulus) private view returns (uint){
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp))) % _modulus;
    }

    function getBalance() public view returns(uint){
        return address(this).balance;
    }

    address[] private entries;

    function enter() public payable{
        require(msg.value == .01 ether);
        entries.push(msg.sender);
    }

    function pickWinner() public minEntries(entries.length) returns (address) {
        address payable winner = payable(entries[roll(entries.length)]);
        winner.transfer(getBalance());
        delete entries;
        return winner;
    }

    function getEntries() public view returns (address[] memory){
        return entries;
    }
}