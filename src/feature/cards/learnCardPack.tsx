import * as React from 'react';
import s from "./learnCardPack.module.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {useSelector} from "react-redux";
import {selectorCards, selectorPackName} from "./cardsSelectors";
import {useAppDispatch} from "../../app/store";
import { useEffect} from "react";
import {getAllUserCards,  updateUserCard} from "./cardsReducer";
import {useNavigate, useParams} from "react-router-dom";
import {SuperButton} from "../../common/superButton/superButton";
import {ReturnBack} from "../../common/returnBack/returnBack";
import PATH from "../../common/constans/path/path";
import { selectorAuth} from "../../app/appSelectors";
import {generateRandomQuestion} from "../../common/functions/smartRandom/generateRandomQuestion";


export const LearnCardPack = () =>  {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const cards =  useSelector(selectorCards);
    const isAuth = useSelector(selectorAuth);
    const cardsPackName = useSelector(selectorPackName );
    const navigate = useNavigate();
    const [expanded, setExpanded] = React.useState<boolean>(false);
    const [currentQuestion, setCurrentQuestion] = React.useState<number>(0);
    const [cardId, setCardID] = React.useState<string>(cards ? cards[currentQuestion]._id : '');
    const [cardGrade , setCardGrade] = React.useState<number>(cards?  cards[currentQuestion].grade : 0);

    useEffect(() => {
        if (isAuth && cards === undefined && id) {
            dispatch(getAllUserCards(id));
        }
    },[isAuth])

    useEffect(() => {
        if (cards && cards[currentQuestion]) {
            setCardID(cards[currentQuestion]._id)
        }
    }, [cards]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const returnToPackHandler = () => {
        navigate(PATH.PACKS);
    };
    const onNextClickHandler =  () => {
        const nextQuestion = generateRandomQuestion(cards)
        if (nextQuestion < cards.length ) {
            setCurrentQuestion(nextQuestion)
            setCardID(cards[nextQuestion]._id)
            dispatch(updateUserCard(cardGrade,cardId))
            setExpanded(!expanded)
        }
        if (nextQuestion === cards.length) {
            setExpanded(!expanded)
            setCurrentQuestion(0)
        }
    }
    return (
        <div className={s.wrapper}>
                    <ReturnBack callback={returnToPackHandler}/>
                    <h2 className={s.title}> Learn {cardsPackName } </h2>
                    <Card className={s.card}>
                        <CardContent className={s.content}>
                            <Typography paragraph><b>Question:</b> {cards ? cards[currentQuestion].question : 'question'}</Typography>
                            <Typography paragraph>Number of attempts to answer the question: {cards ? cards[currentQuestion].shots : 'shots'}</Typography>
                        </CardContent>
                        <CardActions className={s.buttonShow} disableSpacing>
                            <SuperButton name={'Show answer'} callback={handleExpandClick}/>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent className={s.contentAnswer }>
                                <Typography paragraph><b>Answer: </b>{cards?  cards[currentQuestion].answer : 'answer'}</Typography>
                                <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label">Rate yourself</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="Did not know"
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel onClick={()=>{setCardGrade(1)}} value="Did not know" control={<Radio />} label="Did not know"/>
                                        <FormControlLabel onClick={()=>{setCardGrade(2)}} value="Forgot" control={<Radio />} label="Forgot" />
                                        <FormControlLabel onClick={()=>{setCardGrade(3)}} value="A lot of thought" control={<Radio />} label="A lot of thought" />
                                        <FormControlLabel onClick={()=>{setCardGrade(4)}} value="Confused" control={<Radio />} label="Confused" />
                                        <FormControlLabel onClick={()=>{setCardGrade(5)}} value="Knew the answer" control={<Radio />} label="Knew the answer" />
                                    </RadioGroup>
                                    <CardActions  className={s.buttonNext} disableSpacing>
                                        <SuperButton name={'Next'} callback={onNextClickHandler }/>
                                    </CardActions>
                                </FormControl>
                            </CardContent>
                        </Collapse>
                    </Card>
        </div>
    );
}