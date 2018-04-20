// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import metacoin_artifacts from '../../build/contracts/High_low_2.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var MetaCoin = contract(metacoin_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;
var select;
window.App = {
  start: function() {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];
      self.broker_list();
    //  self.refreshBalance();
    });
  },
 
  myFunction: function(m) {
    document.getElementById("a").disabled = true;
    document.getElementById("b").disabled = true;
    document.getElementById("button2").disabled = true;
    select =m.value;
    console.log(select);
  },
  myFunction1: function(m) {
    document.getElementById("a").disabled = true;
    document.getElementById("b").disabled = true;
    document.getElementById("button1").disabled = true;
    select =m.value;
   console.log(select);
  },  

  broker_list:function(){
  
   var self= this;
   $("#broker_list").html('');
   for(var i=0;i<10;i++)
   {
      $("#broker_list").append('<tr><td rowspan="1">'+i+'</td><td>'+i+'</td><td>'+i+'</td><td>'+i+'</td><td>'+i+'</td><td style="color:green">'+i+" &#9650;"+'</td><td style="color:red">'+i+"&#9660;"+'</td><td> <button type="button"  style="padding: 8px 60px;" data-toggle="modal" data-target="#myModal1"><center>Stop Bet</button></td><td> <button type="button"  style="padding: 8px 50px;" data-toggle="modal" data-target="#myModal2">Declare Bet</button></td></tr>');
      $("#broker_list").append('<tr style="background:rgb(250,250,250)"><td>'+"status:"+'</td><td>active</td><td>'+"Bet Result:"+'</td><td>pending</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');    
   }
  },
  create_bet: function() {
    var self = this;

    var teamA = document.getElementById("a").value;
    var teamB = document.getElementById("b").value;
    var etime = $("#edate").val();
    etime = parseInt(Math.round(new Date(etime))/1000.0);
    var etime1 = $("#edate1").val();
    etime1 = parseInt(Math.round(new Date(etime1))/1000.0);
    console.log(etime);
    console.log(etime1);
    console.log(select);
    console.log(teamA);
    console.log(teamB);

    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.broker_set_game(teamA,teamB,select,etime,etime1,{from: account});
    }).then(function() {
      
    }).catch(function(e) {
      console.log(e);
     
    });
  }
};
window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
  }

  App.start();
});
