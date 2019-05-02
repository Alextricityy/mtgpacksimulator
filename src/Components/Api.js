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
          // console.log(cardsDetailed);
          // console.log(res);
          // console.log(res.data.name);


        });
      })
    })
    // let parsedCardsjson = JSON.parse(Cardsjson)
    this.setState({ cardState: Cardsjson })
    this.setState({ apiFetch: true })

    
  }
  
  render() {
    if(this.state.apiFetch === true){
    //   const getNestedObject = (nestedObj, pathArr) => {
    //     return pathArr.reduce((obj, key) =>
    //         (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
    // }
      for(let i = 0; i<= 14; i++){
        return(
          <div>
            {console.log(this.state.cardState)}
            {/* {console.log(this.state.cardState[i].name)} */}

            {/* {console.log(getNestedObject(this.state.cardState, ['name']))} */}
            
            {this.state.cardState.foreach(card =>{
              console.log(card.name)
            })}

          </div>
          
        )
      }
    }else{
      return(
        <h1>Hello World!</h1>
      )
    }

    // return (
    //   <div>
    //     <h1>{this.state.cardState}</h1>
    //     {console.log(this.state.cardState)}
    //     {this.state.cardState.forEach(card =>{
    //       for(var i = 0; i<= card.length; i++){
    //         console.log(card[i])
    //       }
    //       console.log(card)
    //       // only logs Loading...
    //     })}
    //     </div>      
    //   )
    }
  }