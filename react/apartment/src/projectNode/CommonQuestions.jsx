import React, { useState } from 'react';
import './question.css'; 

export const CommonQuestions=() =>{
  const [openIndex, setOpenIndex] = useState(null);

  const ques = [
    {
      question: '2. Who are holiday villas suitable for?',
      answer: 'Vacation villas are suitable for a variety of purposes, family vacations, romantic couples, groups of vacationers traveling in a certain area or for events of all kinds, birthdays, bachelor and bachelorette parties, and of course many other events for holidays such as Independence Day, Passover, Rosh Hashanah, and more.',
    },
    {
      question: '2. How many vacationers can stay in the villa?',
      answer: 'Solid villas will house an amount of 10-15 vacationers, but large vacation villas with a large number of rooms will be able to house a large amount of vacationers like 50, 60 and even more. By prior arrangement with the owner of the villa, you can spread out mattresses and enjoy a dream vacation.',
    },
    {
        question: '3. What types of events can be held in the villa?'
,       answer:'You can hold special events such as birthdays, anniversaries, weddings, and of course training days for employees, note that you can hold a recruitment and release party in the villa and enjoy a private vacation complex that is entirely yours and your guests, you can spread out tables on the lawns and in the area of the villa and enjoy a perfect celebration! In some of the isolated villas it is possible to make noise until the wee hours of the night.'
    },
    {
        question: '4. What are the prices per night for renting holiday villas and what are the prices affected by?',
        answer: 'Villa prices usually start from NIS 2000 and up and everything depends on the size of the villa, the number of rooms, vacation attractions, and of course isolation from the environment, luxury and splendor, there are hundreds of vacation villas that claim to be good that charge a higher or lower price, all according to the needs of the vacationers in the villa, on the website some of the villas have published prices , of course the price varies depending on the number of people coming to the villa. Sometimes the details are written on the villa page and sometimes you will have to call the owner of the villa in order to get more details.'
    },
    {
        question: '6. Are holiday villas suitable for different events?',
        answer: 'for sure! If you notice that many holiday villas are suitable for all kinds of events, weddings, bridal showers, bachelorette parties, birthdays and many other types of private events of all kinds, you can enjoy a secluded place and spread out tables with lots of chairs for all guests to enjoy a luxurious holiday complex with a swimming pool, a snooker table and more Interesting attractions.'
    }
  ];

  const toggleAccordion = (index) => {
    if (index === openIndex) {
      setOpenIndex(null);  
    } else {
      setOpenIndex(index);    
    }
  };

  return (
  <>
    <div className="faq-header"> Common questions</div>
    <div className="accordion">
      {ques.map((ques, index) => (
        <div key={index} className="accordion-item">
          <button className="accordion-title" onClick={() => toggleAccordion(index)}>
            {ques.question}
            <span className={index === openIndex ? 'accordion-icon rotate' : 'accordion-icon'}>▼</span>
          </button>
          {index === openIndex && <div className="accordion-content">{ques.answer}</div>}
        </div>
      ))}
    </div>
    </>
  );

}

