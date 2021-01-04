var web3 = new Web3();
var accountaddress;
var ballotContract;
var ballotByteCode;
var Ballot;
var ballotABI = [
{
"inputs": [
    {
        "internalType": "string",
        "name": "_ballotOfficialName",
        "type": "string"
    },
    {
        "internalType": "string",
        "name": "_proposal",
        "type": "string"
    }
],
"stateMutability": "nonpayable",
"type": "constructor"
},
{
"anonymous": false,
"inputs": [
    {
        "indexed": false,
        "internalType": "address",
        "name": "voter",
        "type": "address"
    }
],
"name": "voteDone",
"type": "event"
},
{
"anonymous": false,
"inputs": [
    {
        "indexed": false,
        "internalType": "uint256",
        "name": "finalResult",
        "type": "uint256"
    }
],
"name": "voteEnded",
"type": "event"
},
{
"anonymous": false,
"inputs": [],
"name": "voteStarted",
"type": "event"
},
{
"anonymous": false,
"inputs": [
    {
        "indexed": false,
        "internalType": "address",
        "name": "voter",
        "type": "address"
    }
],
"name": "voterAdded",
"type": "event"
},
{
"inputs": [
    {
        "internalType": "address",
        "name": "_voterAddress",
        "type": "address"
    },
    {
        "internalType": "string",
        "name": "_voterName",
        "type": "string"
    }
],
"name": "addVoter",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [],
"name": "ballotOfficialAddress",
"outputs": [
    {
        "internalType": "address",
        "name": "",
        "type": "address"
    }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "ballotOfficialName",
"outputs": [
    {
        "internalType": "string",
        "name": "",
        "type": "string"
    }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
    {
        "internalType": "bool",
        "name": "_choice",
        "type": "bool"
    }
],
"name": "doVote",
"outputs": [
    {
        "internalType": "bool",
        "name": "voted",
        "type": "bool"
    }
],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [],
"name": "endVote",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [],
"name": "finalResult",
"outputs": [
    {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "proposal",
"outputs": [
    {
        "internalType": "string",
        "name": "",
        "type": "string"
    }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "startVote",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [],
"name": "state",
"outputs": [
    {
        "internalType": "enum Ballot.State",
        "name": "",
        "type": "uint8"
    }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "totalVote",
"outputs": [
    {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "totalVoter",
"outputs": [
    {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
    {
        "internalType": "address",
        "name": "",
        "type": "address"
    }
],
"name": "voterRegister",
"outputs": [
    {
        "internalType": "string",
        "name": "voterName",
        "type": "string"
    },
    {
        "internalType": "bool",
        "name": "voted",
        "type": "bool"
    }
],
"stateMutability": "view",
"type": "function"
}
];
var voterTable;

$(document).ready(function () {
    $('#kaleidorefresh').hide();
    $('#panels_contract').hide();
    $('#panels_voters').hide();

    voterTable = $('#voterTable').DataTable({
        columns: [
            { title: "参与者钱包地址" },
            { title: "参与者名字" },
            { title: "参与者状态" }
        ]
    });
});

window.addEventListener('load', async () => {

    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            // Acccounts now exposed
            accountaddress = web3.givenProvider.selectedAddress;
            ballotContract = new web3.eth.Contract(ballotABI);
            ballotByteCode = '0x6080604052600080556000600155600060025560006003553480156200002457600080fd5b506040516200113338038062001133833981018060405260408110156200004a57600080fd5b8101908080516401000000008111156200006357600080fd5b828101905060208101848111156200007a57600080fd5b81518560018202830111640100000000821117156200009857600080fd5b50509291906020018051640100000000811115620000b557600080fd5b82810190506020810184811115620000cc57600080fd5b8151856001820283011164010000000082111715620000ea57600080fd5b505092919050505033600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600590805190602001906200014b92919062000192565b5080600690805190602001906200016492919062000192565b506000600960006101000a81548160ff021916908360028111156200018557fe5b0217905550505062000241565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620001d557805160ff191683800117855562000206565b8280016001018555821562000206579182015b8281111562000205578251825591602001919060010190620001e8565b5b50905062000215919062000219565b5090565b6200023e91905b808211156200023a57600081600090555060010162000220565b5090565b90565b610ee280620002516000396000f3fe6080604052600436106100b4576000357c0100000000000000000000000000000000000000000000000000000000900480634c0a6af0146100b95780636332abc9146100d0578063753ec103146100fb57806387caea781461018b57806390949747146101e0578063af15408714610237578063b92239461461030c578063c19d93fb14610323578063d9e95a981461035c578063de975d1814610444578063f1cea4c7146104d4578063f3a8286f146104ff575b600080fd5b3480156100c557600080fd5b506100ce61052a565b005b3480156100dc57600080fd5b506100e561060e565b6040518082815260200191505060405180910390f35b34801561010757600080fd5b50610110610614565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610150578082015181840152602081019050610135565b50505050905090810190601f16801561017d5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561019757600080fd5b506101c6600480360360208110156101ae57600080fd5b810190808035151590602001909291905050506106b2565b604051808215151515815260200191505060405180910390f35b3480156101ec57600080fd5b506101f561096f565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561024357600080fd5b506102866004803603602081101561025a57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610995565b604051808060200183151515158152602001828103825284818151815260200191508051906020019080838360005b838110156102d05780820151818401526020810190506102b5565b50505050905090810190601f1680156102fd5780820380516001836020036101000a031916815260200191505b50935050505060405180910390f35b34801561031857600080fd5b50610321610a5e565b005b34801561032f57600080fd5b50610338610b58565b6040518082600281111561034857fe5b60ff16815260200191505060405180910390f35b34801561036857600080fd5b506104426004803603604081101561037f57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001906401000000008111156103bc57600080fd5b8201836020820111156103ce57600080fd5b803590602001918460018302840111640100000000831117156103f057600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050610b6b565b005b34801561045057600080fd5b50610459610d19565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561049957808201518184015260208101905061047e565b50505050905090810190601f1680156104c65780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156104e057600080fd5b506104e9610db7565b6040518082815260200191505060405180910390f35b34801561050b57600080fd5b50610514610dbd565b6040518082815260200191505060405180910390f35b600080600281111561053857fe5b600960009054906101000a900460ff16600281111561055357fe5b14151561055f57600080fd5b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156105bb57600080fd5b6001600960006101000a81548160ff021916908360028111156105da57fe5b02179055507fd0dc01800a369fef30d3fced5275b8b916549867622e79efca5245c479fda4ea60405160405180910390a150565b60025481565b60068054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156106aa5780601f1061067f576101008083540402835291602001916106aa565b820191906000526020600020905b81548152906001019060200180831161068d57829003601f168201915b505050505081565b600060018060028111156106c257fe5b600960009054906101000a900460ff1660028111156106dd57fe5b1415156106e957600080fd5b60008090506000600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001805460018160011615610100020316600290049050141580156107a25750600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff16155b15610902576001600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160006101000a81548160ff02191690831515021790555061080a610dc3565b33816000019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505084816020019015159081151581525050841561086a5760008081548092919060010191905055505b8060076000600354815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160000160146101000a81548160ff02191690831515021790555090505060036000815480929190600101919050555060019150505b7f55c65cf9526efdf6c2252fe9757889dbd93e10172cad0f2edb1df619c88dbf7d33604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a18092505050919050565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6008602052806000526040600020600091509050806000018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610a415780601f10610a1657610100808354040283529160200191610a41565b820191906000526020600020905b815481529060010190602001808311610a2457829003601f168201915b5050505050908060010160009054906101000a900460ff16905082565b6001806002811115610a6c57fe5b600960009054906101000a900460ff166002811115610a8757fe5b141515610a9357600080fd5b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610aef57600080fd5b6002600960006101000a81548160ff02191690836002811115610b0e57fe5b02179055506000546001819055507fb43a401dcdbe02a8afa41feb6c651425997908d1a4b79cf505188ba1dd3fd8726001546040518082815260200191505060405180910390a150565b600960009054906101000a900460ff1681565b6000806002811115610b7957fe5b600960009054906101000a900460ff166002811115610b9457fe5b141515610ba057600080fd5b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610bfc57600080fd5b610c04610df5565b828160000181905250600081602001901515908115158152505080600860008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820151816000019080519060200190610c7a929190610e11565b5060208201518160010160006101000a81548160ff0219169083151502179055509050506002600081548092919060010191905055507fb9e5f9042e6c6eb94817f660cfa81afea9585e59d72bfc3348a2305cbd33e13384604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a150505050565b60058054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610daf5780601f10610d8457610100808354040283529160200191610daf565b820191906000526020600020905b815481529060010190602001808311610d9257829003601f168201915b505050505081565b60035481565b60015481565b6040805190810160405280600073ffffffffffffffffffffffffffffffffffffffff1681526020016000151581525090565b6040805190810160405280606081526020016000151581525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610e5257805160ff1916838001178555610e80565b82800160010185558215610e80579182015b82811115610e7f578251825591602001919060010190610e64565b5b509050610e8d9190610e91565b5090565b610eb391905b80821115610eaf576000816000905550600101610e97565b5090565b9056fea165627a7a72305820f5c9049e763e64ee845c6057f6f7a3e2ef7ea7d733c031532141a0fdb149c2a80029';

        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */ });
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});


var BallotContractAddress = "";
var MyTransactionHash;

function refreshContract(_contractAddress) {
    loadBallotContract(_contractAddress);
    var myBallot = new web3.eth.Contract(ballotABI, _contractAddress);
    var currentState = loadState(myBallot);

    if (currentState == 0) {
        $('#panels_contract').show();
        $('#panels_voters').show();
        $("#btnStart").show();
        $("#btnEnd").hide();
        $("#loader").hide();
        $("#section_addVoter").show();
    }
    else if (currentState == 1) {
        $("#loaderStartVote").hide();
        $("#btnStart").hide();
        $("#btnEnd").show();
        $("#section_addVoter").hide();
    }
    else if (currentState == 2) {
        $("#loaderStartVote").hide();
        $("#btnEnd").hide();
    }

}

function getContract() {
    web3.eth.getTransactionReceipt(MyTransactionHash)
        .then((receipt) => {
            try {
                if (receipt.contractAddress) {
                    BallotContractAddress = receipt.contractAddress;
                    loadBallotContract(BallotContractAddress);
                    console.log(BallotContractAddress);
                    $("#contractAddress").val(BallotContractAddress);
                    watchVoteStarted(); //start watching for events
                    watchVoterAdded(); //start watching for new voters
                    watchVoteDone(); //start watching for vote done
                    watchVoteEnd(); //start watching for vote end
                    $('#panels_contract').show();
                    $('#panels_voters').show();
                    $("#btnStart").show();
                    $("#btnEnd").hide();
                    $("#loader").hide();
                    $("#section_addVoter").show();
                    return;
                }
            }
            catch (e) {
                console.log("nope");
                window.setTimeout(getContract, 1000);
            }
        });
}

//-------------- Watching Section -------------------//

function watchVoteEnd() {
    Ballot.events.voteEnded({
    }, (error, event) => {
        console.log(event.returnValues.finalResult);
        loadState(Ballot);
        loadFinalResult(Ballot);
        $("#loaderStartVote").hide();
        $("#btnEnd").hide();
    })
        .on('data', (event) => {

        })
        .on('changed', (event) => {
            // remove event from local database
        })
        .on('error', console.error)
}

function watchVoteDone() {
    Ballot.events.voteDone({
    }, (error, event) => {
        console.log(event.returnValues.voter);
        updateNewVote(event.returnValues.voter);
    })
        .on('data', (event) => {

        })
        .on('changed', (event) => {
            // remove event from local database
        })
        .on('error', console.error)
}

var lastVoteAdded = "";
function watchVoterAdded() {
    Ballot.events.voterAdded({
    }, (error, event) => {
        console.log(event.returnValues.voter);
        loadTotalVoter(Ballot);

        //strange hack: this event fires twice for some reasons
        //so I save the last voter address and suppress it if
        //it is the same as the previous one :P
        if (lastVoteAdded != event.returnValues.voter) {
            loadVoter(Ballot, event.returnValues.voter);
            lastVoteAdded = event.returnValues.voter;
        }

        $("#loaderNewVoter").hide();
    })
        .on('data', (event) => {

        })
        .on('changed', (event) => {
            // remove event from local database
        })
        .on('error', console.error)
}

function watchVoteStarted() {
    Ballot.events.voteStarted({
    }, (error, event) => { })
        .on('data', (event) => {
            console.log(event.event); // same results as the optional callback above
            $("#loaderStartVote").hide();
            $("#btnStart").hide();
            $("#btnEnd").show();
            $("#section_addVoter").hide();
            loadState(Ballot);
        })
        .on('changed', (event) => {
            // remove event from local database
        })
        .on('error', console.error)
}

//-------------- Loading Section -------------------//

async function loadBallotContract(myBallotContractAddress) {
    Ballot = new web3.eth.Contract(ballotABI, myBallotContractAddress);
    Ballot.methods.ballotOfficialName().call().then((result) => {
        $("#lbl_officialname").html("<b>投票发起者: </b>" + result);
    });
    Ballot.methods.proposal().call().then((result) => {
        $("#lbl_proposal").html("<b>投票提案的内容: </b>" + result);
    });

    loadFinalResult(Ballot);
    loadTotalVoter(Ballot);
    loadTotalVotes(Ballot);

    loadState(Ballot);

    $("#lbl_address").html("<b>该投票提案的合约地址: </b>" + myBallotContractAddress);
};

async function loadFinalResult(myBallot) {
    myBallot.methods.finalResult().call().then((result) => {
        $("#lbl_result").html("<b>投票最终赞同的票数: </b>" + result);
    });
}

async function loadTotalVoter(myBallot) {
    console.log("hello  guoin0001");
    myBallot.methods.totalVoter().call().then((result) => {
        $("#lbl_voters_num").html("<b>参与投票的总人数: </b>" + result);
        console.log("hello  guoin0001");
    });
}

async function loadTotalVotes(myBallot) {
    myBallot.methods.totalVote().call().then((result) => {
        $("#lbl_votes_num").html("<b>投票的总次数: </b>" + result);
    });
}

async function loadState(myBallot) {
    myBallot.methods.state().call().then((result) => {
        if (result == 0) {
            $("#lbl_state").addClass("label label-primary");
            $("#lbl_state").html("Created");
        }
        else if (result == 1) {
            $("#lbl_state").addClass("label label-success");
            $("#lbl_state").html("投票中");
        }
        else if (result == 2) {
            $("#lbl_state").addClass("label label-danger");
            $("#lbl_state").html("投票已结束");
        }
        return result;
    });
}

async function loadVoter(myBallot, _myVoterAddress) {


    myBallot.methods.voterRegister(_myVoterAddress).call().then((result) => {
        console.log(result);
        console.log("hello guobin 000002");

        var voteStatus;
        if (result.voted) {
            voteStatus = "<span class='label label-primary'>已完成投票</span>";
        }
        else {
            voteStatus = "<span class='label label-danger'>未投票</span>";
        }

        var newRow = voterTable.row.add([
            _myVoterAddress,
            result.voterName,
            voteStatus
        ]).draw(false).node();
        $('td:eq(2)', newRow).attr('id', _myVoterAddress + "_cell");
console.log("hello guobin 0000003");
    });

}

function updateNewVote(_myVoterAddress) {
    $("#" + _myVoterAddress + "_cell").html("<span class='label label-primary'>已完成投票</span>");
    loadTotalVotes(Ballot);
}

//-------------- Button Section -------------------//

$("#btnEnd").click(async function () {
    $("#loaderStartVote").show();
    //Ballot = new web3.eth.Contract(ballotABI, BallotContractAddress);

    var mygas;
    Ballot.methods.endVote().estimateGas({ from: accountaddress })
        .then(function (gasAmount) {
            mygas = gasAmount;
        })

    Ballot.methods.endVote().send({
        from: accountaddress,
        gas: mygas,
        gasPrice: web3.eth.gasPrice
    })
        .on('transactionHash', (hash) => {
            console.log("a");
        })
        .on('receipt', (receipt) => {
            console.log("b");

        })
        .on('confirmation', (confirmationNumber, receipt) => {
            console.log("c");
        })
        .on('error', console.error);
});

$("#btnStart").click(async function () {
    $("#loaderStartVote").show();
    //Ballot = new web3.eth.Contract(ballotABI, BallotContractAddress);

    var mygas;
    Ballot.methods.startVote().estimateGas({ from: accountaddress })
        .then(function (gasAmount) {
            mygas = gasAmount;
        })

    Ballot.methods.startVote().send({
        from: accountaddress,
        gas: mygas,
        gasPrice: web3.eth.gasPrice
    })
        .on('transactionHash', (hash) => {
            console.log("a");
        })
        .on('receipt', (receipt) => {
            console.log("b");

        })
        .on('confirmation', (confirmationNumber, receipt) => {
            console.log("c");
        })
        .on('error', console.error);
});

$("#btnAdd").click(async function () {
    $("#loaderNewVoter").show();
    console.log($("#txtNewVoterAddress").val());
    console.log($("#txtNewVoterName").val());

    //Ballot = new web3.eth.Contract(ballotABI, BallotContractAddress);

    //estimate first
    var mygas;
    Ballot.methods.addVoter($("#txtNewVoterAddress").val(), $("#txtNewVoterName").val()).estimateGas({ from: accountaddress })
        .then(function (gasAmount) {
            mygas = gasAmount;
        })

    Ballot.methods.addVoter($("#txtNewVoterAddress").val(), $("#txtNewVoterName").val()).send({
        from: accountaddress,
        gas: mygas,
        gasPrice: web3.eth.gasPrice
    })
        .on('transactionHash', (hash) => {
            console.log("a");
        })
        .on('receipt', (receipt) => {
            console.log("b");

        })
        .on('confirmation', (confirmationNumber, receipt) => {
            console.log("c");
        })
        .on('error', console.error);

});

$("#btnRefresh").click(async function () {
    refreshContract($("#contractAddress").val());
});

$("#btnGo").click(async function () {
    $("#loader").show();
    var i = 0;
    var _ballotOfficialName = $("#official").val();
    var _proposal = $("#proposal").val();

    ballotContract.deploy({
        data: ballotByteCode,
        arguments: [_ballotOfficialName, _proposal],
    })
        .send({
            from: accountaddress,
            gas: 1308700,
            gasPrice: web3.eth.gasPrice,
            gasLimit: 2000000
        }, (error, transactionHash) => {
            MyTransactionHash = transactionHash;
            //getContract(); for private kaleido chain only
        })
        .on('error', (error) => {
            console.log("b");
        })
        .on('transactionHash', (transactionHash) => {
            console.log("c");
        })
        .on('receipt', (receipt) => {
            console.log("DONE" + receipt.contractAddress); // contains the new contract address

            BallotContractAddress = receipt.contractAddress;
            loadBallotContract(BallotContractAddress);
            console.log(BallotContractAddress);
            $("#contractAddress").val(BallotContractAddress);
            watchVoteStarted(); //start watching for events
            watchVoterAdded(); //start watching for new voters
            watchVoteDone(); //start watching for vote done
            watchVoteEnd(); //start watching for vote end
            $('#panels_contract').show();
            $('#panels_voters').show();
            $("#btnStart").show();
            $("#btnEnd").hide();
            $("#loader").hide();
            $("#section_addVoter").show();
        })
        .on('confirmation', (confirmationNumber, receipt) => {
            console.log(i);
            i++;
        })
        .then((newContractInstance) => {
            console.log(newContractInstance.options.address) // instance with the new contract address
        });

});


