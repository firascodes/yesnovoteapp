pragma solidity ^0.8.0;

contract YesNoVoting {
  struct Proposal {
    string question;
    uint yesVotes;
    uint noVotes;
    bool isOpen;
  }

  mapping(address => bool) public voters;
  Proposal[] public proposals;
  uint public totalVotes;

  function addProposal(string memory question) public {
    proposals.push(Proposal(question, 0, 0, true));
  }

  function voteYes(uint proposalIndex) public {
    require(proposalIndex < proposals.length);
    require(proposals[proposalIndex].isOpen);
    require(!voters[msg.sender]);

    voters[msg.sender] = true;
    proposals[proposalIndex].yesVotes += 1;
    totalVotes += 1;
  }

  function voteNo(uint proposalIndex) public {
    require(proposalIndex < proposals.length);
    require(proposals[proposalIndex].isOpen);
    require(!voters[msg.sender]);

    voters[msg.sender] = true;
    proposals[proposalIndex].noVotes += 1;
    totalVotes += 1;
  }

  function closeProposal(uint proposalIndex) public {
    require(proposalIndex < proposals.length);
    require(proposals[proposalIndex].isOpen);

    proposals[proposalIndex].isOpen = false;
  }

  function hasVoted(address _voter) public view returns (bool) {
    return voters[_voter];
  }

  function getProposalCount() public view returns (uint) {
    return proposals.length;
  }

  function getProposal(uint index) public view returns (string memory, uint, uint, bool) {
    require(index < proposals.length);
    Proposal storage proposal = proposals[index];
    return (proposal.question, proposal.yesVotes, proposal.noVotes, proposal.isOpen);
  }
}
