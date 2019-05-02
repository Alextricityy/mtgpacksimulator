import React from 'react';
import axios from 'axios';

export default class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardState: [],
      opened: false,
      apiFetch: false

    }
  }
  
  componentDidMount() {
    this.getData();

  }

  // shouldComponentUpdate(){
    
  // }
  
  getData =() => {
    let Cardsjson = [];
    
    function findAndReplace(string, target, replacement) {
      var i = 0,
      length = string.length;
      for (i; i < length; i++) {
        string = string.replace(target, replacement);
      }
      return string;
    }
    //first api call
    axios.get(`https://api.magicthegathering.io/v1/sets/war/booster`)
    .then(res => {
      const cardsInBooster = res.data.cards;
      cardsInBooster.forEach(card => {
        let cardNameFixed = findAndReplace(card.name, " ", "+")
        axios.get(`https://api.scryfall.com/cards/named?fuzzy=${cardNameFixed}`)
        .then(res => {
          const apiResult = res.data;
          let cardsDetailed = {};
          // filter Data to neccesarry info
          cardsDetailed.name = apiResult.name;
          cardsDetailed.image = apiResult.image_uris.large;
          cardsDetailed.price = apiResult.prices.usd;

          Cardsjson.push(cardsDetailed);

        });
      })
    })
    // let parsedCardsjson = JSON.parse(Cardsjson)
    this.setState({ cardState: Cardsjson })
    // if(this.cardState === Cardsjson){
      this.setState({ apiFetch: true })
    // }

    
  }
  
  render() {
    if(this.state.apiFetch === true){

        // const Test = this.state.cardState.map(card => (
        //       <div className="cardCss" key={card.name}>{card.name}</div>
        //     )
        // ); 
        return(
          <div>
          {/* {Test} */}
          {this.state.cardState.map(card => <div> {card.name} {console.log(card)}</div>)} 
          {/* {console.log(Test)} */}
          {console.log(this.state.cardState)}

          </div>

        )
    
    }else{
      return(
        <h1>Hello World!</h1>
      )
    }
    }
  }