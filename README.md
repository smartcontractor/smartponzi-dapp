
###Introducing SmartPonzi, a Ponzi scheme simulator based on Ethereum

SmartPonzi is a novel concept for a "financial game/simulation" leveraging the amazing features of Ethereum and smart contracts. 
If you are new to the term Ponzi scheme here is the [Wikipedia](https://en.wikipedia.org/wiki/Ponzi_scheme) definition :  

*"A fraudulent investment operation where the operator, an individual or organization, pays returns to its investors from new capital paid to the operators by new investors, rather than from profit earned by the operator"*


**Why is SmartPonzi different ?**

Contrarily to a human being, a digital smart contract cannot take arbitrary decisions and it's programmed to follow specific instructions. SmartPonzi is programmed so that he will still pay new investors from old investors funds, but he certainly won't take your money and run. The scheme will eventually collapse if certain conditions are met but could go on indefinitely as well. We have published the source code which can be audited and matched against the program currently on chain, to ensure full transparency.

**So Why SmartPonzi?**

SmartPonzi is game with its own dynamics, you can make money or lose money with it, and more importantly,  it should simulate the financial dynamics of a real world Ponzi scheme and yield very interesting data. The informations obtained in the long run will be used for research purposes and shared publicly.


**How does SmartPonzi work?**


SmartPonzi will credit its investors a 7% profit on investment, compounded weekly.

Choose your investment size and click on the "Invest" button, your funds will be locked  for 1 week. 

At the end of one week, if there is enough balance in the contract, you will be able to either :

* 1) withdraw all of your funds and profits and quit 
* 2) withdraw just profits and stay
* 3) stay and recalculate your profits. 

Please note : If you choose the last and more profitable option, you will also have to hit the "Recalculate Profits" button to credit yourself with profits for new week. If you forget it you will miss profits for that specific week.

The longer you stay invested the more profits you will cumulate. If you choose to withdraw your profit at the end of each week, you will not benefit from the effect of "compounding", which means that your profit will grow slower, but your "exposure" will be reduced. Now consider that you are unaware of other "investors" moves, but you can see the contract balance (or if you are an advanced user you can setup a log event to monitor incoming deposits). You have to judge based on this information and choose the best move in order not to lose your money. 

**How to connect**

Clone this repo
```
$ git clone https://github.com/smartcontractor/smartponzi-dapp.git
```

Start a geth node

```
$ geth --rpc --rpcaddr="localhost" --unlock=primary --rpcport="8080"  console
```

Open index page with your favourite browser, click "Network" and type 127.0.0.1 as hostname and 8080 as port, hit Connect
