import React, { useState, useEffect } from "react";
import GameBoard from "./components/GameBoard";
import QuestionModal from "./components/QuestionModal";
import ScoreBoard from "./components/ScoreBoard";
import GenericModal from "./components/WinnerModal";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure it takes full viewport height */
  background-color: #000080; /* Jeopardy blue */
`;

const App = () => {
  const group = "Family"

  const [round, setRound] = useState("start");

  const [hasStarted, setHasStarted] = useState(false);

  const teamNames = ["Team One", "Team Two"];

  const [categories, setCategories] = useState([
    {
      title: "Holiday Destinations",
      questions: [
        {
          text: "Which European city is famous for its Christmas markets in Marienplatz?",
          answer: "Munich",
          value: 100,
          answered: false,
        },
        {
          text: "What city is known for its New Year's Eve ball drop in Times Square?",
          answer: "New York City",
          value: 200,
          answered: false,
        },
        {
          text: "Which Swiss city hosts a famous winter festival featuring ice sculptures?",
          answer: "Grindelwald",
          value: 300,
          answered: false,
        },
        {
          text: "In which country can you experience the Midnight Sun during winter?",
          answer: "Norway",
          value: 400,
          answered: false,
        },
        {
          text: "What German city hosts the world’s largest Christmas market in Nuremberg?",
          answer: "Nuremberg",
          value: 500,
          answered: false,
        },
      ],
    },
    {
      title: "A \"Holly\"-Jolly Christmas",
      questions: [
        {
          text: "In the movie 'Elf,' what is the name of the department store where Buddy works?",
          answer: "Gimbels",
          value: 100,
          answered: false,
        },
        {
          text: "In 'How the Grinch Stole Christmas,' what is the name of the Grinch’s dog?",
          answer: "Max",
          value: 200,
          answered: false,
        },
        {
          text: "In 'The Santa Clause,' what happens when someone puts on Santa's suit?",
          answer: "They become Santa Claus.",
          value: 300,
          answered: false,
        },
        {
          text: "In the song '12 Days of Christmas,' what gift is given on the seventh day?",
          answer: "Seven swans a-swimming",
          value: 400,
          answered: false,
        },
        {
          text: "What is the name of the snowman narrator in 'Rudolph the Red-Nosed Reindeer'?",
          answer: "Sam the Snowman",
          value: 500,
          answered: false,
        },
      ],
    },
  ].sort((a, b) => a.title.localeCompare(b.title)));

  // const [multiplierCategories, setMultiplierCategories] = useState([
  //   {
  //     title: "Anmol",
  //     questions: [
  //       { text: "What is Anmol’s go-to midnight snack?", answer: "Taco Bell Crunchwrap Supreme", value: '+10%', answered: false },
  //       { text: "Which board game is Anmol's all-time favorite?", answer: "Business (The Indian version of Monopoly)", value: '+10%', answered: false },
  //       { text: "What is the one thing Anmol cannot leave the house without?", answer: "His phone charger", value: '+10%', answered: false },
  //     ],
  //   },
  //   {
  //     title: "Shreya",
  //     questions: [
  //       { text: "What’s Shreya’s all-time favorite rom-com movie?", answer: "Mohabbatein", value: '+10%', answered: false },
  //       { text: "What is Shreya’s go-to Taco Bell order?", answer: "Cheese quesadilla with black beans", value: '+10%', answered: false },
  //       { text: "What is Shreya’s favorite childhood memory?", answer: "Driving down to New Jersey from New York when she lived in Yonkers", value: '+10%', answered: false },
  //     ],
  //   },
  //   {
  //     title: "Shanaya",
  //     questions: [
  //       { text: "What is Shanaya’s guilty pleasure to watch?", answer: "Any Hallmark movie", value: '+10%', answered: false },
  //       { text: "Which childhood toy did Shanaya hold onto for way too long?", answer: "Her toy cars", value: '+10%', answered: false },
  //       { text: "What dish does Shanaya make better than anyone else in the group?", answer: "Boiled water", value: '+10%', answered: false },
  //     ],
  //   },
  //   {
  //     title: "Shiv",
  //     questions: [
  //       { text: "Which video game is Shiv most competitive about?", answer: "Call of Duty", value: '+10%', answered: false },
  //       { text: "Which artists headlined the first concert Shiv ever went to?", answer: "Drake and Future", value: '+10%', answered: false },
  //       { text: "What is Shiv’s signature phrase that everyone imitates?", answer: "Oh noodles", value: '+10%', answered: false },
  //     ],
  //   },
  //   {
  //     title: "Simer",
  //     questions: [
  //       { text: "What’s Simer’s favorite comfort food after a long day?", answer: "Sushi", value: '+10%', answered: false },
  //       { text: "What is the name of the one song Simer always dances to at parties?", answer: "Anything by John Summit or Gerra De De", value: '+10%', answered: false },
  //       { text: "Which animal does Simer say represents their personality?", answer: "Mouse", value: '+10%', answered: false },
  //     ],
  //   },
  //   {
  //     title: "Vaibhav",
  //     questions: [
  //       { text: "What is Vaibhav’s go-to karaoke song?", answer: "Love story", value: '+10%', answered: false },
  //       { text: "Which subject could Vaibhav teach better than anyone else here?", answer: "Arabic", value: '+10%', answered: false },
  //       { text: "What is Vaibhav’s most irrational fear?", answer: "Sleeping for a very very long time if I don’t set an alarm", value: '+10%', answered: false },
  //     ],
  //   },
  //   {
  //     title: "Shruthi",
  //     questions: [
  //       { text: "What’s Shruthi’s hidden talent that surprises everyone?", answer: "Everyone knows my talents", value: '+10%', answered: false },
  //       { text: "Who is Shruthi's favorite character from a Disney TV show?", answer: "Alex Russo", value: '+10%', answered: false },
  //       { text: "What is Shruthi’s favorite type of dessert?", answer: "Pecan pie", value: '+10%', answered: false },
  //     ],
  //   },
  // ].sort((a, b) => a.title.localeCompare(b.title)));

  useEffect(() => {
    if (round === "main" && allQuestionsAnswered(categories)) {
      setRound("winner");
      // setRound("multiplier");
    }
  }, [categories, round]);

  useEffect(() => {
    if (hasStarted === true && round === "start") {
      setRound("main");
    }
  }, [categories, hasStarted]);

  // useEffect(() => {
  //   if (round === "multiplier" && allQuestionsAnswered(multiplierCategories)) {
  //     console.log("scores: ", scores);
  //     setRound("winner");
  //   }
  // }, [multiplierCategories, round]);

  const allQuestionsAnswered = (categories) =>
    categories.every((category) => category.questions.every((q) => q.answered));

  const [currentTeam, setCurrentTeam] = useState(null);

  const [scores, setScores] = useState({ [teamNames[0]]: 0, [teamNames[1]]: 0 });

  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const [showAnswer, setShowAnswer] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectQuestion = (categoryIndex, questionIndex) => {
    if (round === "main") {
      setSelectedCategory(categories[categoryIndex].title);
      setSelectedQuestion({ ...categories[categoryIndex].questions[questionIndex], categoryIndex, questionIndex });
    }
    // } else if (round === "multiplier") {
    //   setSelectedCategory(multiplierCategories[categoryIndex].title);
    //   setSelectedQuestion({ ...multiplierCategories[categoryIndex].questions[questionIndex], categoryIndex, questionIndex });
    // }
  };

  const handleAnswer = (isCorrect) => {
    if (round === "main") {
      handleMainRound(isCorrect);
    }
    // } else if (round === "multiplier") {
    //   handleMultiplierRound(isCorrect);
    // }

    switchTeam();
    setSelectedQuestion(null);
  };

  const handleMainRound = (isCorrect) => {
    if (isCorrect) {
      setScores((prevScores) => {
        return ({
        ...prevScores,
        [currentTeam]: prevScores[currentTeam] + selectedQuestion.value,
      })});
    }
    setCategories((prev) =>
      prev.map((cat, ci) =>
        ci === selectedQuestion.categoryIndex
          ? {
              ...cat,
              questions: cat.questions.map((q, qi) =>
                qi === selectedQuestion.questionIndex
                  ? { ...q, answered: true }
                  : q
              ),
            }
          : cat
      )
    );
  }

  // const handleMultiplierRound = (isCorrect) => {
  //   if (isCorrect) {
  //     setScores((prevScores) => ({
  //       ...prevScores,
  //       [currentTeam]: Math.round((prevScores[currentTeam] * 1.1)/10) * 10,
  //     }));
  //   }
  //   // Mark the question as answered
  //   setMultiplierCategories((prev) =>
  //     prev.map((cat, ci) =>
  //       ci === selectedQuestion.categoryIndex
  //         ? {
  //             ...cat,
  //             questions: cat.questions.map((q, qi) =>
  //               qi === selectedQuestion.questionIndex
  //                 ? { ...q, answered: true }
  //                 : q
  //             ),
  //           }
  //         : cat
  //     )
  //   );
  // }

  const handleShowAnswer = () => setShowAnswer(true);

  const handleCloseModal = () => {
    setCategories((prev) =>
      prev.map((category, categoryIndex) =>
        categoryIndex === selectedQuestion.categoryIndex
          ? {
              ...category,
              questions: category.questions.map((question, questionIndex) =>
                questionIndex === selectedQuestion.questionIndex ? { ...question, answered: true } : question
              ),
            }
          : category
      )
    );
    setSelectedQuestion(null);
    setShowAnswer(false);
  };


  const switchTeam = () => {
    setCurrentTeam((prevTeam) => (prevTeam === teamNames[0] ? teamNames[1] : teamNames[0]));
  };

  return (
    <AppContainer>
      <GenericModal 
        isOpen={hasStarted === false && currentTeam != null}
        text={currentTeam + " is up first!"}
        onClose={() => setHasStarted(true)}/>
      <ScoreBoard scores={scores} teamNames={teamNames} group={group} currentTeam={currentTeam} setCurrentTeam={() => {
        setCurrentTeam(Math.random() < 0.5 ? teamNames[0] : teamNames[1]);
      }} />
      {round === "main" ? (
        <GameBoard categories={categories} onSelectQuestion={handleSelectQuestion} expand={false} />
      ) : (
      // ) : round === "multiplier" ? (
      //   <GameBoard categories={multiplierCategories} onSelectQuestion={handleSelectQuestion} expand={true} />
      // ) : (
        <GenericModal 
        isOpen={round === "winner"}
        text={
          scores[teamNames[0]] > scores[teamNames[1]] ? teamNames[0] + " wins!"
          : scores[teamNames[0]] < scores[teamNames[1]] ? teamNames[1] + " wins!"
        : 'Nobody wins.'}
        onClose={() => {
          setRound("main");
          setScores({ [teamNames[0]]: 0, [teamNames[1]]: 0 });
          setHasStarted(false);
          setCurrentTeam(null);
          setCategories(categories.map((category) => ({
            ...category,
            questions: category.questions.map((question) => ({ ...question, answered: false })),
          })));
          // setMultiplierCategories(multiplierCategories.map((category) => ({
          //   ...category,
          //   questions: category.questions.map((question) => ({ ...question, answered: false })),
          // })));
        }}/>
      )}
      <QuestionModal
        category={selectedCategory}
        value={selectedQuestion?.value}
        isOpen={!!selectedQuestion}
        question={selectedQuestion}
        answer={selectedQuestion?.answer}
        onClose={() => setSelectedQuestion(null)}
        onAnswer={handleAnswer}
      />
    </AppContainer>
  );
};

export default App;
