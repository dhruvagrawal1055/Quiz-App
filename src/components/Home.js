import React, {useState} from 'react';
// import {data} from './data';
import {useNavigate} from 'react-router-dom'
import {collection, getDocs ,doc,deleteDoc} from 'firebase/firestore';
import {db} from "../Firebase";
import Cardgrid from '../component2/cardgrid';
import Card from '../component2/card';
// import Quiz from './Quiz';
// import login from "./Login";

const Home = () => {

    const [noData, setNoData] =useState(false);
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const quizRef= collection(db,localStorage.getItem('uid'));
    const getData= async ()=>{
        const docs=await getDocs(quizRef);
        const userDocs=docs.docs.map(doc=>{
            return{id:doc.id,data:doc.data()}
        });
        console.log(userDocs)
        if(userDocs.length===1){
            setNoData(true)
        }
        else{
            setData(userDocs.filter(item=>item.id!=="Empty Doc"))
        }

        // const data = await getDocs(quizRef)
        // if(localStorage.getItem('newUser')===true.toString()) {
        //     console.log('working')
        //         await setDoc(doc(db,'Quiz_data',localStorage.getItem('uid')),{});
        //     localStorage.setItem('newUser',false);
        // }

        // await setDoc(doc(db,'test2',localStorage.getItem('uid')),{});
        // const re=await db .collection('test').doc('Hello there').listCollections();
        // const re=await collection(db,'test3')
        // await getDocs(re).then(e=>{
        //     console.log(e.docs.map(d=>d.data()).length,'result')
        // }).catch(e=>{
        //     console.log(e)
        // });
        // const userRef= doc(db,'Quiz_data',localStorage.getItem('uid'));
        // const userData = await getDoc(userRef);
        // console.log(userData.data());
        // if(JSON.stringify(userData.data())==='{}') {
        //     setNoData(true);
        // }

        // const users=data.docs.map(doc=>doc.id);
        // console.log(data.docs.map(doc=>doc.id));
    }
    const maker=()=>{
        //'Question_data'
        //'Quiz_topic'
        if(localStorage.getItem('Quiz_topic')!==null) {
            localStorage.removeItem('Quiz_topic');
        }
        if(localStorage.getItem('Question_data')!==null) {
            localStorage.removeItem('Question_data');
        }
        navigate('/Maker')
    }
    const taker=()=>{
        navigate('/Taker')
    }
    const deleteQuiz=async(e)=>{
        await deleteDoc(doc(db,localStorage.getItem('uid'),e.target.id)).then(async ()=>{
            const ref=await getDocs(quizRef);
            const dat=ref.docs.map(doc=>{
                return{id:doc.id,data:doc.data()}
            });
            setData(dat.filter(item=>item.id!=="Empty Doc"))
        }).catch(e=>{
            console.log(e)})
    }
    const handleLogout=()=>{
        localStorage.setItem("newUser", false);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("profile");
        localStorage.removeItem("uid");
        navigate("/")
    }
    const copy2clip=(e,i)=>{

        navigator.clipboard.writeText(e.target.innerText).then(()=>{
            document.getElementById("msg"+i.toString()).innerHTML="Copied!";
        }).catch(()=>{
            document.getElementById("msg"+i.toString()).innerHTML="Failed to Copy!";
        });

        setTimeout(()=>document.getElementById("msg"+i.toString()).innerHTML="", 1000);
    }
    return (
         //className="bg-amber-300 w-full flex flex-col space-y-2 pt-2 pb-4" 
        <div className = "home">
            {/*{localStorage.getItem('loaded') === 'true'? <Quiz/>:null}*/}
            <Cardgrid>
                <Card>
                <h2>Card{"Get Quizzes that you made"}</h2>
                </Card>
            </Cardgrid>
            <button onClick={getData} className="mx-auto w-fit text-lg py-2 bg-sky-200 px-4 py-2 rounded border-slate-700 border-2 hover:bg-slate-300 hover:scale-110">Get Quizzes that you made</button>
            <button onClick={()=>maker()} className="mx-auto w-fit text-lg py-2 bg-sky-200 px-4 py-2 rounded border-slate-700 border-2 hover:bg-slate-300 hover:scale-110">Create Quiz</button>
            <button onClick={()=>taker()} className="mx-auto w-fit text-lg py-2 bg-sky-200 px-4 py-2 rounded border-slate-700 border-2 hover:bg-slate-300 hover:scale-110">Taker Quiz</button>
            <button
                onClick={()=>handleLogout()}
                className="mx-auto w-fit text-lg py-2 bg-sky-200 px-4 py-2 rounded border-slate-700 border-2 hover:bg-red-300 hover:scale-110">
                Logout
            </button>
            {noData && <p className="px-4 py-2 bg-amber-300 rounded w-fit mx-auto">You have not made any quiz</p>}
            {data && data.map((item, index) => {
                return (
                    <div 
                        className="flex flex-col mx-auto w-full py-2 px-4 bg-gray-200 rounded border-slate-700 border-2 hover:bg-slate-300 sm:w-[600px]"
                        key={'div quiz'+index.toString()}>
                        <span className="text-xl font-serif">QUIZ {index+1}</span>
                        <p  key={'head quiz'+index.toString()}></p>
                        <hr className="border border-slate-500"/>
                        <p><b>Topic :</b> {item.id}</p>
                        <span><b>Share Code :</b><span className="text-gray-500 font-light">( Click below to Copy! ) <span id={'msg'+index.toString()} className="text-red-600"></span></span></span>
                        <span onClick={(e)=>copy2clip(e,index)} className="cursor-pointer whitespace-nowrap overflow-auto rounded py-1 px-2 border border-slate-700 bg-lime-400 hover:bg-lime-300">{localStorage.getItem('uid')+"//"+item.id}</span>

                        <button
                            key={'button quiz'+index.toString()}
                            id={item.id}
                            onClick={e=>deleteQuiz(e)}
                            className="my-2 w-fit mx-auto text-lg py-2 bg-sky-200 px-3 py-1 rounded border-slate-700 border-2 hover:bg-emerald-200 hover:scale-110">Delete Quiz
                        </button>

                    </div>
                )
            })}

        </div>
    );
};

export default Home;
