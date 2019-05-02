import React from 'react';
import axios from 'axios';

export default class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardState: ['Loading..'],
      opened: false
      // cardState: 'Loading..'

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
    // const {cardState } = this.state
    // if(cardState === ['Loading..']){return <div>Loading</div>}
    // if(this.state.cardState!==['Loading..']){
    //   return(<div>{this.state.cardState.forEach(card =>{
    //     // card.forEach(x =>{
    //     //   console.log(x)
    //     // })
    //     console.log(card)
    //     // only logs Loading...
    //   })}</div>)
    // }
    return (
      // {this.state.cardState &&
      //   this.state.cardState.map( (item, key) =>
      //       <div key={key}>
      //           {item}
      //       </div>
      //   )}
      <div>
        {/* <button type="button" onClick={this.setState({unopened:false})} ></button> */}
        <h1>{this.state.cardState}</h1>
        {/* logs array loading and then actual array of data */}
        {console.log(this.state.cardState)}
        
        {/* {this.state.cardState.map( (item, key) =>
            <div key={key}>
                {console.log('pre item')}
                {item}
                {console.log(item)}
                {console.log(key)}
                {console.log('hello')}


            </div>
        )} */}
        {/* {if(this.state.unopened ===true){}} */}
        {/* <div>{this.state && this.state.cardState && <div>hi</div>}</div> */}
        
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