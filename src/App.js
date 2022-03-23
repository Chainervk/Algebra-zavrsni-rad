import React, { Component } from 'react';
import './App.css';
import Messages from "./messages";
import Input from "./input";

function randomName() {
  const adjectives =['Florrie Sanders', 'Fintan Cano', 'Izaac Golden', 'Madihah Reader', 'Rahima Wyatt', 'Courtney Duncan', 'Tilly-Mae Baldwin',
   'Minahil Boyle', 'Bryn Mcdaniel', 'Tallulah Simmons', 'Antoni Parsons', 'Arlo Arellano', 'Hibah Todd', 'Sonia Luna', 'Zishan Mcfarlane', 'Sylvia Hume',
    'Ivo Vincent', 'Millicent Whitehouse', 'Mildred Hubbard', 'Sorcha Stevenson', 'Gideon England', 'Enya Neale', 'Dennis Jaramillo', 'Tariq Bailey', 
    'Lula Duarte', 'Jana Vang', 'Sebastian Schneider', 'Coco Villanueva', 'Elsie-Mae Frank', 'Trey Hobbs', 'Brandan Ware', 'Milla Bradford',
     'Zacharias Battle', 'Bhavik Needham', 'Jokubas Camacho', 'Isla-Rose Curtis', 'Kara Cherry', 'Anika Kane', 'Anne Diaz', 'Curtis Neal',
      'Ayoub Guzman', 'Katy Haney', 'Catrin Blackmore', 'Hollie Emery', 'Jez Rios', 'Teagan Timms', 'Sapphire Serrano', 'Samiya Pena',
       'Madeline Allman', 'Ameen Burt', 'Sania Carson', 'Taybah Crouch', 'Esha Prentice', 'Daniyal Ramsey', 'Bethany Sharma', 'Eshan Garner',
        'Amari Holt', 'Arun English', 'Rishi Hayden', 'Jaden Leal', 'Alexandru Strickland', 'Ellise Hicks', 'Gracey Singh', 'Daanish Rayner',
         'Cassius Fletcher', 'Glenn Bean', 'Emile Ferry', 'Kyron Lozano', 'Mikey Warren', 'Adeeb Parker', 'Ian Jimenez', 'Eleri White', 'Vicky Duke',
          'Mark Francis', 'Devin Ramos', 'Kobi Kenny', 'Leo Bright', 'Oran Avila', 'Kaylee Conway', 'Yaseen Morrow', 'Rodney Alexander', 'Joel Osborn',
           'Tudor Dudley', 'Asher Bob', 'Karl Adamson', 'Jamaal Gallegos', 'Torin Castaneda', 'Nikki Whitworth', 'Francis Whiteley', 'Lily-Anne Corbett',
            'Bilal Hunter', 'Homer Martinez', 'Evie-Mae Lugo', 'Benny Daniels', 'Rosemarie Sears', 'Linda Ratliff', 'Nathaniel Haigh', 'Jan Mohamed',
             'Malak Howell', 'Kenan Charlton'];
  
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  
  return adjective;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

class App extends Component {
  state = {
    messages: [],
    member: {
      username: randomName(),
      color: randomColor(),
    }
  }

  constructor() {
    super();
    this.drone = new window.Scaledrone("KSXfQKsA1vslUfkq", {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data});
      this.setState({messages});
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Algebrion</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input
          onSendMessage={this.onSendMessage}
        />
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }

}

export default App;
