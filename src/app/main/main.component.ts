import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../questions.service';
import {Iquestion, Iquestions, Iinks, Ilayer} from '../interfaces'
@Component({
  selector: 'my-app',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  constructor(private service: QuestionsService) { }
  scenario: Iquestions
  questions: Iquestion[]
  questionDisplay;
  bestInksDisplay;
  inks: Iinks
  submissions = {}
  sceneID:string = ''
  colorsCompareValues = [];
  hexColorDictionary = {
  a : 10,
  b : 11,
  c : 12,
  d : 13,
  e: 14,
  f: 15    
  }

  ngOnInit(): void {
    this.scenario = this.service.getSingleQuestion();
    this.inks = this.service.getInks();
    this.sceneID = this.scenario.scenario_id;
    this.questions = this.scenario.questions;
    
    // this.service.getAllQuestions().subscribe(ques => {
    //  this.questions = ques
    //  console.log('questions', this.questions)
    // });
    // this.service.getInks().subscribe(ink => {
    //   this.inks = ink.inks
    // });

    this.questions.forEach(question => {
      this.solveQuestions(question);
    })
  }

  solveQuestions(questions:Iquestion){
    let layers = questions.layers;
        
    layers.forEach(l => {
      
      const distances = this.compareDistances(l)
      this.colorsCompareValues.push(distances);
    });
    this.compareInk()
  }
 
  compareInk() {
    const bestInksArray = []
    this.colorsCompareValues.forEach(scenerioArray =>{
      const bestInk = this.closeInk(scenerioArray)
      bestInksArray.push(bestInk);
    });
    console.log('BIA',bestInksArray)
    this.bestInksDisplay = bestInksArray
    this.prepForSubmission(bestInksArray)
  }
  
  prepForSubmission(bestInksArray){
    const submission = {
      scenario_id : this.sceneID,
      answers : bestInksArray
    }
    this.service.postAnswer(submission);
  }

  closeInk(scene: any[]){
    let d = 100;
    scene.forEach(profile =>{
      if(profile.distance < d) d = profile.distance;
    });
    
    const bestInk = scene.find(({distance}) => distance === d)
    return bestInk
  }

  compareDistances = (layer:Ilayer) => {
    const colorMapArray = []
    
    this.inks.inks.forEach(i => {
      const colorCompareMap = {}
      const distance = this.calculateDistance(layer.color, i.color)
      colorCompareMap['inkId'] = i.id
      colorCompareMap['color'] = layer.color
      colorCompareMap['distance'] = distance
      colorCompareMap['price'] = layer.volume * i.cost
      colorMapArray.push(colorCompareMap)
    })

    return colorMapArray
  }

  euclideanDistance = (pointA: any[], pointB: any[], ) => {
    if(pointA.length != 3 || pointB.length != 3) return console.error('Invalid inputs')
    return Math.sqrt((pointA[0] - pointB[0])**2 + (pointA[1] - pointB[1])**2 + (pointA[2]- pointB[2])**2 )
}

 calculateDistance = (value1: any, value2: any) =>{
    let value1Array = this.hexToRGB(value1);
    let valueArray2 = this.hexToRGB(value2);
    return  this.euclideanDistance(value1Array, valueArray2) 
}

 hexToRGB = (code: string): any[] => {
    let hashRemoved = code.replace('#', '');
    let R = hashRemoved.substring(0,2)
    let G = hashRemoved.slice(-4, -2);
    let B = hashRemoved.slice(4);
    let rgbArray = [R, G, B,];
    let valuesArray: any[] = [];
    rgbArray.forEach(channel =>{
       // split channel into array and pass index

       // Note if this starts with a number it will only rturn number 3e rturns
        const a = parseInt(channel.charAt(0))
        const b = parseInt(channel.charAt(1))

        
        if(!a && !b){
            const hashValue = this.calculateHashValue(channel);
            // Foreach moves in acending order so array should still be in R,G,B order
            valuesArray.push(hashValue)
        } else {
            const numValue = this.calculateValue(channel);
            valuesArray.push(numValue);
        }
    });
    return valuesArray
}

calculateHashValue = (val:any) => {
    let a = val.substring(0, 1);
    let b = val.slice(1)

    let sixteenths;
    let ones;
    if(isNaN(a)){
        sixteenths = this.hexColorDictionary[a.toLowerCase()] * 16;
    }else {
        sixteenths = parseInt(a) * 16
    }
    
    if(isNaN(b)){
      ones = this.hexColorDictionary[b.toLowerCase()] ;
    } else {
      ones = parseInt(b)
    }

    return sixteenths + ones;
}

 calculateValue = (number: any) =>{
    const array = this.numberToArray(number);
    const a = array[0];
    const b = array[1];
    let sixteenths;
    let ones;
    if(typeof a === "string"){
      sixteenths = this.hexColorDictionary[a.toLowerCase()] * 16;
  }else {
      sixteenths = a * 16
  }
  
  if(typeof b === "string"){
    ones = this.hexColorDictionary[b.toLowerCase()] ;
  } else {
    ones = b
  }
   
    return sixteenths + ones;
}

 numberToArray = (number: any) => {
    let array = number.toString().split("");
  	return array.map(x => {
      if (isNaN(x)){
        return x
      }
      else {
        return parseInt(x);
      }
    } );
}
}
