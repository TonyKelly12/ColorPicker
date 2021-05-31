import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Iquestions, Iinks} from './interfaces'


@Injectable({
  providedIn: 'root'
})


export class QuestionsService {
 // move below to secure file
 token = '2fa890e6-0907-4c55-b2a8-6a1c40505175'
 allQuestionsURL = 'http://challenge.teespring.com/v1/inks/v1/questions/evaluate';
 oneQuestionsURL = 'http://challenge.teespring.com/v1/inks/v1/questions/practice';
 inksURL= 'http://challenge.teespring.com/v1/inks/v1/questions/practice'
 allAnswersURL = 'http://challenge.teespring.com/v1/inks/v1/answer/evaluate';
 oneAnswerURL = 'http://challenge.teespring.com/v1/inks/v1/answer/practice';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`,
    'Access-Control-Allow-Origin': '*'
  })
    

  constructor(private http: HttpClient) { }

  getAllQuestions = () =>{
    // return this.http.get(this.allQuestionsURL, {headers: this.headers});
  }

  getSingleQuestion = () =>{
   //  return this.http.get(this.oneQuestionsURL, {headers: this.headers});
   const question: Iquestions = {
    "scenario_id": "fa61486b-8e13-44b6-92c4-c678e6fa6535",
    "questions": [
      {
        "layers": [
          {
            "color": "#D3F635",
            "volume": 8.97301045916122
          },
          {
            "color": "#E8E800",
            "volume": 5.175449166471516
          }
        ]
      }
    ]
  }
  return question
  }

  getInks = () =>{
   // return this.http.get(this.inksURL, {headers: this.headers});
   const inks: Iinks = {
    "inks": [
      {
        "id": "VN1348",
        "color": "#17B0D8",
        "cost": 12.39
      },
      {
        "id": "FW4037",
        "color": "#0B40F1",
        "cost": 9.66
      },
      {
        "id": "PJ4273",
        "color": "#A4BA1E",
        "cost": 5.77
      },
      {
        "id": "HX0453",
        "color": "#7E3A8C",
        "cost": 13.78
      },
      {
        "id": "IS0846",
        "color": "#C3463E",
        "cost": 12.85
      }
    ]
  }
   return inks
  }

  postAnswer = (answers) =>{
    return this.http.post(this.oneAnswerURL, answers, {headers: this.headers});
  }

  postAllAnswers = () =>{
   // return this.http.get(this.oneQuestionsURL, {headers: this.headers});
  }
  
  
}
