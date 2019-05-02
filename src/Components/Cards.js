// import React from 'react';

// const StyledAbout = styled.div`
// h1{
//   color: rgba(0, 0, 0, 0.65);
// }
// font-size:18px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   text-align: center;
//   max-width: 660px;
//   padding: 20px;
//   background: white;
//   margin: 0 auto 10px auto;
//   p {
//     color: rgba(80, 89, 113, 0.7);
//     line-height:140%;
//   }
//   a {
//     color:#007acc !important;
//     text-decoration:none;
//     font-size:18px;
//     cursor: pointer;
//     background: linear-gradient(to bottom, transparent 62%, #FFEB3B 0) center center/0% 75% no-repeat;
//     cursor: pointer;
//     color: rgba(80, 89, 113, 0.7);
//     transition: all .4s ease;
//   &:hover {
//     color: #007acc;
//     background-size: 100% 100%;
//     transition: all .4s ease;
//   }
//   }
// `;

// const Card = props => {
//     return (
//       <StyledProjectCard>
//         <h2>{props.title}</h2>
//         <Wrapper>{props.children}</Wrapper>
//         <StyledDescription>{props.description}</StyledDescription>
//         <Wrapper>
//           <SocialIcon url={props.github} />
//           <StyledLiveLink href={props.live} target="_blank">
//             live
//           </StyledLiveLink>
//         </Wrapper>
//       </StyledProjectCard>
//     );
//   };