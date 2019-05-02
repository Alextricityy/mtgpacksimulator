import React from 'react';
import axios from 'axios';

export default class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardState: [],
      opened: false

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
          const cardsDetailed = res.data;
          
          Cardsjson.push(cardsDetailed);
        });
      })
    })
    this.setState({ cardState: Cardsjson })
    
  }
  
  render() {
    return (
      <div>
        <h1>{this.state.cardState}</h1>
        {console.log(this.state.cardState)}
        {this.state.cardState.forEach(card =>{
          for(var i = 0; i<= card.length; i++){
            console.log(card[i])
          }
          console.log(card)
          // only logs Loading...
        })}
        </div>      
      )
    }
  }