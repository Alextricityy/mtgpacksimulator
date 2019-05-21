import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
// const MtgCard = ``

const Wrapper = styled.div`
background:#EFEFEF; 
box-shadow: 1px 1px 10px #999; 
margin: auto; 
text-align: center; 
-webkit-border-radius: 5px;
-moz-border-radius: 5px;
border-radius: 5px;
padding-top: 5px;
width:100%;
&::-webkit-scrollbar {
  display: none;
}
`


const StyledCards = styled.div`
  display: flex;
  white-space:nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }

  .StyledCard {
    display:inline-block;
    }

`;

const StyledCard = styled.div`
h1{
  color: rgba(0, 0, 0, 0.65);
  font-size:10px;
}
  font-size:10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  background: white;
  margin: 0 auto 10px auto;
  img {
    width:  auto;
    height: 300px;
    background-position: 50% 50%;
    background-repeat:   no-repeat;
    background-size:     cover;
}

`;

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
    // let myCards = [
    //   { name: "Domri, Anarch of Bolas", image: "https://img.scryfall.com/cards/large/front/c/1/c1af9881-e35b-4be2-8716-ea7c6664e22c.jpg?1555741224", price: "1.55" },
    //   { name: "Bond of Insight", image: "https://img.scryfall.com/cards/large/front/6/4/648629af-e911-49e1-b564-c98f339b84a1.jpg?1555740440", price: "0.09" },
    //   { name: "Heartfire", image: "https://img.scryfall.com/cards/large/front/7/d/7db219ea-2ed1-4a86-955c-d61ecedbc019.jpg?1555740902", price: "0.05" },
    //   { name: "Grim Initiate", image: "https://img.scryfall.com/cards/large/front/2/9/29b6ec9d-3861-48bf-a198-dc7efba5d89c.jpg?1555740897", price: "0.06" },
    //   { name: "Charity Extractor", image: "https://img.scryfall.com/cards/large/front/3/5/3594f726-cdbb-4b7d-bcfe-17d5f8cd5228.jpg?1555740631", price: "0.08" },
    //   { name: "Forced Landing", image: "https://img.scryfall.com/cards/large/front/5/c/5cb319a7-564c-4748-82cf-c26ab110c32c.jpg?1555741067", price: "0.06" },
    //   { name: "Mowu, Loyal Companion", image: "https://img.scryfall.com/cards/large/front/f/4/f41a191c-c42e-42ec-89bd-cc1bc215ffbc.jpg?1555741099", price: "0.08" },
    //   { name: "Lazotep Reaver", image: "https://img.scryfall.com/cards/large/front/5/9/594bbe43-a8aa-42aa-bc49-cb4f3bc05cad.jpg?1555740711", price: "0.04" },
    //   { name: "Defiant Strike", image: "https://img.scryfall.com/cards/large/en/ktk/7.jpg?1517813031", price: "0.14" },
    //   { name: "Duskmantle Operative", image: "https://img.scryfall.com/cards/large/front/1/6/16eb5a6b-5e69-497c-a0c9-4165ad0f5d0b.jpg?1555740668", price: "0.08" },
    //   { name: "Jaya's Greeting", image: "https://img.scryfall.com/cards/large/front/e/c/ec66f169-5cf9-4d7c-a5ab-c64fc4801358.jpg?1555740930", price: "0.06" },
    //   { name: "Ajani's Pridemate", image: "https://img.scryfall.com/cards/large/en/m19/5.jpg?1547749885", price: "0.19" },
    //   { name: "Contentious Plan", image: "https://img.scryfall.com/cards/large/front/8/e/8e30deb6-9e1f-4545-ae30-c30ba6c7b3a0.jpg?1555740455", price: "0.08" }]
      
    // this.setState({ cardState: myCards })
    // let Cardstest = this.getData();
    // console.log(this.getData())
    // this.setState({ cardState: Cardstest })

    // this.setState({ apiFetch: true })


  }

  // shouldComponentUpdate(){
    
  // }
  
  getData = async () => {
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
    await axios.get(`https://api.magicthegathering.io/v1/sets/war/booster`)
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
          // console.log(cardsDetailed);
          Cardsjson.push(cardsDetailed);

        });
      })
    })
    // let parsedCardsjson = JSON.parse(Cardsjson)
    // console.log(this.state.cardState)
    console.log(Cardsjson)
    // if(this.cardState === Cardsjson){
      Cardsjson.flat();
    this.setState({ cardState: Cardsjson })

    this.setState({ apiFetch: true })

    // }
    // return Cardsjson;
    
    
  }
  
  // render() {
  //   if(this.state.apiFetch === true){
  //   console.log(this.state.cardState)

  //       return(
  //         <Wrapper>
  //         {/* <HorizontalScroll> */}
  //         <StyledCards>
  //               {this.state.cardState.map((card, index) => <StyledCard key={index} className="MtgCard"><div><h1>{card.name}</h1></div>{console.log(card)}<div><img src={card.image} alt={card.name}></img></div><h3>{card.price}</h3></StyledCard>)}
  //               </StyledCards>
  //               {/* </HorizontalScroll> */}
  //         </Wrapper>
  //       )
    
  //   }else{
  //     return(
  //       <h1>Hello World!</h1>
  //     )
  //   }
  //   }
  render() {
    return (
        <div>
            {!this.state.apiFetch === true ? (
                <div>Loading...</div>
            ) : (
                      <Wrapper>
                      <StyledCards>
                            {this.state.cardState.map((card, index) =>
                               <StyledCard key={index}><div><h1>{card[index].name}</h1></div>{console.log(card)}<div><img src={card[index].image} alt={card[index].name}></img></div><h3>{card[index].price}</h3></StyledCard>
                               )}
                               </StyledCards>
                            {console.log(this.state.cardState)}
                      </Wrapper>
                      
            )}
        </div>
    );
  }
  }