// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract StakingRewards {
    IERC20 public immutable FND;

    address public owner;
    uint256 public constant REWARDRATE = 240;
    uint256 public constant PERIOD = 365 days;

    struct User {
        uint256 depositTime;
        uint256 depositAmount;
        uint256 reward;
    }

    mapping(address => User) internal _users;
    address[] users;

    // Total staked
    uint256 public totalStaked;

    constructor(address _FND) {
        owner = msg.sender;
        FND = IERC20(_FND);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "not authorized");
        _;
    }

    function withdrawAll() external onlyOwner {
        FND.transfer(owner, FND.balanceOf(address(this)));
    }

    function stake(uint256 _amount) external {
        require(_amount > 0, "amount = 0");
        FND.transferFrom(msg.sender, address(this), _amount);
        User storage user = _users[msg.sender];
        if (user.depositAmount > 0) {
            user.reward +=
                (user.depositAmount *
                    REWARDRATE *
                    (block.timestamp - user.depositTime)) /
                PERIOD;
        }
        user.depositTime = block.timestamp;
        user.depositAmount += _amount;
        if (user.depositAmount > 0) users.push(msg.sender);
        totalStaked += _amount;
    }

    function withdraw(uint256 _amount) external onlyOwner {
        require(_amount > 0, "amount = 0");
        totalStaked -= _amount;
        FND.transfer(owner, _amount);
    }

    function getReward() external view returns (uint256) {
        User storage user = _users[msg.sender];
        uint256 reward = user.reward +
            (user.depositAmount *
                REWARDRATE *
                (block.timestamp - user.depositTime)) /
            PERIOD;
        return reward;
    }

    function divideReward() external onlyOwner {
        for (uint256 i = 0; i < users.length; i++) {
            User storage user = _users[users[i]];
            uint256 reward = user.reward +
                (user.depositAmount *
                    REWARDRATE *
                    (block.timestamp - user.depositTime)) /
                PERIOD;
            FND.transfer(users[i], user.depositAmount + reward);
        }
    }
}

interface IERC20 {
    function totalStaked() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address recipient, uint256 amount)
        external
        returns (bool);

    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}
